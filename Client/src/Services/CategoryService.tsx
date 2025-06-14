import axios from "axios";
import appConfig from "../Configuration/config";
import { authStore } from "../Redux/AuthState";
import CategoryModel, { CategoryType } from "../Models/CategoryModel";
import { CategoryActionType, categoryStore } from "../Redux/CategoryState";
import tokenService from "./TokenService";

class CategoryService {

    async getSingleCategory(categoryName: string): Promise<CategoryType> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!);
        const response = await axios.get<CategoryType>(appConfig.apiAddress + "category/" + categoryName,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        return response.data;
    }

    async getAllCategories(): Promise<CategoryModel[]> {
        // in order to prevent an error, logout if the token expired or null
        if(tokenService.isTokenExpired()){
            return [];
        }
        const response = await axios.get<CategoryType[]>(appConfig.apiAddress + "category",
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        
        // Convert enum values to CategoryModel for backwards compatibility
        const categoryModels: CategoryModel[] = response.data.map((categoryType, index) => ({
            id: index + 1, // Generate ID for backwards compatibility
            name: categoryType
        }));
        
        categoryStore.dispatch({type: CategoryActionType.FetchCategories, payload: categoryModels});
        return categoryModels;
    }
}

const categoryService: CategoryService = new CategoryService();
export default categoryService;