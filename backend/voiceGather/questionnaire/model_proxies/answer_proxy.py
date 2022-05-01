from questionnaire.models.answers.answer_free_text import AnswerFreeText
from questionnaire.core.dto import AnswerFreeTextDto, FreeTextContentDto
from questionnaire.core.extensions.enums import QuestionType

class AnswerProxy:

    def find_by(self, params):
        tb_cls, dto_cls, content_dto_cls = self.__select_cls(params.get('qType'))
        answers = list(
            tb_cls.objects.filter(question_id = params.get('questionId')))

        contents = []
        for answer in answers:
            contents.append(
                content_dto_cls(
                    id = answer.id,
                    answer = answer.answer,
                    createdAt = answer.created_at
                )
            )
        
        result = dto_cls(
            questionId = params.get('questionId'),
            questionType = params.get('qType'),
            content = contents
        )

        return result

    def __select_cls(self, q_type):
        if QuestionType(int(q_type)) == QuestionType.FREE_TEXT:
            return AnswerFreeText, AnswerFreeTextDto, FreeTextContentDto
