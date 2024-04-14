from django.db import models

class GrammarTopic(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()

    def __str__(self):
        return self.title

class Question(models.Model):
    grammar_topic = models.ForeignKey('GrammarTopic', related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=255)
    option_one = models.CharField(max_length=255)
    option_two = models.CharField(max_length=255)
    option_three = models.CharField(max_length=255)

    def __str__(self):
        return self.text
