from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .app_base_model import AppBaseModel
from .questionnaire import Questionnaire

class QuestionnaireManage(AppBaseModel):
    '''
    アンケート管理情報モデル
    '''
    class Meta:
        db_table = 'questionnaire_manage'
        abstract = False
    
    questionnaire = models.ForeignKey(
        'Questionnaire',
        on_delete=models.CASCADE,
        max_length=10,
        )
    management_id = models.CharField(
        max_length=256,
    )
    key_phrase = models.CharField(
        max_length=20,
    )
