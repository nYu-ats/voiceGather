import axios, { AxiosResponse, AxiosError, Axios } from 'axios';
import { QuestionnaireOverViewRes, CategoryRes, KeywordRes } from '../../models/ResponseModels';

export interface QuestionnaireOverviewIF{
    order?: string;
    orderBy?: string;
    keywords?: string[];
    category?: string[];
    startDate?: string;
    endDate?: string;
    answerable?: boolean;
    size?: number;
}

export interface CategoryIF{
    order?: string;
    orderBy?: string;
    size?: number;
}

export interface KeywordIF{
    order?: string;
    orderBy?: string;
    size?: number;
    isFastRising? :boolean;
}

class BaseApi{
    APIROOT = 'http://127.0.0.1:8000/api/v1/gather-voice/';
    client: Axios;

    constructor(){
        this.client = axios.create(
            {
                timeout:5000
            }
        )
    }
}

class ApiClient extends BaseApi{
    private static instance: ApiClient;

    private constructor(){
        super();
    } 

    public static getInstance(){
        if(!this.instance){
            this.instance = new ApiClient();
        }

        return this.instance;
    }

    async getQuestionnaireOverview(params: QuestionnaireOverviewIF){
        let result: Array<QuestionnaireOverViewRes> = [];

        await this.client.get(
            this.APIROOT + 'questionnaire',
            {params: {
                order: params.order,
                orderBy: params.orderBy,
                startDate: params.startDate,
                endDate: params.endDate,
                answerable: params.answerable,
                size: params.size,
                category: params.category,
                keyword: params.keywords,
            }}
        ).then((res:AxiosResponse<Array<QuestionnaireOverViewRes>>) => {
            result = res.data;
            return result;
        }).catch((error: AxiosError) => {
            console.log(error)
        })

        return result;
    }

    async getCategory(params: CategoryIF){
        let result: Array<CategoryRes> = [];

        await this.client.get(
            this.APIROOT + 'category',
            {params: {
                order: params.order,
                orderBy: params.orderBy,
                size: params.size,
            }}
        ).then((res:AxiosResponse<Array<CategoryRes>>) => {
            result = res.data;
            return result;
        }).catch((error: AxiosError) => {
            console.log(error)
        })

        return result;
    }

    async getKeyword(params: KeywordIF){
        let result: Array<KeywordRes> = [];

        await this.client.get(
            this.APIROOT + 'keyword',
            {params: {
                order: params.order,
                orderBy: params.orderBy,
                size: params.size,
            }}
        ).then((res:AxiosResponse<Array<KeywordRes>>) => {
            result = res.data;
            return result;
        }).catch((error: AxiosError) => {
            console.log(error)
        })

        return result;
    }
}

export default ApiClient.getInstance();