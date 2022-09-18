export type CategorizedQuestionnaire = {
    category: string;
    cateogryPageUrl: string;
    data: Array<QuestionnaireOverview>;
}

export type QuestionnaireOverview = {
    title: string;
    overview: string;
    startAt: string;
    endAt: string;
    createdAt: Date;
    answerCount: number;
    category: Array<string>;
    isDisplay: boolean;
    questionnairePageUrl: string;
}

export type TrendKeyword = {
    title: string;
    data: Array<Keyword>;
}

type Keyword = {
    keyword: string;
    keywordPageUrl: string;
}