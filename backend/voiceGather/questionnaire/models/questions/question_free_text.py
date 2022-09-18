from django.db import models
from ..app_base_model import AppBaseModel


class QuestionFreeText(AppBaseModel):
    '''
    自由記述形式の設問モデル
    '''
    class Meta:
        db_table = 'question_free_text'
        abstract = False
        constraints = [
            models.UniqueConstraint(
                fields=['questionnaire_id', 'index', 'is_sub_question'],
                name='question_text_unique'
            )
        ]

    questionnaire = models.ForeignKey(
        'Questionnaire',
        on_delete=models.CASCADE,
        max_length=10,
        )
    index = models.PositiveIntegerField()
    is_sub_question = models.BooleanField(
        default=False,
        )
    question = models.CharField(
        max_length=500,
        )
    answer_max_length = models.PositiveIntegerField(
        default=500,
        )
    required = models.BooleanField(
        default=False,
        )
    answer_count = models.PositiveIntegerField(
        default=1,
        )
