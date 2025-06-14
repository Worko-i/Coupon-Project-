import { CategoryType } from "./CategoryModel";

interface CouponModel{
    
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: string;
    category: CategoryType;
    
}

export default CouponModel;