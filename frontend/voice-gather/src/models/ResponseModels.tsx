export type QuestionnaireOverViewRes = {
    id: number;
    title: string;
    overview: string;
    answerCount: number;
    startAt: string;
    endAt: string;
    categories: Array<CategoryRes>;
    createdAt: Date;
};

export type CategoryRes = {
    id:number;
    name:string;
    count: number | null;
}

export type KeywordRes = {
    id:number;
    keyword:string;
    count: number | null;
    fastRising: number | null;
}