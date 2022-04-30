import { KeywordRes } from "../../models/ResponseModels";
import ApiClient, { KeywordIF } from "../api/ApiClient";

export const getKeyword = async (params: KeywordIF, title: string) => {
    let response:Array<KeywordRes> = await ApiClient.getKeyword(params);

    let trendKeyword: Array<string> = response.map((data) => {
        return data.keyword
    });

    return {title: title,data: trendKeyword};
}