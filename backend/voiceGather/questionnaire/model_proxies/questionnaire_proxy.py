from django.db.models import Q
from django.utils import timezone
from questionnaire.models.questionnaire import Questionnaire
from questionnaire.model_proxies.category_mapping_proxy import CategoryMappingProxy
from questionnaire.core.dto import QuestionnaireDto, CategoryDto

class QuestionnaireProxy(Questionnaire):
    '''
    アンケートデータモデルのプロキシ
    '''
    class Meta:
        proxy = True
    
    def find_by(self, params):
        # クエリパラメータからquerysetを生成する
        query_set = Questionnaire.objects.all()
        
        '''filter条件のセット'''
        print(params.get('category[]'))
        category_condition= Q(
            id__in = CategoryMappingProxy().extract_questionnaire_ids(params.getlist('category[]'))
            ) if params.getlist('category[]') else Q()

        keyword_condition = Q()
        if params.getlist('keyword[]'):
            for target in params.getlist('keyword[]'):
                keyword_condition.add(
                    Q(title__icontains = target),
                    Q.OR
                    )
                keyword_condition.add(
                    Q(overview__icontains = target),
                    Q.OR
                )
        
        start_date_condition = Q(
            start_at__gte = params.get('startDate')
        ) if params.get('startDate') else Q()

        end_date_condition = Q(
            start_at__lte = params.get('endDate')
        ) if params.get('endDate') else Q()

        answerable_condition = Q(
            end_at__gte = timezone.localdate()
        ) if params.get('answerable') else Q()

        query_set = query_set.filter(
            category_condition &
            keyword_condition &
            start_date_condition &
            end_date_condition &
            answerable_condition)
        
        '''並べ替え条件のセット'''
        # order及びorder_byパラメータはascもしくはdescで必ず取得可能
        if params.get('orderBy'):
            order_by = '-' + params.get('orderBy') \
            if params.get('order') == 'desc' else params.get('orderBy')

            query_set = query_set.order_by(order_by)
        
        '''取得件数のセット'''
        if params.get('size'):
            query_set = query_set[:int(params.get('size'))]

        result = []
        for questionnaire in list(query_set):
            categories = []
            for mapping in questionnaire.categorymapping_set.all():
                cat_dto = CategoryDto(mapping.category.id, mapping.category.name)
                categories.append(cat_dto)
            
            result.append(
                QuestionnaireDto(
                    id=questionnaire.id,
                    title=questionnaire.title,
                    overview=questionnaire.overview,
                    answerCount=questionnaire.answer_count,
                    scope=questionnaire.scope,
                    startAt=questionnaire.start_at,
                    endAt=questionnaire.end_at,
                    createdAt=questionnaire.created_at,
                    categories=categories),
                    )

        return result
