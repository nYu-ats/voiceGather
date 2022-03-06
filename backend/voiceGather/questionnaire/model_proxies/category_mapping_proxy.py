from questionnaire.models.category_mapping import CategoryMapping
from questionnaire.model_proxies.category_proxy import CategoryProxy

class CategoryMappingProxy(CategoryMapping):
    '''
    アンケートとカテゴリのマッピングデータ操作のサービスクラス
    '''
    class Meta:
        proxy = True
    
    @classmethod
    def get_all(cls):
        return list(cls.objects.all())

    @classmethod
    def extract_questionnaire_ids(cls, target):
        # カテゴリでフィルタリングしたアンケートidのリストを返す
        return [
            obj.questionnaire_id for obj in list(cls.objects.filter(category__name__in = target))
            ]

    @classmethod
    def get_queryset(cls, target=None):
        # カテゴリ名でフィルタリングしたQuerySetを返す
        query_set = CategoryMapping.objects.all()
        return query_set