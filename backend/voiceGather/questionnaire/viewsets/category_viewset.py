from rest_framework import viewsets
from rest_framework.response import Response
from questionnaire.serializers.category_serializer import CategorySerializer

class CategoryViewSet(viewsets.ViewSet):
    '''
    カテゴリ取得用
    '''
    def list(self, rquest):
        serializer = CategorySerializer()
        return Response(
            serializer.get_list(self.request.query_params)
            ) 