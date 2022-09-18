from typing import List
from questionnaire.models.keyword_history import KeywordHistory
from questionnaire.core.query_parameter import KeywordListQueryParam


class KeywordHistoryProxy(KeywordHistory):
    '''
    キーワードデータへのアクセスクラス
    '''

    class Meta:
        proxy = True
    
    def find(self, params:'KeywordListQueryParam') ->List[KeywordHistory]:
        query_set = KeywordHistory.objects.all()

        if params.order_by:
            order_by = '-' + params.order_by if params.order == 'desc' else params.order_by
            query_set = query_set.order_by(order_by)

        offset = params.offset if params.offset else 0
        if params.size:
            query_set = query_set[offset:params.size]
        else:
            query_set = query_set[offset:]

        return list(query_set)
