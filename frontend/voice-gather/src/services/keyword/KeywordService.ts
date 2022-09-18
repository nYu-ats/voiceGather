import ApiClient from "../../features/api/ApiClient";
import { GetKeywordListParameter } from "./KeywordService.type";

class KeywordService {
    private static instance: KeywordService;
    apiClient: typeof ApiClient

    constructor() {
        this.apiClient = ApiClient;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new KeywordService();
        }

        return this.instance;
    }

    async getList(params: GetKeywordListParameter): Promise<Array<string>> {
        const response = await ApiClient.getKeyword(params);
        const keywordList = response.map((item) => {
                return item.keyword
            })

        return keywordList;
    }
}

export default KeywordService.getInstance();