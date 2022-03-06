from rest_framework import serializers
from questionnaire.model_proxies.category_proxy import CategoryProxy

class CategorySerializer(serializers.ModelSerializer):
    '''
    カテゴリ用シリアライザー
    '''
    class Meta:
        model = CategoryProxy
        fields = ('id', 'name')

    @classmethod
    def get_queryset(cls):
        return CategoryProxy.get_queryset()