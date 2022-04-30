from rest_framework import viewsets
from rest_framework.response import Response
from questionnaire.serializers.keyword_serializer import KeywordSerializer

class KeywordViewSet(viewsets.ViewSet):
    '''
    キーワード取得用ビューセット
    '''
    def list(self, request):
        serializer = KeywordSerializer()
        return Response(
            serializer.get_list(self.request.query_params)
            )
