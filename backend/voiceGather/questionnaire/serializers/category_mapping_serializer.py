from rest_framework import serializers
from questionnaire.models.category_mapping import CategoryMapping
from questionnaire.serializers.category_serializer import CategorySerializer

class CategoryMappingSerializer(serializers.ModelSerializer):
    '''
    カテゴリ操シリアライザー
    '''
    category = CategorySerializer()
    class Meta:
        model = CategoryMapping
        fields = ('category',)
        depth = 1