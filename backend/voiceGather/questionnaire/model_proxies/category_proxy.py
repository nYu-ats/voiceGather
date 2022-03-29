from questionnaire.models.category import Category

class CategoryProxy(Category):
    '''
    カテゴリデータ操作のサービスクラス
    '''
    class Meta:
        proxy = True
    
    @classmethod
    def get_queryset(cls):
        return cls.objects.all()

    @classmethod
    def extract_category_ids(cls, category):

        return [
            obj.id for obj in list(Category.objects.filter(name__in = category))
        ]