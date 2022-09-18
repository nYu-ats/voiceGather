export type GetCategoryListParameter = {
    order?: string;
    orderBy?: string;
    offset?:number;
    size?: number;
}

export type Category = {
    id: number;
    name: string;
}