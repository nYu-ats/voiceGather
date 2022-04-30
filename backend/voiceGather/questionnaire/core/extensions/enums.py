from enum import IntEnum

class QuestionType(IntEnum):
    '''
    設問タイプ
    '''
    FREE_TEXT = 1

    def get_name_lower(self):
        return str.lower(self.name)