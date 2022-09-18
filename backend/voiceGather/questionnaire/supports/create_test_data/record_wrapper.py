import datetime
import random
import uuid
from abc import ABCMeta, abstractmethod

from django.utils import timezone
from questionnaire.core.extensions.enums import QuestionType
from questionnaire.models import *
from questionnaire.supports.util.text_builder import (
    AnswerBuilder,
    Directer,
    OverviewBuilder,
    QuestionBuilder,
    TitleBuilder,
)
from typing_extensions import final


class AbstractRecordWrapper(metaclass=ABCMeta):
    """
    テストデータ作成用モデルラッパークラス
    """

    def __init__(self, target_data):
        self._target_data = target_data
        self._target_records = []
        self._model_cls = None
        self._title_director = Directer(TitleBuilder())
        self._overview_director = Directer(OverviewBuilder())
        self._question_director = Directer(QuestionBuilder())
        self._answer_director = Directer(AnswerBuilder())

    @final
    def create(self):
        self._add_record()
        self._model_cls.objects.bulk_create(self._target_records)

    def get_all(self):
        return list(self._model_cls.objects.all())

    @abstractmethod
    def _add_record(self):
        pass


class AbstractAnswerRecordWrapper(AbstractRecordWrapper):
    """
    回答モデル作成用モデルラッパークラス
    """

    def __init__(self, target_data):
        super().__init__(target_data)

    def mapping_sub_answer(self, other_question, other_answer, questionnare_meta):
        sub_questions = [
            question for question in self.question if question.is_sub_question
        ]
        q_type = 1 if self._model_cls == answers.answer_free_text.AnswerFreeText else 2
        print(q_type)

        for _question in sub_questions:
            target_answers = self._model_cls.objects.filter(question_id=_question.id)
            parent_question_meta = [
                meta
                for meta in questionnare_meta
                if meta.index == _question.index
                and meta.question_type == q_type
                and meta.sub_index == 0
            ][0]

            if parent_question_meta:
                parent_question = [
                    question
                    for question in self.question
                    if question.questionnaire_id
                    == parent_question_meta.questionnaire_id
                    and question.index == parent_question_meta.index
                    and not question.is_sub_question
                ]
                parent_answer = list(
                    self._model_cls.objects.filter(
                        question_id__in=[question.id for question in parent_question]
                    )
                )

                if parent_answer:
                    for target_answer in target_answers:
                        target_answer.parent_answer_uuid = parent_answer[0].answer_uuid
                        target_answer.save()
            else:
                parent_question_meta = [
                    meta
                    for meta in questionnare_meta
                    if meta.index == _question.index
                    and meta.question_type == (3 - q_type)
                    and meta.sub_index == 0
                ][0]
                parent_question = [
                    question
                    for question in other_question
                    if question.questionnaire_id
                    == parent_question_meta.questionnaire_id
                    and question.index == parent_question_meta.index
                    and not question.is_sub_question
                ]

                if parent_question:
                    parent_answer = [
                        answer
                        for answer in other_answer
                        if answer.question_id
                        in [question.id for question in parent_question]
                    ]

                    if parent_answer:
                        for target_answer in target_answers:
                            target_answer.parent_answer_uuid = parent_answer[
                                0
                            ].answer_uuid
                            target_answer.save()


class QuestoinnaireWrapper(AbstractRecordWrapper):
    """
    アンケートモデルラッパークラス
    """

    questionnaire_repeat = 100

    def __init__(self, target_data):
        super().__init__(target_data)
        self._model_cls = questionnaire.Questionnaire

    def _add_record(self):
        for number in range(self.questionnaire_repeat):
            for questionnaire in self._target_data:
                record = {}

                record["title"] = self._title_director.create(
                    questionnaire.get("title") + str(number)
                )
                record["overview"] = self._overview_director.create(
                    questionnaire.get("title") + str(number)
                )
                record["answer_count"] = random.randrange(1000)
                record["start_at"] = timezone.localdate()
                record["end_at"] = timezone.localdate() + datetime.timedelta(
                    days=random.randrange(100)
                )
                record["scope"] = questionnaire.get("scope")
                self._target_records.append(self._model_cls(**record))


