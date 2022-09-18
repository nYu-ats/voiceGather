export type GetQuestionnaireListParameter = {
    order?: string;
    orderBy?: string;
    keyword?: string[] | null;
    category?: string[] | null;
    startAt?: string | null;
    endAt?: string | null;
    answerable?: boolean;
    offset?:number;
    size?: number;
}

export type Questionnaire = {
    id: number;
    title: string;
    overview: string;
    answerCount: number;
    startAt: string;
    endAt: string;
    category: Array<string>;
    createdAt: Date;
    isDisplay: boolean;
};
