export type CategorizedQuestionnaireContainerProps = {
    data: Array<CategorizedQuestionnaire>;
}

export type CategorizedQuestionnaire = {
    category: string;
    cateogryPageUrl: string;
    data: Array<QuestionnaireOverview>;
}

type QuestionnaireOverview = {
    title: string;
    overview: string;
    startAt: string;
    endAt: string;
    createdAt: Date;
    questionnairePageUrl: string;
}
