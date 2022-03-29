export type QuestionnaireQuery = {
    order?: string;
    orderBy?: string;
    keywords?: string[];
    startDate?: Date;
    endDate?: Date;
    answer?: boolean;
}