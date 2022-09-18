import datetime
from dataclasses import asdict, dataclass, field
from typing import Any, List, Union

from questionnaire.core.extensions.enums import QuestionType


class BaseSchema:
    """
    ベーススキーマ
    """

    def as_dict(self):
        return asdict(self)


@dataclass
class CategorySummary(BaseSchema):
    """
    カテゴリスキーマ
    """

    id: int
    name: str
    count: int = None


@dataclass
class KeywordSummary(BaseSchema):
    """
    キーワードスキーマ
    """

    id: int
    keyword: str
    count: int = 0
    fast_rising: int = 0


@dataclass
class Questionnaire(BaseSchema):
    """
    アンケートスキーマ
    """

    id: int
    title: str
    overview: str
    answer_count: int
    scope: int
    start_at: datetime.date
    end_at: datetime.date
    created_at: datetime.datetime
    categories: List[CategorySummary]


@dataclass
class QuestionnaireMeta(BaseSchema):
    """
    アンケートメタデータスキーマ
    """

    id: int
    questionnaire_id: int
    index: int
    sub_index: int
    question_type: QuestionType


@dataclass
class Selection(BaseSchema):
    """
    選択肢スキーマ
    """

    number: int
    content: str


@dataclass
class BaseQuestion(BaseSchema):
    """
    設問のベーススキーマ
    """

    id: int
    questionnaire_id: int
    index: int
    is_subquestion: bool
    question_type: QuestionType


@dataclass
class QuestionFreeText(BaseQuestion):
    """
    フリーテキスト設問スキーマ
    """

    question: str
    answer_max_length: int
    required: bool
    answer_count: int


@dataclass
class QuestionSelect(BaseQuestion):
    """
    選択式設問スキーマ
    """

    question: str
    required: bool
    multi_select: bool
    selection: List[Selection]


@dataclass
class QuestionContainer(BaseSchema):
    """
    設問のコンテナ
    """

    id: int
    title: str
    start_at: datetime.date
    end_at: datetime.date
    data: List[BaseQuestion] = field(default_factory=list)


@dataclass
class BaseAnswerData(BaseSchema):
    """
    回答内容のベーススキーマ
    """

    answer_uuid: str
    parent_answer_uuid: str
    created_at: str


@dataclass
class FreeTextData(BaseAnswerData):
    """
    フリーテキストの回答内容スキーマ
    """

    answer: List[str]
    sub_answer: Union["FreeTextData", "SelectData"] = None


@dataclass
class SelectData(BaseAnswerData):
    """
    選択式回答内容スキーマ
    """

    answer: List[Selection]
    sub_answer: Union["FreeTextData", "SelectData"] = None


@dataclass
class TextSummary(BaseSchema):
    """
    フリーテキストの回答内容サマリスキーマ
    """

    count: int = 0


@dataclass
class SelectSummary(BaseSchema):
    """
    選択式の回答内容サマリスキーマ
    """

    number: int
    content: str
    count: int = 0


@dataclass
class BaseAnswer(BaseSchema):
    """
    回答のベーススキーマ
    """

    question_id: int
    question_type: QuestionType


@dataclass
class AnswerFreeText(BaseAnswer):
    """
    フリーテキスト回答スキーマ
    """

    data: List[FreeTextData]
    summary: TextSummary


@dataclass
class AnswerSelect(BaseAnswer):
    """
    選択式回答スキーマ
    """

    data: List[SelectData]
    summary: List[SelectSummary]
