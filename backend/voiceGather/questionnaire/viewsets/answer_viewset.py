from questionnaire.core.query_parameter import AnswerListQueryParam
from questionnaire.serializers.answer_serializer import AnswerSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class AnswerViewSet(viewsets.ViewSet):
    """
    回答取得、作成用ビューセット
    """

    def list(self, request):
        serializer = AnswerSerializer()
        parameter = AnswerListQueryParam(request.query_params)
        if "text_answer" in request.path:
            parameter.question_type = "1"
        elif "select_answer" in request.path:
            parameter.question_type = "2"

        return Response(serializer.get_list(parameter))