class CategoryWrapper(AbstractRecordWrapper):
    """
    カテゴリモデルラッパークラス
    """

    def __init__(self, target_data):
        super().__init__(target_data)
        self._model_cls = category.Category

    def _add_record(self):
        for category in self._target_data:
            record = {}

            record["name"] = category.get("name")
            self._target_records.append(self._model_cls(**record))


class CategoryMappingWrapper(AbstractRecordWrapper):
    """
    カテゴリマッピングモデルラッパークラス
    """

    max_cat_mapping = 10
    cat_map_count = 1000

    def __init__(self, target_data, category, questionnaire):
        super().__init__(target_data)
        self._model_cls = category_mapping.CategoryMapping
        self.__category = category
        self.__questionnaire = questionnaire

    def _add_record(self):
        registered_set = set()

        for _ in range(self.cat_map_count):
            record = {}
            category_count = random.randrange(0, self.max_cat_mapping)
            category_ids = [
                random.randrange(0, len(self.__category)) for _ in range(category_count)
            ]
            questionnaire_id = random.randrange(0, len(self.__questionnaire))

            for category_id in category_ids:
                if not (category_id, questionnaire_id) in registered_set:
                    registered_set.add((category_id, questionnaire_id))
                    record["category"] = self.__category[category_id]
                    record["questionnaire"] = self.__questionnaire[questionnaire_id]
                    self._target_records.append(self._model_cls(**record))


class QuestionnaireMetaWrapper(AbstractRecordWrapper):
    """
    アンケートメタ情報モデルラッパークラス
    """

    max_question_count = 10
    max_sub_index_count = 2

    def __init__(self, target_data, questionnaire):
        super().__init__(target_data)
        self._model_cls = questionnaire_meta.QuestionnaireMeta
        self.__questionnaire = questionnaire

    def _add_record(self):
        for questionnaire in self.__questionnaire:
            record = {}
            question_count = random.randrange(self.max_question_count)

            for index in range(question_count + 1):
                sub_index_count = random.randrange(self.max_sub_index_count)

                for sub_index in range(sub_index_count + 1):
                    record["questionnaire"] = questionnaire
                    record["index"] = index + 1
                    record["question_type"] = random.randint(
                        1, len([value for value in QuestionType])
                    )
                    record["sub_index"] = sub_index

                    self._target_records.append(self._model_cls(**record))

    def get_type_of(self, q_type):
        return list(self._model_cls.objects.filter(question_type=q_type))


class QuestionFreeTextWrapper(AbstractRecordWrapper):
    """
    フリーテキスト設問モデルラッパー
    """

    answer_max_length_choices = [10, 30, 50, 100, 250]

    def __init__(self, target_data, questionnaire_meta):
        super().__init__(target_data)
        self._model_cls = questions.question_free_text.QuestionFreeText
        self.__questionnaire_meta = questionnaire_meta

    def _add_record(self):
        for questionnaire in self.__questionnaire_meta:
            # 回答項目が1つの場合のレコード
            record = {}
            rnd = random.randrange(len(self._target_data))

            record["questionnaire"] = questionnaire.questionnaire
            record["answer_max_length"] = self.answer_max_length_choices[
                random.randrange(len(self.answer_max_length_choices))
            ]
            record["required"] = True if random.randrange(2) == 1 else False
            record["answer_count"] = random.randint(1, 5)
            record["index"] = questionnaire.index
            record["is_sub_question"] = questionnaire.sub_index != 0
            record["question"] = self._question_director.create(
                self._target_data[rnd].get("question") + str(rnd)
            )
            self._target_records.append(self._model_cls(**record))


