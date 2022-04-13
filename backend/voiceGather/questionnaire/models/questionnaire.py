from django.utils import timezone
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .app_base_model import AppBaseModel

class Questionnaire(AppBaseModel):
    '''
    アンケート情報モデル
    '''
    class Meta:
        db_table = 'questionnaire'
        abstract = False
        
    title = models.CharField(
        max_length=100,
        )
    overview = models.CharField(
        max_length=300,
        default = None,
        null = True,
        )
    watched_count = models.PositiveIntegerField(
        validators = [MinValueValidator(0), MaxValueValidator(10000000)],
        default = 0,
    )
    answer_count = models.PositiveIntegerField(
        validators = [MinValueValidator(0), MaxValueValidator(10000000)],
        default = 0,
    )
    scope = models.PositiveIntegerField(
        validators = [MinValueValidator(1), MaxValueValidator(5)],
        default = 1
        )
    start_at = models.DateField(
        default = timezone.localdate,
        null = True,
    )
    end_at = models.DateField(
        default = None,
        null = True,
    )
