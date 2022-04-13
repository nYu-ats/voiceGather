import axios, { AxiosResponse, AxiosError } from 'axios';
import { QuestionnaireQueryParam } from '../models/RequestModels';
import urls from '../constants/Urls';
import { formatDate } from '../utils/DateUtil';
import { QuestionnaireOverViewRes } from '../models/ResponseModels';
import { QuestionnaireOverview } from '../components/items/questionnaire/BicolorListQuestionnaireItem';

export const GetQuestionnare = async (qyeryParams:QuestionnaireQueryParam):Promise<Array<QuestionnaireOverview>> => {

    let result:Array<QuestionnaireOverview> = []

    let today = new Date();
    today.setDate(today.getDate() - 7);

    const params : QuestionnaireQueryParam= {
        order: qyeryParams.order,
        orderBy: qyeryParams.orderBy,
        startDate: qyeryParams.startDate,
        answerable: qyeryParams.answerable,
        upperLimit: qyeryParams.upperLimit,
    }

    await axios.get(
        urls.Questionnaire,
        {params: params}
        ).then((res:AxiosResponse<Array<QuestionnaireOverViewRes>>) => {
            let response = res.data
            result = response.map((item)=>{
                let category = item.categorymapping_set.map((map) =>{
                    return (map.category.name);
                });

                return ({
                    title: item.title,
                    overview: item.overview,
                    startDate: item.start_at,
                    endDate: item.end_at,
                    category:category
                });
            });
            return result;
    }).catch((error: AxiosError) => {
        console.log(error)
    });

    return result;
};