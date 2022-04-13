from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .app_base_model import AppBaseModel

class KeywordHisotry(AppBaseModel):
    '''
    キーワード履歴モデル
    '''
    class Meta:
        db_table = 'keyword_history'
        abstract = False
    
    keyword = models.CharField(
        max_length=50,
    )
    count = models.PositiveIntegerField(
        max_length=10,
    )