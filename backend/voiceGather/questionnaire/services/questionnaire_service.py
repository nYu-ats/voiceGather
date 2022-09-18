from questionnaire.model_proxies.questionnaire_proxy import QuestionnaireProxy
from questionnaire.model_proxies.questionnaire_meta_proxy import QuestionnaireMetaProxy
from questionnaire.model_proxies.question_proxy import TextQuestionProxy, SelectQuestionProxy
from questionnaire.model_proxies.selection_proxy import SelectionProxy
from questionnaire.core.extensions.enums import QuestionType
from questionnaire.core.query_parameter import QuestionnaireListQueryParam
from questionnaire.core.schema import (
    Questionnaire,
    CategorySummary,
    Selection,
    QuestionFreeText,
    QuestionSelect,
    QuestionContainer,
    )


class QuestionnaireService:
    questionnaire_proxy = QuestionnaireProxy()

    def get_list(self, params:'QuestionnaireListQueryParam'):
        questionnaires = self.questionnaire_proxy.find_by(params)
        result = []
        for questionnaire in questionnaires:
            categories = []
            for mapping in questionnaire.categorymapping_set.all():
                cat_dto = CategorySummary(
                    mapping.category.id, mapping.category.name)
                categories.append(cat_dto)

            result.append(
                Questionnaire(
                    id=questionnaire.id,
                    title=questionnaire.title,
                    overview=questionnaire.overview,
                    answer_count=questionnaire.answer_count,
                    scope=questionnaire.scope,
                    start_at=questionnaire.start_at,
                    end_at=questionnaire.end_at,
                    created_at=questionnaire.created_at,
                    categories=categories
                    )
                )

        return result

    def get_detail(self, questionnaire_id: int) -> QuestionContainer:
        questionnaire_proxy = QuestionnaireProxy()

        questionnaire = questionnaire_proxy.get_detail(questionnaire_id)
        result = QuestionContainer(
            id=questionnaire.id,
            title=questionnaire.title,
            start_at=questionnaire.start_at,
            end_at=questionnaire.end_at,
            data=[]
            )

        q_metas = QuestionnaireMetaProxy().find_by(questionnaire_id)
        for q_meta in q_metas:
            if int(q_meta.question_type) == QuestionType.FREE_TEXT.value:
                questions = TextQuestionProxy().find_by(questionnaire_id)
                for question in questions:
                    result.data.append(
                        QuestionFreeText(
                            id=question.id,
                            questionnaire_id=question.questionnaire.id,
                            index=question.index,
                            is_subquestion=question.is_sub_question,
                            question_type=QuestionType.FREE_TEXT,
                            question=question.question,
                            answer_max_length=question.answer_max_length,
                            required=question.required,
                            answer_count=question.answer_count
                        )
                    )
            elif int(q_meta.question_type) == QuestionType.SELECT.value:
                questions = SelectQuestionProxy().get_questions(questionnaire_id)
                _question_ids = [question.id for question in questions]
                selections = SelectionProxy().find_in(_question_ids)

                for question in questions:
                    selection = list(filter(
                        lambda e: e.question_id == question.id, selections
                    )) if selections else None

                    if selection:
                        result.data.append(
                            QuestionSelect(
                                id=question.id,
                                questionnaire_id=question.questionnaire.id,
                                index=question.index,
                                is_subquestion=question.is_sub_question,
                                question_type=QuestionType.SELECT,
                                question=question.question,
                                required=question.required,
                                multi_select=question.multi_select,
                                selection=[
                                    Selection(
                                        number=_selection.number,
                                        content=_selection.content
                                    ) for _selection in selection
                                ]
                            )
                        )

        return result
