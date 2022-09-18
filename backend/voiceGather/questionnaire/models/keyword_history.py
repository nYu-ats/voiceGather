from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .app_base_model import AppBaseModel

class KeywordHistory(AppBaseModel):
    '''
    キーワード履歴モデル
    '''
    class Meta:
        db_table = 'keyword_history'
        abstract = False
    
    keyword = models.CharField(
        max_length=50,
    )
    count = models.PositiveIntegerField()
    count_this_week = models.PositiveIntegerField(
        default = 0,
    )
    count_previous_week = models.PositiveIntegerField(
        default = 0,
    )
    fast_rising = models.PositiveIntegerField(
        default = 0,
    )