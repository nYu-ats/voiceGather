import uuid
from django.db import models
from ..app_base_model import AppBaseModel


class AnswerFreeText(AppBaseModel):
    '''
    自由記述形式の回答モデル
    '''
    class Meta:
        db_table = 'answer_free_text'
        abstract = False
    
    question = models.ForeignKey(
        'QuestionFreeText',
        on_delete=models.CASCADE,
        max_length=10,
        )
    answer = models.CharField(
        max_length=500,
        )
    answer_uuid = models.CharField(
        max_length=36,
        default=str(uuid.uuid4()),
        )
    parent_answer_uuid = models.CharField(
        max_length=36,
        null=True,
        )
