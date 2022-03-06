from django.db import models
from .app_base_model import AppBaseModel
from .category import Category
from .questionnaire import Questionnaire

class CategoryMapping(AppBaseModel):
    '''
    アンケートとカテゴリのマッピングモデル
    '''
    class Meta:
        db_table = 'category_mapping'
        abstract = False
        constraints = [
            models.UniqueConstraint(
                fields = ['questionnaire_id', 'category_id'],
                name = 'mapping_unique',
            ),
        ]

    questionnaire = models.ForeignKey(
        'Questionnaire',
        on_delete = models.CASCADE,
        max_length = 10,
    )
    category = models.ForeignKey(
        'Category',
        on_delete = models.CASCADE,
        max_length = 10,
    )
