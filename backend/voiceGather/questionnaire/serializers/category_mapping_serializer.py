from rest_framework import serializers
from questionnaire.model_proxies.category_mapping_proxy import CategoryMappingProxy
from questionnaire.serializers.category_serializer import CategorySerializer

class CategoryMappingSerializer(serializers.ModelSerializer):
    '''
    カテゴリ操シリアライザー
    '''
    category = CategorySerializer()
    class Meta:
        model = CategoryMappingProxy
        fields = ('category',)
        depth = 1