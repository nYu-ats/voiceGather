from questionnaire.model_proxies.questionnaire_proxy import QuestionnaireProxy
from questionnaire.model_proxies.questionnaire_meta_proxy import QuestionnaireMetaProxy
from questionnaire.model_proxies.question_proxy import QuestionProxy
from questionnaire.core.extensions.enums import QuestionType

class QuestionnaireService:

    def __init__(self):
        pass

    def get_list(self, params):
        questionnaire_dtos = QuestionnaireProxy().find_by(params)
        return [dto.as_dict() for dto in questionnaire_dtos]

    def get_detail(self, pk):
        q_meta_dtos = QuestionnaireMetaProxy().find_one(pk)
        # question typeでグループ分け
        question_group = {}
        for q_meta in q_meta_dtos:
            if question_group.get(q_meta.question_type):
                pass
            else:
                question_group[q_meta.question_type] = q_meta.questionnaire_id
        
        question_dtos = QuestionProxy().collect_questions(question_group)

        return [dto.as_dict() for dto in question_dtos]