from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    AnswerContextQuestionAPIView,
    ContextViewSet,
    ContextQuestionViewSet,
    BestContextAPIView,
    CompareAnswersAPIView
)

router = DefaultRouter()
router.register(r'contexts', ContextViewSet, basename='contexts')
router.register(r'context_questions', ContextQuestionViewSet, basename='context_questions')

urlpatterns = [
    path('', include(router.urls)),
    path('answer_context_question/', AnswerContextQuestionAPIView.as_view(), name='answer_context_question'),
    path('best_context/', BestContextAPIView.as_view(), name='best_context'),
    path('compare_answers/', CompareAnswersAPIView.as_view(), name='compare_answers'),
]