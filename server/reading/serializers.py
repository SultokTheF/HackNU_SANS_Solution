from rest_framework import serializers
from .models import Context, ContextQuestion

class ContextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Context
        fields = ['id', 'title', 'content']

class ContextQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContextQuestion
        fields = ['id', 'text', 'question_text']

class QuestionAnswerSerializer(serializers.Serializer):
    context_id = serializers.PrimaryKeyRelatedField(queryset=Context.objects.all())
    question = serializers.CharField()