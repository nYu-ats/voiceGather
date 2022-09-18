export type GetAnserListParameter = {
    questionType: number;
    questionId: number;
    subQuestionType?: number | null;
    subQuestionId?: number | null;
}

export type TextAnswer = {
    createdAt: string;
    answer: Array<string>;
    subAnswer: Array<string | number> | null;
}

export type SelectAnswer = {
    answer: Array<SelectAnswerSummary>;
    subAnswer: Array<TextAnswer | SelectAnswerSummary> | null;
}

export type SelectAnswerSummary = {
    number: number;
    content: string;
    count: number;
}