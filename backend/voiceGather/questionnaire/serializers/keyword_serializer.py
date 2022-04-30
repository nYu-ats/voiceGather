from rest_framework import serializers
from questionnaire.models import KeywordHistory
from questionnaire.model_proxies.keyword_history_proxy import KeywordHistoryProxy
from questionnaire.services.keyword_service import KeywordService

class KeywordSerializer(serializers.ModelSerializer):
    '''
    カテゴリ用シリアライザー
    '''
    class Meta:
        model = KeywordHistory

    def get_list(self, params):
        service = KeywordService(KeywordHistoryProxy())
        return service.get_list(params)
