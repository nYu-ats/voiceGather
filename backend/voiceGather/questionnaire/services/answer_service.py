import json
from abc import ABCMeta, abstractmethod
from tokenize import group

from questionnaire.core.extensions.enums import QuestionType
from questionnaire.core.query_parameter import AnswerListQueryParam
from questionnaire.core.schema import (
    AnswerFreeText,
    AnswerSelect,
    FreeTextData,
    SelectData,
    Selection,
    SelectSummary,
    TextSummary,
)
from questionnaire.model_proxies.answer_proxy import SelectAnswerProxy, TextAnswerProxy
from questionnaire.model_proxies.selection_proxy import SelectionProxy


class AnswerService:
    def get_answers(self, params: "AnswerListQueryParam"):
        strategy = self.__get_strategy(params.question_type)

        if params.sub_question_types:
            for sub_question_type in params.sub_question_types:
                strategy.add_sub_answer_startegy(self.__get_strategy(sub_question_type))

        return strategy.get_answers(params)

    def __get_strategy(self, q_type: str):
        if int(q_type) == QuestionType.FREE_TEXT.value:
            return TextAnswerStrategy()
        elif int(q_type) == QuestionType.SELECT.value:
            return SelectAnswerStrategy()


class AnswerServiceStrategy(metaclass=ABCMeta):
    def __init__(self):
        self.sub_answer_strategies = []

    def add_sub_answer_startegy(self, strategy: "AnswerServiceStrategy"):
        self.sub_answer_strategies.append(strategy)

    @abstractmethod
    def get_answers(self):
        pass

    @abstractmethod
    def get_sub_answers(self):
        # 単一の回答に紐づくサブ回答を取得
        pass

    def group_by_answer_uuid(self, answers):
        # 1つの設問に対して複数回答可能な場合があるため、この関数で同一回答をグルーピングする
        grouped = {}

        for answer in answers:
            if grouped.get((answer.answer_uuid, answer.parent_answer_uuid)):
                grouped[(answer.answer_uuid, answer.parent_answer_uuid)].append(answer)
            else:
                grouped[(answer.answer_uuid, answer.parent_answer_uuid)] = [answer]

        return grouped


class TextAnswerStrategy(AnswerServiceStrategy):
    def get_answers(self, params: "AnswerListQueryParam"):
        data = []
        summary = None
        if params.summarize:
            summary = TextSummary(count=TextAnswerProxy.get_count(params.question_id))
        else:
            grouped_answers = self.group_by_answer_uuid(
                TextAnswerProxy().find_by(params)
            )
            for key, target_answers in grouped_answers.items():
                sub_answers = None
                if self.sub_answer_strategies:
                    for target_answer in target_answers:
                        for sub_answer_startegy in self.sub_answer_strategies:
                            sub_answers = sub_answer_startegy.get_sub_answers(
                                target_answer.answer_uuid
                            )

                data.append(
                    FreeTextData(
                        answer_uuid=key[0],
                        parent_answer_uuid=key[1],
                        created_at=target_answers[0].created_at,
                        answer=[
                            target_answer.answer for target_answer in target_answers
                        ],
                        sub_answer=sub_answers,
                    )
                )

        return AnswerFreeText(
            question_id=params.question_id,
            question_type=params.question_type,
            data=data,
            summary=summary,
        )

    def get_sub_answers(self, answer_uuid: str):
        sub_answers = TextAnswerProxy().fetch_sub_answers(answer_uuid)
        if sub_answers:
            return FreeTextData(
                answer_uuid=sub_answers[0].answer_uuid,
                parent_answer_uuid=sub_answers[0].parent_answer_uuid,
                created_at=sub_answers[0].created_at,
                answer=[sub_answer.answer for sub_answer in sub_answers],
            )

        return


class SelectAnswerStrategy(AnswerServiceStrategy):
    def get_answers(self, params: "AnswerListQueryParam"):
        answers = SelectAnswerProxy().find_by(params)

        data = []
        summary = None
        if params.summarize:
            summary = [
                SelectSummary(number=obj.number, content=obj.content)
                for obj in list(SelectionProxy().find_by(params.question_id))
            ]
            for answer in answers:
                for summary_content in summary:
                    if answer.selection.number == summary_content.number:
                        summary_content.count += 1
                        break
        else:
            grouped_answers = self.group_by_answer_uuid(answers)

            for key, target_answers in grouped_answers.items():
                sub_answers = None
                if self.sub_answer_strategies:
                    for target_answer in target_answers:
                        for sub_answer_startegy in self.sub_answer_strategies:
                            sub_answers = sub_answer_startegy.get_sub_answers(
                                target_answer.answer_uuid
                            )

                data.append(
                    SelectData(
                        answer_uuid=key[0],
                        parent_answer_uuid=key[1],
                        created_at=target_answers[0].created_at,
                        answer=[
                            Selection(
                                number=target_answer.selection.number,
                                content=target_answer.selection.content,
                            )
                            for target_answer in target_answers
                        ],
                        sub_answer=sub_answers,
                    )
                )

        return AnswerSelect(
            question_id=params.question_id,
            question_type=params.question_type,
            data=data,
            summary=summary,
        )

    def get_sub_answers(self, answer_uuid: str):
        sub_answers = SelectAnswerProxy().fetch_sub_answers(answer_uuid)

        if sub_answers:
            return SelectData(
                answer_uuid=sub_answers[0].answer_uuid,
                parent_answer_uuid=sub_answers[0].parent_answer_uuid,
                created_at=sub_answers[0].created_at,
                answer=[
                    Selection(
                        number=sub_answer.selection.number,
                        content=sub_answer.selection.content,
                    )
                    for sub_answer in sub_answers
                ],
            )

        return
