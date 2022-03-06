from django.utils import timezone
from typing_extensions import final
import yaml
import random
import datetime
from questionnaire.models import *
from .records import Records
from .util.text_builder import Directer, TitleBuilder, OverviewBuilder

'''
ローカルテストデータを作成するクラス
'''

class TestData:

    questionnaire_records = Records(questionnaire.Questionnaire)
    category_records = Records(category.Category)
    category_mapping_records = Records(category_mapping.CategoryMapping)

    title_builder = TitleBuilder()
    overview_builder = OverviewBuilder()

    max_cat_mapping = 10
    questionnaire_repeat = 100
    cat_map_count = 1000

    def __init__(self, path):
        with path.open('r', encoding='utf-8') as yml:
            self.__test_resource = yaml.safe_load(yml)
        self.questionnaire_count = 0
        self.category_count = 0

        
    @final
    def create(self):
        self.questionnaire_count = self.create_questionnaire()
        self.category_count = self.create_category()
        self.create_category_mapping()

    def create_questionnaire(self):
        questionnaires = self.__test_resource.get('questionnaire')

        for number in range(self.questionnaire_repeat):
            for questionnaire in questionnaires:
                record = {}
                title_directer = Directer(self.title_builder, questionnaire.get('title') + str(number))
                overview_directer = Directer(self.overview_builder, questionnaire.get('title') + str(number))

                record['title'] = title_directer.create()
                record['overview'] = overview_directer.create()
                record['answer_count'] = random.randrange(1000)
                record['start_at'] = timezone.localdate()
                record['end_at'] = timezone.localdate() + datetime.timedelta(days=random.randrange(100))
                record['scope'] = questionnaire.get('scope')
                self.questionnaire_records.add(record)
        
        if self.questionnaire_records.bulk_create():
            return self.questionnaire_records.get_count()
        else:
            raise Exception

    def create_category(self):
        categories = self.__test_resource.get('category')
        for category in categories:
            record = {}
            record['name'] = category.get('name')
            self.category_records.add(record)
        
        if self.category_records.bulk_create():
            return self.category_records.get_count()
        else:
            raise Exception

    def create_category_mapping(self):
        categories = self.category_records.get_all()
        questionnaires = self.questionnaire_records.get_all()
        duplicate_chk = set()

        for _ in range(self.cat_map_count):
            record = {}
            category_count = random.randrange(0, self.max_cat_mapping)
            category_ids = [random.randrange(0, self.category_count) for _ in range(category_count)]
            questionnaire_id = random.randrange(0, self.questionnaire_count)

            for category_id in category_ids:
                if not (category_id, questionnaire_id) in duplicate_chk:
                    duplicate_chk.add((category_id, questionnaire_id))        
                    record['category'] = categories[category_id]
                    record['questionnaire'] = questionnaires[questionnaire_id]
                    self.category_mapping_records.add(record)
        
        self.category_mapping_records.bulk_create()