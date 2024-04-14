from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GrammarTopicViewSet, QuestionViewSet
from django.urls import path
from .views import submit_answer


router = DefaultRouter()
router.register(r'grammar_topics', GrammarTopicViewSet)
router.register(r'questions', QuestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('submit_answer/', submit_answer, name='submit_answer')
]
