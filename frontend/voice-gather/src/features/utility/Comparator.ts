import { QuestionnaireOverview } from "../../components/molecules/questionnaire/BicolorListQuestionnaireItem"

export const QuestionnaireDateComparator = (first:QuestionnaireOverview, second:QuestionnaireOverview) => {
    if (first.createdAt > second.createdAt){
        return 1;
    }
    else{
        return -1;
    }
}

export const QuestionnaireAnswerCountComparator = (first:QuestionnaireOverview, second:QuestionnaireOverview) => {
    if (first.answerCount > second.answerCount){
        return 1;
    }
    else{
        return -1;
    }
}