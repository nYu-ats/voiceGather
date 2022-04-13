export type QuestionnaireOverViewRes = {
    id: number;
    title: string;
    overview: string;
    answeredCount: number;
    start_at: string;
    end_at: string;
    categorymapping_set: Array<CategoryMapping>;
    created_at: Date;
};

export type CategoryMapping ={
    category:Category;
}

export type Category = {
    id:number;
    name:string;
}