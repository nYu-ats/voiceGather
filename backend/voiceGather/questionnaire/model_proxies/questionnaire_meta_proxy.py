from questionnaire.models.questionnaire_meta import QuestionnaireMeta


class QuestionnaireMetaProxy(QuestionnaireMeta):
    '''
    アンケートメタデータモデルのプロキシ
    '''
    class Meta:
        proxy = True
    
    def find_by(self, pk):
        return list(QuestionnaireMeta.objects.filter(questionnaire_id = pk))
