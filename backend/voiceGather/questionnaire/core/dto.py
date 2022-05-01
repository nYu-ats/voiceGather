from dataclasses import dataclass, asdict
from typing import List
import datetime
from questionnaire.core.extensions.enums import QuestionType


class BaseDto:
    '''
    ベースDTOクラス
    '''
    def as_dict(self):
        return asdict(self)


@dataclass
class CategoryDto(BaseDto):
    '''
    カテゴリDTOクラス
    '''
    id: int
    name: str
    count: int = None


@dataclass
class KeywordDto(BaseDto):
    '''
    キーワードDTOクラス
    '''
    id: int
    keyword: str
    count: int = 0
    fastRising: int = 0


@dataclass
class QuestionnaireDto(BaseDto):
    '''
    アンケートDTOクラス
    '''
    id: int
    title: str
    overview: str
    answerCount: int
    scope: int
    startAt: datetime.date
    endAt: datetime.date
    createdAt: datetime.datetime
    categories: List[CategoryDto]


@dataclass
class QuestionnaireMetaDto(BaseDto):
    '''
    アンケートメタデータDTOクラス
    '''
    id: int
    questionnaireId: int
    index: int
    questionType: QuestionType


@dataclass
class BaseQuestionDto(BaseDto):
    '''
    設問のベースDTOクラス
    '''
    id: int
    questionnaireId: int
    index: int
    questionType: QuestionType


@dataclass
class QuestionFreeTextDto(BaseQuestionDto):
    '''
    フリーテキスト設問のDTOクラス
    '''
    question: str


@dataclass
class BassAnswerDto(BaseDto):
    '''
    回答のベースDTOクラス
    '''
    questionId: int
    questionType: QuestionType


@dataclass
class FreeTextContentDto(BaseDto):
    '''
    フリーテキストの回答内容のDTOクラス
    '''
    id: int
    answer: str
    createdAt: str


@dataclass
class AnswerFreeTextDto(BassAnswerDto):
    '''
    フリーテキストDTOクラス
    '''
    content: List[FreeTextContentDto]

