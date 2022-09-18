from questionnaire.models.selections.selection import Selection

class SelectionProxy(Selection):
    '''
    選択肢モデルのプロキシ
    '''
    class Meta:
        proxy = True
    
    def find_by(self, question_id:str):
        return list(Selection.objects.filter(question_id=question_id))

    def find_in(self, question_ids):
        return list(Selection.objects.filter(question_id__in = question_ids))
