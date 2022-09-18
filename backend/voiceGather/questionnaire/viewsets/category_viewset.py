from rest_framework import viewsets
from rest_framework.response import Response
from questionnaire.serializers.category_serializer import CategorySerializer
from questionnaire.core.query_parameter import CategoryListQueryParam


class CategoryViewSet(viewsets.ViewSet):
    '''
    カテゴリ取得用
    '''
    def list(self, request):
        serializer = CategorySerializer()
        parameter = CategoryListQueryParam(request.query_params)

        return Response(serializer.get_list(parameter))
