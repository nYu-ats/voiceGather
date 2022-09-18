import ApiClient from "../../features/api/ApiClient";
import {
    GetAnserListParameter,
    TextAnswer,
    SelectAnswer
} from "./AnswerService.type";
import {
    TextAnswerData,
    SelectSummary
} from '../../features/api/Schema'

class AnswerService {
    private static instance: AnswerService;
    apiClient: typeof ApiClient

    constructor() {
        this.apiClient = ApiClient;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AnswerService();
        }

        return this.instance;
    }

    async getList(params: GetAnserListParameter): Promise<Array<TextAnswer> | SelectAnswer> {
        let answer = {} as Array<TextAnswer> | SelectAnswer
        if (String(params.questionType) === '1') {
            const response = await ApiClient.getAnswer({
                questionId: params.questionId,
                questionType: String(params.questionType),
                ...params.subQuestionType ? { subQuestionType: '[' + String(params.subQuestionType) + ']' } : {}
            });
            const data = response.data as Array<TextAnswerData>;
            answer = data.map((item) => {
                return {
                    createdAt: item.created_at,
                    answer: item.answer,
                    subAnswer: item.sub_answer ? item.sub_answer.answer : null
                }
            })
            // テスト用
            answer = [
                {
                    createdAt: '2022-09-09',
                    answer: ['test', 'test2', 'ttttttttttttest3'],
                    subAnswer: ['test', 'test2', 'ttttttttttttest3']
                }
            ]
        } else if (String(params.questionType) === '2') {
            const mainAnswer = await ApiClient.getAnswer({
                questionId: params.questionId,
                questionType: String(params.questionType),
                summarize: true
            });

            answer = {
                answer: mainAnswer.summary as Array<SelectSummary>,
                subAnswer: null
            }

            if (params.subQuestionType && String(params.subQuestionType) === '1') {
                const subAnswer = await ApiClient.getAnswer({
                    questionId: params.subQuestionId as number,
                    questionType: String(params.subQuestionType)
                });
                const subAnswerData = subAnswer.data as Array<TextAnswerData>;
                answer.subAnswer = subAnswerData.map((item) => {
                    return {
                        createdAt: item.created_at,
                        answer: item.answer,
                        subAnswer: null
                    }
                })
            } else if (params.subQuestionType && String(params.subQuestionType) === '2') {
                const subAnswer = await ApiClient.getAnswer({
                    questionId: params.subQuestionId as number,
                    questionType: String(params.subQuestionType),
                    summarize: true
                });
                answer.subAnswer = subAnswer.summary as Array<SelectSummary>;
            }

            // テスト用
            answer = {
                answer: [
                    {
                        number: 1,
                        content: 'test',
                        count: 100
                    }
                ],
                subAnswer: null
            }
        }

        return answer;
    }
}

export default AnswerService.getInstance();