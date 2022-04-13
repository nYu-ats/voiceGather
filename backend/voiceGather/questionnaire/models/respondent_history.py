from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .app_base_model import AppBaseModel
from .questionnaire import Questionnaire

class RespondentHistory(AppBaseModel):
    '''
    回答者履歴情報モデル
    '''
    class Meta:
        db_table = 'respondent_history'
        abstract = False
    
    questionnaire = models.ForeignKey(
        'Questionnaire',
        on_delete=models.CASCADE,
        max_length=10,
        )
    respondent_id = models.CharField(
        max_length=256,
    )
    ip_address=models.CharField(
        max_length=15,
    )