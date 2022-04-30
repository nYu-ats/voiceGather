from questionnaire.models.category import Category
from questionnaire.models.category_history import CategoryHistory
from questionnaire.core.dto import CategoryDto

class CategoryProxy(Category):
    '''
    カテゴリデータ操作のサービスクラス
    '''
    class Meta:
        proxy = True
    
    def find(self, params):
        # クエリパラメータからquerysetを生成する
        query_set = Category.objects.all()
        
        '''並べ替え条件のセット'''
        # order及びorder_byパラメータはascもしくはdescで必ず取得可能
        if params.get('orderBy'):
            # パラメータ指定の仕方もうちょいシンプルに
            if params.get('orderBy') not in [field.name for field in self._meta.get_fields()]:
                order_by = '-' + 'categoryhistory__' + params.get('orderBy') \
                if params.get('order') == 'desc' else 'categoryhistory__' + params.get('orderBy')                
            else:
                order_by = '-' + params.get('orderBy') \
                if params.get('order') == 'desc' else params.get('orderBy')

            query_set = query_set.order_by(order_by)

        '''取得件数のセット'''
        if params.get('size'):
            query_set = query_set[:int(params.get('size'))]        

        result = []
        for category in list(query_set):
            cat_dto = CategoryDto(category.id, category.name, category.categoryhistory.count)
            result.append(cat_dto)

        return result
