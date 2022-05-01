from rest_framework import viewsets
from rest_framework.response import Response
from questionnaire.serializers.answer_serializer import AnswerSerializer

class AnswerViewSet(viewsets.ViewSet):
    '''
    回答取得、作成用ビューセット
    '''

    def list(self, request):
        serializer = AnswerSerializer()
        return Response(
            serializer.get_list(self.request.query_params)
        )
