class CategoryService:

    def __init__(self, model_proxy):
        self.proxy = model_proxy
    
    def get_list(self, params):
        dtos = self.proxy.find(params)
        return [dto.as_dict() for dto in dtos]