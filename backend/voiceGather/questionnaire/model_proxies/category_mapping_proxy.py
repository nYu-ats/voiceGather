from questionnaire.models.category_mapping import CategoryMapping
from questionnaire.model_proxies.category_proxy import CategoryProxy

class CategoryMappingProxy(CategoryMapping):
    '''
    アンケートとカテゴリのマッピングデータ操作のサービスクラス
    '''
    class Meta:
        proxy = True
    
    def extract_questionnaire_ids(self, target):
        # カテゴリでフィルタリングしたアンケートidのリストを返す
        return [
            obj.questionnaire_id for obj in list(CategoryMapping.objects.filter(category__name__in = target))
            ]
