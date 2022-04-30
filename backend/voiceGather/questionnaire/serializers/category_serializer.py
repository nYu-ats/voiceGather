from rest_framework import serializers
from questionnaire.models import Category
from questionnaire.model_proxies.category_proxy import CategoryProxy
from questionnaire.services.category_service import CategoryService

class CategorySerializer(serializers.ModelSerializer):
    '''
    カテゴリ用シリアライザー
    '''
    class Meta:
        model = Category
        fields = ('id', 'name')

    def get_list(self, params):
        service = CategoryService(CategoryProxy())
        return service.get_list(params)