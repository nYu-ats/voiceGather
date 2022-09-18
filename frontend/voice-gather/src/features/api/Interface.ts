export interface GetQuestionnaireIF {
    order?: string;
    orderBy?: string;
    keyword?: string[] | null;
    category?: string[] | null;
    startDate?: string | null;
    endDate?: string | null;
    answerable?: boolean;
    size?: number;
}

export interface GetQuestionnaireDetailIF {
    id: number;
}

export interface GetCategoryIF {
    order?: string;
    orderBy?: string;
    offset?: number;
    size?: number;
}

export interface GetKeywordIF {
    order?: string;
    orderBy?: string;
    size?: number;
    isFastRising?: boolean;
}

export interface AnswerIF {
    questionType?: string;
    questionId: number;
    subQuestionType?: string;
    summarize?: boolean;
    offset?: number;
    size?: number;
}