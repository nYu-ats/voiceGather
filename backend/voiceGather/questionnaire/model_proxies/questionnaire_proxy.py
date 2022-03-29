from django.db.models import Q, Prefetch
from django.utils import timezone
from questionnaire.models.questionnaire import Questionnaire
from questionnaire.model_proxies.category_mapping_proxy import CategoryMappingProxy

class QuestionnaireProxy(Questionnaire):
    '''
    アンケートデータ操作のサービスクラス
    '''
    class Meta:
        proxy = True
    
    @classmethod
    def get_queryset(cls, parameter):
        # クエリパラメータからquerysetを生成する
        query_set = cls.objects.all()
        
        '''filter条件のセット'''
        category_condition= Q(
            id__in = CategoryMappingProxy.extract_questionnaire_ids(parameter.getlist('category[]'))
            ) if parameter.getlist('category[]') else Q()

        keyword_condition = Q()
        if parameter.getlist('keyword[]'):
            for target in parameter.getlist('keyword[]'):
                keyword_condition.add(
                    Q(title__icontains = target),
                    Q.OR
                    )
                keyword_condition.add(
                    Q(overview__icontains = target),
                    Q.OR
                )
        
        start_date_condition = Q(
            start_at__gte = parameter.get('start-date')
        ) if parameter.get('start-date') else Q()

        end_date_condition = Q(
            end_at_lte = parameter.get('end-date')
        ) if parameter.get('end-date') else Q()

        answerable_condition = Q(
            end_at__gte = timezone.localdate()
        ) if parameter.get('answerable') else Q()

        query_set = query_set.filter(
            category_condition &
            keyword_condition &
            start_date_condition &
            end_date_condition &
            answerable_condition)
        
        '''並べ替え条件のセット'''
        # order及びorder_byパラメータはascもしくはdescで必ず取得可能
        if parameter.get('order') and parameter.get('order_by'):
            order_by = '-' + parameter.get('order_by') \
            if parameter.get('order') == 'desc' else parameter.get('order_by')

            query_set = query_set.order_by(order_by)
        
        # CategoryMappingテーブルと結合
        # cattegory_mapping_queryset = CategoryMappingProxy.get_queryset(parameter.getlist('category[]'))
        # query_set = query_set.prefetch_related(
        #     Prefetch(
        #         "categorymapping_set",
        #         queryset=cattegory_mapping_queryset
        #         ))

        return query_set

    @classmethod
    def get_queryset_detail(cls, data):
        pass