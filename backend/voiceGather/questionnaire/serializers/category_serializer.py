from rest_framework import serializers
from questionnaire.models import Category
from questionnaire.services.category_service import CategoryService

class CategorySerializer(serializers.ModelSerializer):
    '''
    カテゴリ用シリアライザー
    '''
    class Meta:
        model = Category
        fields = ('id', 'name')

    def get_list(self, params):
        service = CategoryService()
        return [data.as_dict() for data in service.get_list(params)]