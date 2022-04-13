from abc import ABCMeta, abstractmethod
import random

'''
questionnaireに挿入するタイトルと概要データを生成する
'''


class Directer:

    def __init__(self, builder):
        self.builder = builder

    def create(self, keyword):
        self.builder.set_keyword(keyword)
        self.builder.make_text()
        
        return self.builder.get_text()


class BaseTextBuilder(metaclass=ABCMeta):
    
    def __init__(self):
        self._keyword = ''
        self._result = ''
    
    def get_text(self):
        return self._result

    def set_keyword(self, keyword):
        self._keyword = keyword

    @abstractmethod
    def make_text(self):
        pass


class RandomDecorateTextBuilder(BaseTextBuilder):

    def __init__(self):
        super().__init__()
    
    def random_string(self, str_list):
        index = random.randrange(len(str_list))

        return str_list[index]


class TitleBuilder(RandomDecorateTextBuilder):

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

    def __init__(self):
        super().__init__()
    
    def make_text(self):
        self._result = self.random_string(self.pre_text_list) + \
        self._keyword + self.random_string(self.post_text_list)

    

class OverviewBuilder(RandomDecorateTextBuilder):

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

    def __init__(self):
        super().__init__()

    def make_text(self):
        self._result = self.random_string(self.pre_text_list) + \
                self._keyword + self.random_string(self.post_text_list)


class QuestionBuilder(RandomDecorateTextBuilder):

    post_text_list = [
        'について意見をおきせください。',
        'に関して感想をお書きください。\nよろしくお願いします。',
        'ってどうでしょうか？',
        'の好きなところを書いてください',
    ]

    def __init__(self):
        super().__init__()

    def make_text(self):
        self._result = self._keyword + self.random_string(self.post_text_list)


class AnswerBuilder(RandomDecorateTextBuilder):

    pre_text_list = [
        '私は',
        '個人的には',
        '一般的に',
        'はっきり言って',
        '',
    ]
    post_text_list = [
        '好きです。',
        'いいんじゃないでしょうか。',
        '嫌いです。',
        'はどちらでもいいです。',
    ]

    def __init__(self):
        super().__init__()

    def make_text(self):
        self._result = self.random_string(self.pre_text_list) + \
                self._keyword + self.random_string(self.post_text_list)