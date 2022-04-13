from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .app_base_model import AppBaseModel
from .category import Category

class CategoryHisotry(AppBaseModel):
    '''
    キーワード履歴モデル
    '''
    class Meta:
        db_table = 'category_history'
        abstract = False
    
    category = models.ForeignKey(
        'Category',
        on_delete=models.CASCADE,
        max_length=10,
    )
    count = models.PositiveIntegerField(
        max_length=10,
    )