class AnswerFreeTextWrapper(AbstractAnswerRecordWrapper):
    """
    フリーテキスト回答モデルラッパー
    """

    max_answer_count = 100

    def __init__(self, target_data, question):
        super().__init__(target_data)
        self._model_cls = answers.answer_free_text.AnswerFreeText
        self.question = question

    def _add_record(self):
        for question in self.question:
            count = random.randrange(len(self._target_data))

            for _ in range(count):
                record = {}

                rnd = random.randrange(len(self._target_data))
                record["question"] = question
                record["answer"] = self._answer_director.create(
                    self._target_data[rnd].get("question") + str(rnd)
                )
                record["answer_uuid"] = str(uuid.uuid4())
                self._target_records.append(self._model_cls(**record))


class QuestionSelectWrapper(AbstractRecordWrapper):
    """
    選択式設問モデルラッパー
    """

    def __init__(self, target_data, questionnaire_meta):
        super().__init__(target_data)
        self._model_cls = questions.question_select.QuestionSelect
        self.__questionnaire_meta = questionnaire_meta

    def _add_record(self):
        for questionnaire in self.__questionnaire_meta:
            record = {}
            rnd = random.randrange(len(self._target_data))

            record["questionnaire"] = questionnaire.questionnaire
            record["required"] = True if random.randrange(2) == 1 else False
            record["multi_select"] = True if random.randrange(2) == 1 else False
            record["index"] = questionnaire.index
            record["is_sub_question"] = questionnaire.sub_index != 0
            record["question"] = self._question_director.create(
                self._target_data[rnd].get("question") + str(rnd)
            )
            self._target_records.append(self._model_cls(**record))


class SelectionWrapper(AbstractRecordWrapper):
    """
    選択式設問の選択肢モデルラッパー
    """

    def __init__(self, target_data, question):
        super().__init__(target_data)
        self._model_cls = selections.selection.Selection
        self.__question = question

    def _add_record(self):
        for question in self.__question:
            count = random.randint(1, len(self._target_data))

            for number in range(count):
                record = {}

                rnd = random.randrange(len(self._target_data))
                record["question"] = question
                record["number"] = number + 1
                record["content"] = self._answer_director.create(
                    self._target_data[rnd].get("question") + str(rnd)
                )
                self._target_records.append(self._model_cls(**record))


class AnswerSelectWrapper(AbstractAnswerRecordWrapper):
    """
    選択式設問の回答モデルラッパー
    """

    max_count = 100

    def __init__(self, target_data, question):
        super().__init__(target_data)
        self._model_cls = answers.answer_select.AnswerSelect
        self.question = question

    def _add_record(self):
        for question in self.question:
            selections = question.selection_set.all()

            for selection in selections:
                count = random.randrange(self.max_count)

                for _ in range(count):
                    record = {}

                    record["question"] = question
                    record["selection"] = selection
                    record["answer_uuid"] = str(uuid.uuid4())
                    self._target_records.append(self._model_cls(**record))


class KeywordHistoryWrapper(AbstractRecordWrapper):
    """
    キーワード検索履歴モデルラッパー
    """

    max_history_count = 10000
    keywrod_dup_count = 100

    def __init__(self, target_data):
        super().__init__(target_data)
        self._model_cls = keyword_history.KeywordHistory

    def _add_record(self):
        for keyword in self._target_data:
            count = random.randrange(self.keywrod_dup_count)

            for dup in range(count):
                record = {}

                record["keyword"] = keyword.get("title") + str(dup)
                record["count"] = random.randrange(self.max_history_count)
                self._target_records.append(self._model_cls(**record))


class CategoryHistoryWrapper(AbstractRecordWrapper):
    """
    カテゴリ検索履歴モデルラッパー
    """

    max_history_count = 10000

    def __init__(self, target_data, category):
        super().__init__(target_data)
        self._model_cls = category_history.CategoryHistory
        self.__category = category

    def _add_record(self):
        for category in self.__category:
            record = {}

            record["category"] = category
            record["count"] = random.randrange(self.max_history_count)
            self._target_records.append(self._model_cls(**record))
