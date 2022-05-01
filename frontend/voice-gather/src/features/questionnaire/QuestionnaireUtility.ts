import { QuestionnaireOverview } from "../../components/items/questionnaire/BicolorListQuestionnaireItem"

export const dateComparator = (first:QuestionnaireOverview, second:QuestionnaireOverview) => {
    if (first.createdAt > second.createdAt){
        return 1;
    }
    else{
        return -1;
    }
}

export const answerCountComparator = (first:QuestionnaireOverview, second:QuestionnaireOverview) => {
    if (first.answerCount > second.answerCount){
        return 1;
    }
    else{
        return -1;
    }
}