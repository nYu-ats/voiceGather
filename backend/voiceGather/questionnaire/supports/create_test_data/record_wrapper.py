from abc import ABCMeta, abstractmethod
from questionnaire.models import *
from questionnaire.core.extensions.enums import QuestionType
from questionnaire.supports.util.text_builder import (
    Directer, 
    TitleBuilder, 
    OverviewBuilder, 
    QuestionBuilder, 
    AnswerBuilder)
import random
from django.utils import timezone
import datetime
from typing_extensions import final


class AbstractRecordWrapper(metaclass=ABCMeta):
    '''
    テストデータ作成用モデルラッパークラス
    '''

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


class QuestoinnaireWrapper(AbstractRecordWrapper):
    '''
    アンケートモデルラッパークラス
    '''
    questionnaire_repeat = 100

    def __init__(self, target_data):
        super().__init__(target_data)
        self._model_cls = questionnaire.Questionnaire

    def _add_record(self):
        for number in range(self.questionnaire_repeat):
            for questionnaire in self._target_data:
                record = {}
                
                record['title'] = self._title_director.create(questionnaire.get('title') + str(number))
                record['overview'] = self._overview_director.create(questionnaire.get('title') + str(number))
                record['answer_count'] = random.randrange(1000)
                record['start_at'] = timezone.localdate()
                record['end_at'] = timezone.localdate() + datetime.timedelta(days=random.randrange(100))
                record['scope'] = questionnaire.get('scope')
                self._target_records.append(self._model_cls(**record))


class CategoryWrapper(AbstractRecordWrapper):
    '''
    カテゴリモデルラッパークラス
    '''

    def __init__(self, target_data):
        super().__init__(target_data)
        self._model_cls = category.Category

    def _add_record(self):
        for category in self._target_data:
            record = {}
            
            record['name'] = category.get('name')
            self._target_records.append(self._model_cls(**record))


class CategoryMappingWrapper(AbstractRecordWrapper):
    '''
    カテゴリマッピングモデルラッパークラス
    '''
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
            category_ids = [random.randrange(0, len(self.__category)) for _ in range(category_count)]
            questionnaire_id = random.randrange(0, len(self.__questionnaire))

            for category_id in category_ids:
                if not (category_id, questionnaire_id) in registered_set:
                    registered_set.add((category_id, questionnaire_id))        
                    record['category'] = self.__category[category_id]
                    record['questionnaire'] = self.__questionnaire[questionnaire_id]
                    self._target_records.append(self._model_cls(**record))


class QuestionnaireMetaWrapper(AbstractRecordWrapper):
    '''
    アンケートメタ情報モデルラッパークラス
    '''
    max_question_count = 10


    def __init__(self, target_data, questionnaire):
        super().__init__(target_data)
        self._model_cls = questionnaire_meta.QuestionnaireMeta
        self.__questionnaire = questionnaire

    def _add_record(self):
        for questionnaire in self.__questionnaire:
            record = {}
            question_type = random.randint(1, len([value for value in QuestionType]))
            question_count = random.randrange(self.max_question_count)

            for index in range(question_count):
                record['questionnaire'] = questionnaire
                record['index'] = index + 1
                record['question_type'] = QuestionType(question_type)
                self._target_records.append(self._model_cls(**record))


class QuestionFreeTextWrapper(AbstractRecordWrapper):
    '''
    フリーテキスト設問モデルラッパー
    '''

    def __init__(self, target_data, questionnaire_meta):
        super().__init__(target_data)
        self._model_cls = questions.question_free_text.QuestionFreeText
        self.__questionnaire_meta = questionnaire_meta

    def _add_record(self):
        for questionnaire in self.__questionnaire_meta:
            record = {}
            rnd = random.randrange(len(self._target_data))

            record['questionnaire'] = questionnaire.questionnaire
            record['index'] = questionnaire.index
            record['question'] = self._question_director.create(
                self._target_data[rnd].get('question') + str(rnd))
            self._target_records.append(self._model_cls(**record))


class AnswerFreeTextWrapper(AbstractRecordWrapper):
    '''
    フリーテキスト回答モデルラッパー
    '''
    max_answer_count = 100

    def __init__(self, target_data, question):
        super().__init__(target_data)
        self._model_cls = answers.answer_free_text.AnswerFreeText
        self.__question = question

    def _add_record(self):
        for question in self.__question:
            count = random.randrange(len(self._target_data))

            for _ in range(count):
                record = {}

                rnd = random.randrange(len(self._target_data))            
                record['question'] = question
                record['answer'] = self._answer_director.create(
                    self._target_data[rnd].get('question') + str(rnd))
                self._target_records.append(self._model_cls(**record))


class KeywordHistoryWrapper(AbstractRecordWrapper):
    '''
    キーワード検索履歴モデルラッパー
    '''
    max_history_count = 10000
    keywrod_dup_count = 100

    def __init__(self, target_data):
        super().__init__(target_data)
        self._model_cls = keyword_history.KeywordHisotry

    def _add_record(self):
        for keyword in self._target_data:
            count = random.randrange(self.keywrod_dup_count)

            for dup in range(count):
                record = {}

                record['keyword'] = keyword.get('title') + str(dup)
                record['count'] = random.randrange(self.max_history_count)
                self._target_records.append(self._model_cls(**record))


class CategoryHistoryWrapper(AbstractRecordWrapper):
    '''
    カテゴリ検索履歴モデルラッパー
    '''
    max_history_count = 10000

    def __init__(self, target_data, category):
        super().__init__(target_data)
        self._model_cls = category_history.CategoryHisotry
        self.__category = category

    def _add_record(self):
        for category in self.__category:
            record = {}

            record['category'] = category
            record['count'] = random.randrange(self.max_history_count)
            self._target_records.append(self._model_cls(**record))
