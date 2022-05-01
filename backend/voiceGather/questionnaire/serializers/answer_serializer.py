from rest_framework import serializers
from questionnaire.services.answer_service import AnswerService

class AnswerSerializer(serializers.Serializer):
    '''
    回答用シリアライザー
    '''

    def get_list(self, params):
        service = AnswerService()
        return service.get_list(params)