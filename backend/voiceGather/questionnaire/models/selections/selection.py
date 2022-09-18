from django.db import models
from ..app_base_model import AppBaseModel

class Selection(AppBaseModel):
    '''
    選択式の回答モデル
    '''
    class Meta:
        db_table = 'selection'
        abstract = False
        constraints = [
            models.UniqueConstraint(
                fields = ['question_id', 'number'],
                name = 'selection_unique'
            )
        ]
    
    question = models.ForeignKey(
        'QuestionSelect',
        on_delete=models.CASCADE,
        max_length=10,
    )
    number = models.PositiveIntegerField()
    content = models.CharField(
        max_length=500,
    )
