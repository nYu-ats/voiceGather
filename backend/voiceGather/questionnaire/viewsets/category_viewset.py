from rest_framework import viewsets
from questionnaire.serializers.category_serializer import CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    '''
    カテゴリ取得用
    '''

    serializer_class = CategorySerializer

    def get_queryset(self):

        return self.serializer_class.get_queryset()