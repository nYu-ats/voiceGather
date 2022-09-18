from typing import List
from django.db.models import Q
from django.utils import timezone
from questionnaire.models.questionnaire import Questionnaire
from questionnaire.core.query_parameter import QuestionnaireListQueryParam


class QuestionnaireProxy(Questionnaire):
    '''
    アンケートデータのアクセスクラス
    '''
    class Meta:
        proxy = True

    def find_by(cls, params: 'QuestionnaireListQueryParam') -> List[Questionnaire]:
        query_set = Questionnaire.objects.all()

        category_condition = Q(
            categorymapping__category__name__in=params.category
            ) if params.category else Q()

        keyword_condition = Q()
        if params.keyword:
            for target in params.keyword:
                keyword_condition.add(Q(title__icontains=target), Q.OR)
                keyword_condition.add(Q(overview__icontains=target), Q.OR)

        start_date_condition = Q(
            start_at__gte=params.start_date
            ) if params.start_date else Q()

        end_date_condition = Q(
            start_at__lte=params.end_date
            ) if params.end_date else Q()

        answerable_condition = Q(
            end_at__gte=timezone.localdate()
            ) if params.is_open else Q()

        query_set = query_set.filter(
            category_condition &
            keyword_condition &
            start_date_condition &
            end_date_condition &
            answerable_condition)

        if params.order_by:
            order_by = '-' + params.order_by if params.order == 'desc' else params.order_by
            query_set = query_set.order_by(order_by)

        offset = params.offset if params.offset else 0
        if params.size:
            query_set = query_set[offset:params.size]
        else:
            query_set = query_set[offset:]

        return list(query_set)

    def get_detail(self, id: int) -> Questionnaire:
        return Questionnaire.objects.get(id=id)