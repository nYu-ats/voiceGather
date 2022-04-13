from django.db import models
from .app_base_model import AppBaseModel

class Category(AppBaseModel):
    '''
    カテゴリマスタデータモデル
    '''
    class Meta:
        db_table = 'category'
        abstract = False

    name = models.CharField(
        max_length=50,
        )
