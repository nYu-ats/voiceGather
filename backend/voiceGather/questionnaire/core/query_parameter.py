import json
from dataclasses import asdict, dataclass, field
from distutils.util import strtobool
from typing import Dict, List

from django.http.request import QueryDict


class BaseQueryParameter:
    """
    クエリパラメータ
    """

    def as_dict(self):
        return asdict()


@dataclass(init=False)
class QuestionnaireListQueryParam(BaseQueryParameter):
    """
    アンケート一覧取得パラメータ
    """

    start_date: str
    end_date: str
    is_open: bool
    order_by: str
    order: str
    keyword: List[str]
    category: List[str]
    offset: int
    size: int

    def __init__(self, params: QueryDict):
        self.start_date = params.get("start_date")
        self.end_date = params.get("end_date")
        self.is_open = (
            strtobool(params.get("is_open")) if params.get("is_open") else True
        )
        self.order_by = params.get("order_by")
        self.order = params.get("order")
        self.keyword = params.getlist("keyword[]")
        self.category = params.getlist("category[]")
        self.offset = int(params.get("offset")) if params.get("offset") else None
        self.size = int(params.get("size")) if params.get("size") else None


@dataclass(init=False)
class KeywordListQueryParam(BaseQueryParameter):
    """
    キーワード一覧取得パラメータ
    """

    order_by: str
    order: str
    offset: int
    size: int

    def __init__(self, params: QueryDict):
        self.order_by = params.get("order_by")
        self.order = params.get("order")
        self.offset = int(params.get("offset")) if params.get("offset") else None
        self.size = int(params.get("size")) if params.get("size") else None


@dataclass(init=False)
class CategoryListQueryParam(BaseQueryParameter):
    """
    カテゴリ一覧取得パラメータ
    """

    order_by: str
    order: str
    offset: int
    size: int

    def __init__(self, params: QueryDict):
        self.order_by = params.get("order_by")
        self.order = params.get("order")
        self.offset = int(params.get("offset")) if params.get("offset") else None
        self.size = int(params.get("size")) if params.get("size") else None


@dataclass(init=False)
class AnswerListQueryParam(BaseQueryParameter):
    """
    回答一覧取得パラメータ
    """

    question_id: str
    question_type: str
    sub_question_types: List[int]
    summarize: bool
    order_by: str
    order: str
    offset: int
    size: int

    def __init__(self, params: QueryDict):
        self.question_id = params.get("question_id")
        self.question_type = None
        self.sub_question_types = (
            [
                int(question_type)
                for question_type in json.loads(params.get("sub_question_types"))
            ]
            if params.get("sub_question_types")
            else None
        )
        self.summarize = (
            strtobool(params.get("summarize").lower())
            if params.get("summarize")
            else False
        )
        self.order_by = params.get("order_by")
        self.order = params.get("order")
        self.offset = int(params.get("offset")) if params.get("offset") else None
        self.size = int(params.get("size")) if params.get("size") else None
