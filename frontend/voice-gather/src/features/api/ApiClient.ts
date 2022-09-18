import axios, { AxiosResponse, AxiosError, Axios } from 'axios';
import {
    Questionnaire,
    QuestionContainer,
    TextQuestion,
    SelectQuestion,
    TextAnswer,
    SelectAnswer,
    Category,
    Keyword
} from './Schema';
import {
    GetQuestionnaireDetailIF,
    GetQuestionnaireIF,
    GetCategoryIF,
    GetKeywordIF,
    AnswerIF,
} from './Interface';

class BaseApi {
    APIROOT = 'http://127.0.0.1:8000/api/v1/gather-voice/';
    client: Axios;

    constructor() {
        this.client = axios.create(
            {
                timeout: 5000
            }
        )
    }
}

class ApiClient extends BaseApi {
    private static instance: ApiClient;

    private constructor() {
        super();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ApiClient();
        }

        return this.instance;
    }

    async getQuestionnaire(params: GetQuestionnaireIF) {
        let result: Array<Questionnaire> = [];

        await this.client.get(
            this.APIROOT + 'questionnaire',
            {
                params: {
                    order: params.order,
                    order_at: params.orderBy,
                    start_at: params.startDate,
                    end_at: params.endDate,
                    is_open: params.answerable,
                    size: params.size,
                    category: params.category,
                    keyword: params.keyword,
                }
            }
        ).then((res: AxiosResponse<Array<Questionnaire>>) => {
            result = res.data;
            return result;
        }).catch((error: AxiosError) => {
            console.log(error)
        })

        return result;
    }

    async getQuestionnaireDetail(id: number) {
        return await this.client.get(
            this.APIROOT + 'questionnaire/' + String(id),
        ).then((res: AxiosResponse<QuestionContainer>) => {
            const result: QuestionContainer = res.data;
            return result;
        }).catch((error: AxiosError) => {
            console.log(error)
            throw error;
        })
    }

    async getCategory(params: GetCategoryIF) {
        let result: Array<Category> = [];

        await this.client.get(
            this.APIROOT + 'category',
            {
                params: {
                    order: params.order,
                    order_by: params.orderBy,
                    size: params.size,
                }
            }
        ).then((res: AxiosResponse<Array<Category>>) => {
            result = res.data;
            return result;
        }).catch((error: AxiosError) => {
            console.log(error)
        })

        return result;
    }

    async getKeyword(params: GetKeywordIF) {
        let result: Array<Keyword> = [];

        await this.client.get(
            this.APIROOT + 'keyword',
            {
                params: {
                    order: params.order,
                    order_by: params.orderBy,
                    size: params.size,
                }
            }
        ).then((res: AxiosResponse<Array<Keyword>>) => {
            result = res.data;
            return result;
        }).catch((error: AxiosError) => {
            console.log(error)
        })

        return result;
    }

    async getAnswer(params: AnswerIF) {
        const target = params.questionType === '1' ? 'text_answer' : 'select_answer';
        return await this.client.get(
            this.APIROOT + target,
            {
                params: {
                    question_id: params.questionId,
                    sub_question_types: params.subQuestionType,
                    summarize: params.summarize
                }
            }
        ).then((res: AxiosResponse<TextAnswer | SelectAnswer>) => {
            const result: TextAnswer | SelectAnswer = res.data;
            return result;
        }).catch((error: AxiosError) => {
            console.log(error);
            throw error;
        })
    }
}

export default ApiClient.getInstance();