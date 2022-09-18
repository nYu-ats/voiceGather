from django.db import models
from ..app_base_model import AppBaseModel

class QuestionSelect(AppBaseModel):
    '''
    選択式の設問モデル
    '''
    class Meta:
        db_table = 'question_select'
        abstract = False
        constraints = [
            models.UniqueConstraint(
                fields = ['questionnaire_id', 'index', 'is_sub_question'],
                name = 'question_select_unique'
            )
        ]
    
    questionnaire = models.ForeignKey(
        'Questionnaire',
        on_delete=models.CASCADE,
        max_length=10,
        )
    index = models.PositiveIntegerField()
    is_sub_question = models.BooleanField(
        default=False,
        )
    question = models.CharField(
        max_length=500,
        )
    required = models.BooleanField(
        default=False,
        )
    multi_select = models.BooleanField(
        default=False,
        )
