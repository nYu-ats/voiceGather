export type QuestionnaireList = {
    questionnaireList: Questionnaire[];
};

export type Questionnaire = {
    id: number;
    title: string;
    overview: string;
    answeredCount: number;
    start_at: Date;
    end_at: Date;
    category: string[];
    created_at: Date;
};