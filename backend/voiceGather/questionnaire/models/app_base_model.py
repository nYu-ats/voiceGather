from django.db import models
from django.utils import timezone

class AppBaseModel(models.Model):
    '''
    アプリケーション共通で利用するフィールド群
    '''
    class Meta:
        abstract = True
    
    created_at = models.DateTimeField(
        default = timezone.now,
    )
    updated_at = models.DateTimeField(
        default = timezone.now,
    )
    deleted_at = models.DateTimeField(
        default = timezone.now,
        null = True,
    )
    is_deleted = models.BooleanField(
        default=False,
    )
