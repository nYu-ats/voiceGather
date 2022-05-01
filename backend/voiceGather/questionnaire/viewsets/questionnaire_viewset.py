from rest_framework import viewsets
from rest_framework.response import Response
from questionnaire.serializers.questionnaire_serializer import QuestionnaireSerializer

class QuestionnaireViewSet(viewsets.ViewSet):
    '''
    アンケート取得・作成・更新用ビューセット
    '''
    def list(self, request):
        serializer = QuestionnaireSerializer()
        return Response(
            serializer.get_list(self.request.query_params)
            )
    
    def retrieve(self, request, pk=None):
        serializer = QuestionnaireSerializer()
        return Response(
            serializer.get_detail(pk)
            )
