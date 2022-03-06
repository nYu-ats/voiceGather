from rest_framework import viewsets
from questionnaire.serializers.questionnaire_serializer import QuestionnaireSerializer

class QuestionnaireViewSet(viewsets.ModelViewSet):
    '''
    アンケート取得・作成・更新用ビューセット
    '''
    
    serializer_class = QuestionnaireSerializer

    def get_queryset(self):

        return self.serializer_class.get_queryset(self.request.query_params)