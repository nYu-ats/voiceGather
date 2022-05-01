from questionnaire.models.questions.question_free_text import QuestionFreeText
from questionnaire.core.dto import QuestionFreeTextDto
from questionnaire.core.extensions.enums import QuestionType

class QuestionProxy:

    def collect_questions(self, question_group):
        for question_type, questionnaire_id in question_group.items():
            tb_cls, dto_cls = self.__select_cls(question_type)
            questions = list(
                tb_cls.objects.filter(questionnaire_id = questionnaire_id))

            result = []
            for question in questions:
                result.append(
                    dto_cls(
                        id = question.id,
                        questionnaireId = questionnaire_id,
                        index = question.index,
                        questionType = question_type,
                        question = question.question
                    )
                )

        return result

    def __select_cls(self, q_type):
        if q_type == QuestionType.FREE_TEXT:
            return QuestionFreeText, QuestionFreeTextDto
