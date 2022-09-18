export type QuestionAggregateProps = {
    id: number;
    index: number;
    answerCount: number;
    questionType: number;
    question: string;
    subQuestionType: number | null;
    subQuestion: string | null;
    selections: Array<Selection> | null;
    subSelections: Array<Selection> | null;
    answer: Array<TextAnswer> | SelectAnswer | null;
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

type SelectAnswerSummary = {
    number: number;
    content: string;
    count: number;
}

type Selection = {
    number: number;
    content: string;
}
