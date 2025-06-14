// Updated to match the CategoryType enum from the server
export enum CategoryType {
    FOOD = "FOOD",
    ELECTRONICS = "ELECTRONICS",
    RESTAURANTS = "RESTAURANTS", 
    TRAVEL = "TRAVEL",
    ENTERTAINMENT = "ENTERTAINMENT",
    CLOTHING = "CLOTHING"
}

// For backwards compatibility with existing UI code
interface CategoryModel {
    id?: number;
    name: string;
}

export default CategoryModel;