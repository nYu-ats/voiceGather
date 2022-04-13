from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from ..app_base_model import AppBaseModel
from ..questions.question_free_text import QuestionFreeText

class AnswerFreeText(AppBaseModel):
    '''
    自由記述形式の回答モデル
    '''
    class Meta:
        db_table = 'answer_free_text'
        abstract = False
    
    question = models.ForeignKey(
        'QuestionFreeText',
        on_delete=models.CASCADE,
        max_length=10,
    )
    answer = models.CharField(
        max_length=500,
    )
