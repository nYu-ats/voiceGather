from questionnaire.model_proxies.answer_proxy import AnswerProxy

class AnswerService:

    def __init__(self):
        pass

    def get_list(self, params):
        answer_dto = AnswerProxy().find_by(params)
        return answer_dto.as_dict()