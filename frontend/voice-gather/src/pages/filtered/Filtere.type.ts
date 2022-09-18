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
