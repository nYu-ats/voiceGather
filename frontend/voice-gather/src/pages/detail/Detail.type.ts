export type QuestionnaireState = {
    id: number;
    title: string;
    period: Period;
    question: Array<Question>;
}

export type AnswerState = {
    index: number;
    answer: Array<TextAnswer> | SelectAnswer;
}

export type Question = {
    id: number;
    index: number;
    questionType: number;
    question: string;
    subQuestionType: number | null;
    subQuestion: string | null;
    selections: Array<Selection> | null;
    subSelections: Array<Selection> | null;
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

type Selection = {
    number: number;
    content: string;
}

type Period = {
    from: string;
    to: string;
}
