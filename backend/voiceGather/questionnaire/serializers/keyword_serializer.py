from rest_framework import serializers
from questionnaire.models import KeywordHistory
from questionnaire.services.keyword_service import KeywordService

class KeywordSerializer(serializers.ModelSerializer):
    '''
    カテゴリ用シリアライザー
    '''
    class Meta:
        model = KeywordHistory

    def get_list(self, params):
        service = KeywordService()
        return [result.as_dict() for result in service.get_list(params)]
