from rest_framework import viewsets
from rest_framework.response import Response
from questionnaire.serializers.keyword_serializer import KeywordSerializer
from questionnaire.core.query_parameter import KeywordListQueryParam

class KeywordViewSet(viewsets.ViewSet):
    '''
    キーワード取得用ビューセット
    '''
    def list(self, request):
        serializer = KeywordSerializer()
        parameter = KeywordListQueryParam(request.query_params)

        return Response(serializer.get_list(parameter))
