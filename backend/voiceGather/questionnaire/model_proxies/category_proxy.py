from typing import List
from questionnaire.models.category import Category
from questionnaire.core.query_parameter import CategoryListQueryParam


class CategoryProxy(Category):
    '''
    カテゴリデータへのアクセスクラス
    '''
    class Meta:
        proxy = True
    
    def find(self, params:'CategoryListQueryParam') -> List[Category]:
        # クエリパラメータからquerysetを生成する
        query_set = Category.objects.all()

        if params.order_by:
            _order_by = params.order_by
            if params.order_by not in [field.name for field in self._meta.get_fields()]:
                _order_by = 'categoryhistory__' + _order_by

            order_by = '-' + _order_by if params.order == 'desc' else _order_by

            query_set = query_set.order_by(order_by)

        offset = params.offset if params.offset else 0
        if params.size:
            query_set = query_set[offset:params.size]
        else:
            query_set = query_set[offset:]

        return list(query_set)
