import axios from "axios";
import appConfig from "../Configuration/config";
import CustomerModel from "../Models/CustomerModel";
import { authStore } from "../Redux/AuthState";
import { CustomerActionType, customerStore } from "../Redux/CustomerState";
import tokenService from "./TokenService";

class CustomerService {

    async addCustomer(customer: CustomerModel): Promise<CustomerModel>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        const response = await axios.post<CustomerModel>(appConfig.apiAddress + "admin/customer", customer,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        const savedCustomer = response.data;
        customerStore.dispatch({type:CustomerActionType.AddCustomer, payload:savedCustomer});
        return savedCustomer;
    }

    async deleteCustomer(id: number): Promise<void>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        const response = await axios.delete<void>(appConfig.apiAddress + "admin/customer/" + id,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        customerStore.dispatch({type:CustomerActionType.DeleteCustomer, payload:id});
        return response.data
    }

    async updateCustomer(id: number, customer:CustomerModel): Promise<void>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        const response = await axios.put<void>(appConfig.apiAddress + "admin/customer/" + id, customer,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        customerStore.dispatch({type:CustomerActionType.UpdateCustomer, payload: customer});

        return response.data
    }

    async getCustomers(): Promise<CustomerModel[]> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        if(customerStore.getState().customerList.length === 0){
            const response = await axios.get<CustomerModel[]>(appConfig.apiAddress + "admin/customer",
            {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
            customerStore.dispatch({type:CustomerActionType.FetchCustomers, payload:response.data});
            return response.data;
        }
        return customerStore.getState().customerList;
    
    }

    async getSingleCustomer(id: number): Promise<CustomerModel> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        
        const currentUser = authStore.getState().user;
        const isCustomerViewingOwnProfile = currentUser?.clientType === "CUSTOMER" && currentUser?.id === id;
        
        // Use different endpoints based on user role
        const endpoint = isCustomerViewingOwnProfile 
            ? "customer/details"  // Endpoint for customers viewing their own details
            : "admin/customer/" + id;  // Admin endpoint for viewing any customer
            
        const response = await axios.get<CustomerModel>(
            appConfig.apiAddress + endpoint,
            {headers: {"Authorization" : "Bearer " + authStore.getState().token}}
        );
        return response.data;
    }

}

const customerService: CustomerService = new CustomerService();
export default customerService;