'''
テストデータとして作成されるレコードを表すクラス
'''

class Records:

    __model_cls = None

    def __init__(self, model):
        self.__model_cls = model
        self.__fields = self.__model_cls._meta.get_fields()
        self.__records = []
        self.__fields = []
        self.count = 0

    def add(self, kwargs):
        try:
            instance = self.__model_cls(**kwargs)
            self.__records.append(instance)
            self.count += 1
            return True
        except:
            return False
    
    def bulk_create(self):
        try:
            self.__model_cls.objects.bulk_create(self.__records)
            return True
        except:
            return False
 
    def get_count(self):
        return self.count

    def get_all(self):
        return list(self.__model_cls.objects.all())
