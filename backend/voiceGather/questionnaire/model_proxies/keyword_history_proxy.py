from questionnaire.models.keyword_history import KeywordHistory
from questionnaire.core.dto import KeywordDto

class KeywordHistoryProxy(KeywordHistory):
    '''
    キーワードデータ操作のサービスクラス
    '''
    class Meta:
        proxy = True
    
    def find(self, params):
        # クエリパラメータからquerysetを生成する
        query_set = KeywordHistory.objects.all()
        
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
        for keyword in list(query_set):
            keyword_dto = KeywordDto(
                keyword.id, 
                keyword.keyword, 
                keyword.fast_rising, 
                )
            result.append(keyword_dto)

        return result
