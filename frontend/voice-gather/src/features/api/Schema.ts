export type Questionnaire = {
    id: number;
    title: string;
    overview: string;
    answerCount: number;
    startAt: string;
    endAt: string;
    categories: Array<Category>;
    createdAt: Date;
};

export type QuestionContainer = {
    id: number;
    title: string;
    start_at: string;
    end_at: string;
    data: Array<TextQuestion | SelectQuestion>;
}

export type TextQuestion = {
    id: number;
    questionnaire_id: string;
    index: number;
    is_subquestion: boolean;
    question_type: number;
    question: string;
    answer_max_length: number;
    required: boolean;
    answer_count: number;
}

export type SelectQuestion = {
    id: number;
    questionnaire_id: string;
    index: number;
    is_subquestion: boolean;
    question_type: number;
    question: string;
    required: boolean;
    multi_select: boolean;
    selection: Array<Selection>;
}

export type Selection = {
    number: number;
    content: string;
}

export type TextAnswer = {
    question_id: string;
    question_type: '1'; // ディスクリミネータ
    data: Array<TextAnswerData> | null;
    summary: TextSummary | null;
}

export type TextAnswerData = {
    answer_uuid: string;
    parent_answer_uuid: string;
    created_at: string;
    answer: Array<string>;
    sub_answer: TextAnswerData | SelectAnswerData | null;
}

export type TextSummary = {
    count: number;
}

export type SelectAnswer = {
    question_id: string;
    question_type: '2'; // ディスクリミネータ
    data: Array<SelectAnswerData> | null;
    summary: Array<SelectSummary> | null;
}

export type SelectAnswerData = {
    answer_uuid: string;
    parent_answer_uuid: string;
    created_at: string;
    answer: Array<number>;
    sub_answer: TextAnswerData | SelectAnswerData | null;
}

export type SelectSummary = {
    number: number;
    content: string;
    count: number;
}

export type Category = {
    id: number;
    name: string;
    count: number | null;
};

export type Keyword = {
    id: number;
    keyword: string;
    count: number | null;
    fastRising: number | null;
};