from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Context, ContextQuestion
from .serializers import ContextSerializer, ContextQuestionSerializer, QuestionAnswerSerializer
from transformers import T5Tokenizer, T5ForConditionalGeneration
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import torch

class ContextViewSet(viewsets.ModelViewSet):
    queryset = Context.objects.all()
    serializer_class = ContextSerializer

class ContextQuestionViewSet(viewsets.ModelViewSet):
    queryset = ContextQuestion.objects.all()
    serializer_class = ContextQuestionSerializer

class BaseQuestionAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def __init__(self):
        super().__init__()
        self.tokenizer = T5Tokenizer.from_pretrained("Kyrmasch/t5-kazakh-qa")
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = T5ForConditionalGeneration.from_pretrained("Kyrmasch/t5-kazakh-qa").to(self.device)

class AnswerContextQuestionAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        context = request.data.get('context', '')
        question = request.data.get('question', '')

        if not context or not question:
            return Response({'error': 'Context and question must be provided'}, status=status.HTTP_400_BAD_REQUEST)

        tokenizer = T5Tokenizer.from_pretrained("Kyrmasch/t5-kazakh-qa")
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = T5ForConditionalGeneration.from_pretrained("Kyrmasch/t5-kazakh-qa").to(device)

        encoded = tokenizer.encode_plus(context, question, max_length=128, padding='max_length', truncation=True, return_tensors="pt")
        input_ids = encoded["input_ids"].to(device)
        attention_mask = encoded["attention_mask"].to(device)

        with torch.no_grad():
            output = model.generate(input_ids=input_ids, attention_mask=attention_mask, max_length=128)
            answer = tokenizer.decode(output[0], skip_special_tokens=True)

        return Response({'answer': answer}, status=status.HTTP_200_OK)

class BestContextAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        question = request.data.get('question', '')

        # If question is not provided, return a bad request response
        if not question:
            return Response({'error': 'Question must be provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Find the best context based on cosine similarity
        best_context = self.find_best_context(question)
        
        # If no suitable context is found, return an error response
        if not best_context:
            return Response({'error': 'No suitable context found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Generate an answer using the best context
        answer = self.generate_answer(question, best_context.content)
        
        # Return the best context and the generated answer as a response
        return Response({'best_context': best_context.content, 'answer': answer}, status=status.HTTP_200_OK)
    
    def find_best_context(self, question):
        # Get all contexts
        contexts = Context.objects.all()
        
        # Tokenize and vectorize the question and contexts using TF-IDF
        vectorizer = TfidfVectorizer()
        context_texts = [context.content for context in contexts]
        X = vectorizer.fit_transform([question] + context_texts)
        
        # Calculate cosine similarity between the question vector and each context vector
        similarity_scores = cosine_similarity(X[0:1], X[1:])
        
        # Iterate through contexts and find the one with the highest similarity score
        max_similarity = 0
        best_context = None
        for context, similarity in zip(contexts, similarity_scores.flatten()):
            if similarity > max_similarity:
                max_similarity = similarity
                best_context = context
        
        return best_context
    
    def generate_answer(self, question, context):
        # Initialize tokenizer and model
        tokenizer = T5Tokenizer.from_pretrained("Kyrmasch/t5-kazakh-qa")
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = T5ForConditionalGeneration.from_pretrained("Kyrmasch/t5-kazakh-qa").to(device)

        # Tokenize the input
        encoded = tokenizer.encode_plus(context, question, max_length=128, padding='max_length', truncation=True, return_tensors="pt")
        input_ids = encoded["input_ids"].to(device)
        attention_mask = encoded["attention_mask"].to(device)

        # Generate the answer
        with torch.no_grad():
            output = model.generate(input_ids=input_ids, attention_mask=attention_mask, max_length=128)
            answer = tokenizer.decode(output[0], skip_special_tokens=True)

        return answer
    
class CompareAnswersAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        context = request.data.get('context', '')
        question = request.data.get('question', '')
        user_answer = request.data.get('user_answer', '')

        # If context, question, or user's answer is not provided, return a bad request response
        if not context or not question or not user_answer:
            return Response({'error': 'Context, question, and user_answer must be provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Generate the model's answer
        model_answer = self.generate_model_answer(context, question)

        # Calculate the similarity between the model's answer and the user's answer using cosine similarity
        similarity_score = self.calculate_similarity(model_answer, user_answer)
        
        # Add XP to the user if similarity score is greater than 0.50
        if similarity_score > 0.50:
            user = request.user
            user.xp += 100  # Increment XP by 100
            user.save()

        # Return the model's answer, user's answer, and similarity score as a response
        return Response({
            'model_answer': model_answer,
            'user_answer': user_answer,
            'similarity_score': similarity_score
        }, status=status.HTTP_200_OK)
    
    def generate_model_answer(self, context, question):
        # Initialize tokenizer and model
        tokenizer = T5Tokenizer.from_pretrained("Kyrmasch/t5-kazakh-qa")
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model = T5ForConditionalGeneration.from_pretrained("Kyrmasch/t5-kazakh-qa").to(device)

        # Tokenize the input
        encoded = tokenizer.encode_plus(context, question, max_length=128, padding='max_length', truncation=True, return_tensors="pt")
        input_ids = encoded["input_ids"].to(device)
        attention_mask = encoded["attention_mask"].to(device)

        # Generate the answer
        with torch.no_grad():
            output = model.generate(input_ids=input_ids, attention_mask=attention_mask, max_length=128)
            answer = tokenizer.decode(output[0], skip_special_tokens=True)

        return answer
    
    def calculate_similarity(self, answer1, answer2):
        # Tokenize and vectorize the answers using TF-IDF
        vectorizer = TfidfVectorizer()
        X = vectorizer.fit_transform([answer1, answer2])
        
        # Calculate cosine similarity between the answers
        similarity_score = cosine_similarity(X[0:1], X[1:])[0][0]

        return similarity_score
