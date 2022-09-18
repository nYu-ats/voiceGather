from questionnaire.model_proxies.category_proxy import CategoryProxy
from questionnaire.core.schema import CategorySummary


class CategoryService:
    
    def get_list(self, params):
        categories = CategoryProxy().find(params)

        result = []
        for category in categories:
            _category = CategorySummary(
                category.id, 
                category.name, 
                category.categoryhistory.count
                )
            result.append(_category)

        return result