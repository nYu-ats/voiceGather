import ApiClient from "../../features/api/ApiClient";
import { SelectQuestion } from "../../features/api/Schema";
import {
    GetQuestionnaireListParameter,
    Questionnaire,
} from "./QuestionnaireService.type";

class QuestionnaireService {
    private static instance: QuestionnaireService;
    apiClient: typeof ApiClient

    constructor() {
        this.apiClient = ApiClient;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new QuestionnaireService();
        }

        return this.instance;
    }

    async getList(params: GetQuestionnaireListParameter): Promise<Array<Questionnaire>> {
        const response = await ApiClient.getQuestionnaire(params);
        const questionnaireList = response.map((item) => {
            let category = item.categories.map((category) => {
                return (category.name);
            });

            return ({
                id: item.id,
                title: item.title,
                overview: item.overview,
                startAt: item.startAt,
                endAt: item.endAt,
                answerCount: item.answerCount,
                createdAt: item.createdAt,
                category: category,
                isDisplay: true,
            });
        });

        return questionnaireList;
    }

    async getCategorizedList(param: GetQuestionnaireListParameter, categories: Array<string>) {
        let data = categories.map(async (category) => {
            const response = await ApiClient.getQuestionnaire({
                ...param,
                category: [category]
            });

            let questionnaireList = response.map((item) => {
                let category = item.categories.map((category) => {
                    return (category.name);
                });

                return ({
                    id: item.id,
                    title: item.title,
                    overview: item.overview,
                    startAt: item.startAt,
                    endAt: item.endAt,
                    answerCount: item.answerCount,
                    createdAt: item.createdAt,
                    category: category,
                    isDisplay: true,
                });
            });

            return {
                category: category,
                data: questionnaireList,
            }
        });

        let result = await Promise.all(data);

        return result;
    }

    async getDetail(id: number) {
        const response = await ApiClient.getQuestionnaireDetail(id);
        const questions = response.data.sort((a, b) => {
            return a.index - b.index
        }).filter(item => !Boolean(item.is_subquestion)).map((item) => {
            // サブ設問は1つしか設定されない。万一複数設定されていた場合は最初に見つかった要素で設定される
            let subQuestion = response.data.find(_item => item.index === _item.index && Boolean(_item.is_subquestion))
            let selections = null;
            let subSelections = null;
            if (item.question_type === 2) {
                item = item as SelectQuestion;
                selections = item.selection;
            }
            if (subQuestion && subQuestion.question_type === 2) {
                subQuestion = subQuestion as SelectQuestion;
                subSelections = subQuestion.selection;
            }

            return {
                id: item.id,
                index: item.index,
                questionType: item.question_type,
                question: item.question,
                subQuestionType: subQuestion ? subQuestion.question_type : null,
                subQuestion: subQuestion ? subQuestion.question : null,
                selections: selections,
                subSelections: subSelections
            }
        });

        const questionnaireDetail = {
            id: response.id,
            title: response.title,
            period: { from: response.start_at, to: response.end_at },
            question: questions
        }

        return questionnaireDetail;
    }
}

export default QuestionnaireService.getInstance();