from questionnaire.models.questions.question_free_text import QuestionFreeText
from questionnaire.models.questions.question_select import QuestionSelect


class TextQuestionProxy(QuestionFreeText):

    class Meta:
        proxy = True

    def find_by(self, questionnaire_id):
        return list(QuestionFreeText.objects.filter(questionnaire_id = questionnaire_id))


class SelectQuestionProxy(QuestionSelect):

    class Meta:
        proxy = True

    def get_questions(self, questionnaire_id):
        return list(QuestionSelect.objects.filter(questionnaire_id = questionnaire_id))
