from django.db import models
from django.contrib.auth.models import User

# Модель для хранения текстов на казахском языке
class Context(models.Model):
    title = models.CharField(max_length=255)  # Заголовок текста
    content = models.TextField()  # Содержание текста

    def __str__(self):
        return self.title

# Модель для вопросов по контексту к текстам
class ContextQuestion(models.Model):
    text = models.ForeignKey(Context, on_delete=models.CASCADE)  # Ссылка на текст
    question_text = models.TextField()  # Текст вопроса
    correct_answer = models.TextField()  # Правильный ответ

    def __str__(self):
        return f"{self.text.title}: {self.question_text}"