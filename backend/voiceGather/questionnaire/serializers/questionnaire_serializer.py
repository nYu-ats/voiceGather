from rest_framework import serializers
from questionnaire.models.questionnaire import Questionnaire
from questionnaire.serializers.category_mapping_serializer import CategoryMappingSerializer
from questionnaire.services.questionnaire_service import QuestionnaireService

class QuestionnaireSerializer(serializers.ModelSerializer):
    '''
    アンケート用シリアライザー
    '''
    categorymapping_set = CategoryMappingSerializer(many=True)

    class Meta:
        model = Questionnaire
        fields = ('id', 'created_at', 'title', 'overview', 'answer_count', 'scope', 'start_at', 'end_at', 'categorymapping_set')
        extra_fields = ('order', 'order_by', 'keyword', 'category')
        depth = 2
    
    def get_list(self, params):
        service = QuestionnaireService()
        return service.get_list(params)

    def get_detail(self, pk):
        service = QuestionnaireService()
        return service.get_detail(pk)