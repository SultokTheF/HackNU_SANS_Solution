from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import GrammarTopic, Question
from .serializers import GrammarTopicSerializer, QuestionSerializer, AnswerSerializer
from users.models import User

class GrammarTopicViewSet(viewsets.ModelViewSet):
    queryset = GrammarTopic.objects.all()
    serializer_class = GrammarTopicSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def submit_answer(request):
    serializer = AnswerSerializer(data=request.data)
    if serializer.is_valid():
        question_id = serializer.validated_data['question_id']
        user_answer = serializer.validated_data['user_answer']
        try:
            question = Question.objects.get(pk=question_id)
            is_correct = user_answer == question.correct_answer
            if is_correct:
                # Increase user's XP by 50
                user = request.user
                user.xp += 50
                user.save()
                
            return Response({'correct': is_correct}, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return Response({'error': 'Question does not exist'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
