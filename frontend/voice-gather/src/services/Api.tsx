import axis from 'axios';
import { QuestionnaireQuery } from '../models/ParameterModels';

export const GetData = (url:string, params:QuestionnaireQuery) => {
    axis.get(url,
        {params: params}).then((res) => {
            console.log(res);
        return res;
    });
};