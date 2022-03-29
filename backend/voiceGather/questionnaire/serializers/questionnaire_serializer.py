from rest_framework import serializers
from questionnaire.model_proxies.questionnaire_proxy import QuestionnaireProxy
from questionnaire.model_proxies.category_proxy import CategoryProxy
from questionnaire.serializers.category_mapping_serializer import CategoryMappingSerializer

class QuestionnaireSerializer(serializers.ModelSerializer):
    '''
    アンケート用シリアライザー
    '''
    categorymapping_set = CategoryMappingSerializer(many=True)

    class Meta:
        model = QuestionnaireProxy
        fields = ('id', 'created_at', 'title', 'overview', 'answer_count', 'scope', 'start_at', 'end_at', 'categorymapping_set')
        extra_fields = ('order', 'order_by', 'keyword', 'category')
        depth = 2
    
    @classmethod
    def get_queryset(cls, parameter):
        return QuestionnaireProxy.get_queryset(parameter)

    def validate(self, parameter):
        return parameter

    def validate_category(self, value):
        if not set(value).issubset(CategoryProxy.get_category_all()):
            raise serializers.ValidationError(
                f'存在しないカテゴリ: {value}'
            )
        
        return value
    
    def validate_created_at(self, value):
        return value

    def validate_start_at(self, value):
        return value

    def validate_end_at(self, value):
        return value
    
    def validate_order(self, value):
        return value

    def validate_order_by(self, value):
        return value

    def validate_keyword(self, value):
        return value
