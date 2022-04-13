import yaml
from pathlib import Path
from typing import final
from supports.create_test_data.record_wrapper import (
    QuestoinnaireWrapper,
    CategoryWrapper,
    CategoryMappingWrapper,
    QuestionnaireMetaWrapper,
    QuestionFreeTextWrapper,
    AnswerFreeTextWrapper,
    KeywordHistoryWrapper,
    CategoryHistoryWrapper,
)

class TestData:
    '''
    ローカルテストデータを作成するクラス
    '''

    def __init__(self, path):
        with path.open('r', encoding='utf-8') as yml:
            self.__test_resource = yaml.safe_load(yml)

    @final
    def create(self):
        questionnaire = QuestoinnaireWrapper(self.__test_resource.get('questionnaire'))
        questionnaire.create()

        category = CategoryWrapper(self.__test_resource.get('category'))
        category.create()

        category_map = CategoryMappingWrapper({}, category.get_all(), questionnaire.get_all())
        category_map.create()

        questionnaire_meta = QuestionnaireMetaWrapper({}, questionnaire.get_all())
        questionnaire_meta.create()

        question_free_text = QuestionFreeTextWrapper(
            self.__test_resource.get('questionnaire'), questionnaire_meta.get_all()
            )
        question_free_text.create()

        answer_free_text = AnswerFreeTextWrapper(
            self.__test_resource.get('questionnaire'), question_free_text.get_all()
            )
        answer_free_text.create()

        keyword_history = KeywordHistoryWrapper(self.__test_resource.get('questionnaire'))
        keyword_history.create()

        category_history = CategoryHistoryWrapper({}, category.get_all())
        category_history.create()

if __name__ == "__main__":
    path = Path("./resource/test_data.yaml")
    td = TestData(path)
    td.create()
