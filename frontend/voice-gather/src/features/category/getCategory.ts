import { CategoryRes } from "../../models/ResponseModels";
import ApiClient, { CategoryIF } from "../api/ApiClient";

export const getCategory = async (params: CategoryIF) => {
    let response:Array<CategoryRes> = await ApiClient.getCategory(params);
    return response;
}