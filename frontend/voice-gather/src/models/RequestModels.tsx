export type QuestionnaireQueryParam = {
    order?: string;
    orderBy?: string;
    keywords?: string[];
    category?: string[];
    startDate?: string;
    endDate?: string;
    answerable?: boolean;
    upperLimit?: number;
}