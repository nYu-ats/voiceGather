from abc import ABCMeta, abstractmethod
import random

'''
questionnaireに挿入するタイトルと概要データを生成する
'''

class Directer:
    builder = None
    keyword = ''

    def __init__(self, builder, keyword):
        self.builder = builder
        self.builder.set_keyword(keyword)

    def create(self):
        self.builder.make_text()
        
        return self.builder.get_text()

class BaseTextBuilder:
    
    def __init__(self):
        _keyword = ''
        _result = ''
    
    def make_text(self):
        index = random.randrange(len(self.pre_text_list))
        pre_text = self.pre_text_list[index]

        index = random.randrange(len(self.post_text_list))
        post_text = self.post_text_list[index]

        self._result = pre_text + self._keyword + post_text

    def get_text(self):
        return self._result

    def set_keyword(self, keyword):
        self._keyword = keyword


class TitleBuilder(BaseTextBuilder):

    pre_text_list = [
        '',
        'これは',
        'どうも、',
        'よろしくお願いします。',
        ]
    post_text_list = [
        'についてのアンケート',
        'に関するアンケートです。',
        'に関する調査です',
        'について回答をお願いしています。',
        'の声を集めています。',
    ]

class OverviewBuilder(BaseTextBuilder):

    pre_text_list = [
        '会社都合により',
        'とある理由から、',
        'どうもです。',
        'ご覧いただきありがとうございます。',
        '',
    ]
    post_text_list = [
        'について調査をしています。ご協力をお願いします。',
        'に関して聞いてみたいと思いまして。\nよろしくお願いします。',
        'ってどうですか？ちなみに私は結構好きです。',
        'は個人的に良いと思うんですけど、皆さんどうですか？',
    ]
