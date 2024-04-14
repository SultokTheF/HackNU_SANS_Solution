from rest_framework import viewsets
from .models import GrammarTopic, Question
from .serializers import GrammarTopicSerializer, QuestionSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import AnswerSerializer

class GrammarTopicViewSet(viewsets.ModelViewSet):
    queryset = GrammarTopic.objects.all()
    serializer_class = GrammarTopicSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer



@api_view(['POST'])
def submit_answer(request):
    serializer = AnswerSerializer(data=request.data)
    if serializer.is_valid():
        question_id = serializer.validated_data['question_id']
        user_answer = serializer.validated_data['user_answer']
        try:
            question = Question.objects.get(pk=question_id)
            is_correct = user_answer == question.correct_answer
            return Response({'correct': is_correct}, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response({'error': 'Question does not exist'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
