from typing import List
from questionnaire.model_proxies.keyword_history_proxy import KeywordHistoryProxy
from questionnaire.core.schema import KeywordSummary


class KeywordService:
    
    def get_list(self, params) -> List[KeywordSummary]:
        keywords = KeywordHistoryProxy().find(params)

        result = []
        for keyword in keywords:
            _keyword = KeywordSummary(
                keyword.id, 
                keyword.keyword, 
                keyword.fast_rising, 
                )
            result.append(_keyword)

        return result
