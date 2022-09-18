from pathlib import Path
from typing import final

import yaml
from questionnaire.supports.create_test_data.record_wrapper import (
    AnswerFreeTextWrapper,
    AnswerSelectWrapper,
    CategoryHistoryWrapper,
    CategoryMappingWrapper,
    CategoryWrapper,
    KeywordHistoryWrapper,
    QuestionFreeTextWrapper,
    QuestionnaireMetaWrapper,
    QuestionSelectWrapper,
    QuestoinnaireWrapper,
    SelectionWrapper,
)


class TestData:
    """
    ローカルテストデータを作成するクラス
    """

    def __init__(self, path):
        with path.open("r", encoding="utf-8") as yml:
            self.__test_resource = yaml.safe_load(yml)

    @final
    def create(self):
        # アンケート概要データ作成
        questionnaire = QuestoinnaireWrapper(self.__test_resource.get("questionnaire"))
        questionnaire.create()

        # カテゴリデータ作成
        category = CategoryWrapper(self.__test_resource.get("category"))
        category.create()

        # カテゴリマッピングデータ作成
        category_map = CategoryMappingWrapper(
            {}, category.get_all(), questionnaire.get_all()
        )
        category_map.create()

        # アンケートメタデータ作成
        questionnaire_meta = QuestionnaireMetaWrapper({}, questionnaire.get_all())
        questionnaire_meta.create()

        # 自由記述設問作成
        question_free_text = QuestionFreeTextWrapper(
            self.__test_resource.get("questionnaire"), questionnaire_meta.get_type_of(1)
        )
        question_free_text.create()

        # 選択式設問作成
        question_select = QuestionSelectWrapper(
            self.__test_resource.get("questionnaire"),
            questionnaire_meta.get_type_of(2),
        )
        question_select.create()

        # 選択式設問選択肢作成
        selection = SelectionWrapper(
            self.__test_resource.get("questionnaire"),
            question_select.get_all(),
        )
        selection.create()

        # 自由記述回答作成
        answer_free_text = AnswerFreeTextWrapper(
            self.__test_resource.get("questionnaire"),
            question_free_text.get_all(),
        )
        answer_free_text.create()

        # 選択式設問回答作成
        answer_select = AnswerSelectWrapper(
            self.__test_resource.get("questionnaire"),
            question_select.get_all(),
        )
        answer_select.create()

        # サブ回答のマッピング
        answer_free_text.mapping_sub_answer(
            question_select.get_all(),
            answer_select.get_all(),
            questionnaire_meta.get_all(),
        )
        answer_select.mapping_sub_answer(
            question_free_text.get_all(),
            answer_free_text.get_all(),
            questionnaire_meta.get_all(),
        )

        # キーワード履歴データ作成
        keyword_history = KeywordHistoryWrapper(
            self.__test_resource.get("questionnaire")
        )
        keyword_history.create()

        # カテゴリ履歴データ作成
        category_history = CategoryHistoryWrapper({}, category.get_all())
        category_history.create()


if __name__ == "__main__":
    path = Path("./questionnaire/supports/create_test_data/resource/test_data.yaml")
    td = TestData(path)
    td.create()
