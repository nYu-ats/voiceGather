import uuid
from django.db import models
from ..app_base_model import AppBaseModel


class AnswerSelect(AppBaseModel):
    '''
    選択式の回答モデル
    '''
    class Meta:
        db_table = 'answer_select'
        abstract = False
    
    question = models.ForeignKey(
        'QuestionSelect',
        on_delete=models.CASCADE,
        max_length=10,
        )
    selection = models.ForeignKey(
        'Selection',
        on_delete=models.CASCADE,
        max_length=10,
        )
    answer_uuid = models.CharField(
        max_length=36,
        default=str(uuid.uuid4()),
        )
    parent_answer_uuid = models.CharField(
        max_length=36,
        null=True,
        )