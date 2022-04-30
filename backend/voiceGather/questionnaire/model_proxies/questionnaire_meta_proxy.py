from questionnaire.models.questionnaire_meta import QuestionnaireMeta
from questionnaire.core.dto import QuestionnaireMetaDto
from questionnaire.core.extensions.enums import QuestionType

class QuestionnaireMetaProxy(QuestionnaireMeta):
    '''
    アンケートメタデータモデルのプロキシ
    '''
    class Meta:
        proxy = True
    
    def find_one(self, pk):
        q_metas = list(QuestionnaireMeta.objects.filter(questionnaire_id = pk))
        
        result = []
        for q_meta in q_metas:
            result.append(
                QuestionnaireMetaDto(
                    id = q_meta.id,
                    questionnaireId = q_meta.questionnaire_id,
                    index = q_meta.index,
                    questionType = QuestionType(q_meta.question_type)
                )
            )
        return result
