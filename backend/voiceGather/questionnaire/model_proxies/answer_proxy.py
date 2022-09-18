from typing import Any, List

from django.db.models import Model, Q
from questionnaire.core.query_parameter import AnswerListQueryParam
from questionnaire.models.answers.answer_free_text import AnswerFreeText
from questionnaire.models.answers.answer_select import AnswerSelect


class AnswerProxyFixture:
    def _find_by(self, model_cls: Model, params: "AnswerListQueryParam") -> List[Model]:
        query_set = model_cls.objects.all()

        question_condition = (
            Q(question_id=params.question_id) if params.question_id else Q()
        )

        query_set = query_set.filter(question_condition)

        if params.order_by:
            order_by = (
                "-" + params.order_by if params.order == "desc" else params.order_by
            )
            query_set = query_set.order_by(order_by)

        offset = params.offset if params.offset else 0
        if params.size:
            query_set = query_set[offset : params.size]
        else:
            query_set = query_set[offset:]

        return list(query_set)


class TextAnswerProxy(AnswerFreeText, AnswerProxyFixture):
    """
    テキスト形式の回答データ操作クラス
    """

    class Meta:
        proxy = True

    def find_by(self, params: "AnswerListQueryParam") -> List[AnswerFreeText]:
        return self._find_by(AnswerFreeText, params)

    def get_count(self, question_id: str):
        return (
            AnswerFreeText.objects.distinct()
            .values_list("answer_uuid")
            .filter(question_id=question_id)
            .count()
        )

    def fetch_sub_answers(self, answer_uuid: str) -> List[AnswerFreeText]:
        return list(AnswerFreeText.objects.filter(parent_answer_uuid=answer_uuid))


class SelectAnswerProxy(AnswerSelect, AnswerProxyFixture):
    """
    選択形式の回答データ操作クラス
    """

    class Meta:
        proxy = True

    def find_by(self, params: "AnswerListQueryParam") -> List[AnswerSelect]:
        return self._find_by(AnswerSelect, params)

    def get_count(self, question_id: str, selection_id: str):
        return AnswerSelect.objects.filter(
            question_id=question_id, selection_id=selection_id
        ).count()

    def fetch_sub_answers(self, answer_uuid: str) -> List[AnswerSelect]:
        return list(AnswerSelect.objects.filter(parent_answer_uuid=answer_uuid))
