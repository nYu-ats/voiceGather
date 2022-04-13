from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from ..app_base_model import AppBaseModel
from ..questionnaire import Questionnaire

class QuestionFreeText(AppBaseModel):
    '''
    自由記述形式の設問モデル
    '''
    class Meta:
        db_table = 'question_free_text'
        abstract = False
        constraints = [
            models.UniqueConstraint(
                fields = ['questionnaire_id', 'index'],
                name = 'question_text_unique'
            )
        ]
    
    questionnaire = models.ForeignKey(
        'Questionnaire',
        on_delete=models.CASCADE,
        max_length=10,
        )
    index = models.PositiveIntegerField(
        max_length=2,
        )
    question = models.CharField(
        max_length=500,
    )