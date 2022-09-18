import ApiClient from "../../features/api/ApiClient";
import { GetCategoryListParameter, Category } from "./CategoryService.type";

class CategoryService {
    private static instance: CategoryService;
    apiClient: typeof ApiClient

    constructor(){
        this.apiClient = ApiClient;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new CategoryService();
        }

        return this.instance;
    }

    async getList(params: GetCategoryListParameter):Promise<Array<Category>> {
        const response = await ApiClient.getCategory(params);
        const categoryList = response.map((item) => {
            return {
                id:item.id,
                name:item.name
            }
        })

        return categoryList;
    }
}

export default CategoryService.getInstance();