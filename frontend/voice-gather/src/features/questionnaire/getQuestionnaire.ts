import { QuestionnaireOverview } from "../../components/items/questionnaire/BicolorListQuestionnaireItem";
import { QuestionnaireOverViewRes } from "../../models/ResponseModels";
import ApiClient, { QuestionnaireOverviewIF } from "../api/ApiClient";

export const getQuestionnaire = async (param: QuestionnaireOverviewIF) => {
    let response:Array<QuestionnaireOverViewRes> = await ApiClient.getQuestionnaireOverview(param);
    
    let questionnaires: Array<QuestionnaireOverview> = response.map((data) => {
        let category = data.categories.map((category) =>{
        return (category.name);
    });

    return ({
        title: data.title,
        overview: data.overview,
        startDate: data.startAt,
        endDate: data.endAt,
        answerCount: data.answerCount,
        createdAt: data.createdAt,
        category: category,
        isDisplay: true,
    })
});

    return questionnaires;
}

export const getCategorizedQuestionnaire = async (param: QuestionnaireOverviewIF, categories:Array<string>) => {
    let data = categories.map(async (category)=>{
        let response: Array<QuestionnaireOverViewRes> = await ApiClient.getQuestionnaireOverview({
        ...param,
        category:[category]
    });

    let questionnaires: Array<QuestionnaireOverview> = response.map((data) => {
        let category = data.categories.map((category) =>{
            return (category.name);
        });

        return ({
            title: data.title,
            overview: data.overview,
            startDate: data.startAt,
            endDate: data.endAt,
            answerCount: data.answerCount,
            createdAt: data.createdAt,
            category: category,
            isDisplay: true,
        });
    });

    return {
        category: category,
        data: questionnaires,
    }
});
    let result = await Promise.all(data);

    return result;
};
