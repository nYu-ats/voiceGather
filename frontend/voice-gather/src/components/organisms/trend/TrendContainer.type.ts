export type TrendKeywordProps = {
    trend: Array<TrendKeyword>;
}

type TrendKeyword = {
    title: string;
    data: Array<Keyword>;
}

type Keyword = {
    keyword: string;
    keywordPageUrl: string;
}