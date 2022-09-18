from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .app_base_model import AppBaseModel
from .questionnaire import Questionnaire

class QuestionnaireMeta(AppBaseModel):
    '''
    アンケート設問メタ情報モデル
    '''
    class Meta:
        db_table = 'questionnaire_meta'
        abstract = False
        constraints = [
            models.UniqueConstraint(
                fields = ['questionnaire_id', 'index', 'sub_index'],
                name = 'question_unique'
            ),
        ]
        
    questionnaire = models.ForeignKey(
        'Questionnaire',
        on_delete=models.CASCADE,
        max_length=10,
        )
    index = models.PositiveIntegerField()
    sub_index = models.PositiveIntegerField(
        null=True,
        )
    question_type = models.PositiveIntegerField()
