import axios from "axios";
import appConfig from "../Configuration/config";
import { authStore } from "../Redux/AuthState";
import CouponModel from "../Models/CouponModel";
import { CouponActionType, couponStore } from "../Redux/CouponState";
import tokenService from "./TokenService";
import authService from "./AuthService";

class CustomerCouponService {

    async purchaseCoupon(customerId:number, couponId: number): Promise<void> {
        const authState = authStore.getState();
        const token = authState.token;
        
        console.log("🔐 Purchase attempt:");
        console.log("- Token exists:", !!token);
        console.log("- User logged in:", !!authState.user);
        console.log("- Customer ID:", customerId);
        console.log("- Coupon ID:", couponId);
        
        // Check if token exists and is not expired
        if (!token) {
            console.log("❌ No token found - user not authenticated");
            throw new Error("User not authenticated. Please log in.");
        }
        
        // Check token expiration
        if (tokenService.isTokenExpired()) {
            console.log("❌ Token expired");
            authService.logout();
            throw new Error("Session expired. Please log in again.");
        }
        
        try {
            console.log("🔄 Sending purchase request with authorization header");
            // Making the API request with proper authorization header
            const response = await axios.post(
                appConfig.apiAddress + "company/customer_coupon/" + customerId + "/" + couponId, 
                null, 
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );
            console.log("✅ Purchase successful:", response.data);
            return response.data;
        } catch (error: any) {
            console.log("❌ Purchase failed:", error.response?.status, error.response?.data);
            if (error.response?.status === 403) {
                console.log("🔐 Authorization error - checking token validity");
                // Check if the user is still logged in
                const isValid = await tokenService.validateToken(token);
                if (!isValid) {
                    console.log("❌ Token invalid - logging out");
                    authService.logout();
                    throw new Error("Session invalid. Please log in again.");
                }
            }
            throw error;
        }
    }

    async getCouponsByCustomer(customerId: number): Promise<CouponModel[]> {
        const token = authStore.getState().token;

        // Check if token exists and is not expired
        if (!token || tokenService.TokenExpiredHandler(token)) {
            authService.logout(); // Logout if no token or token expired
            throw new Error("Authentication required or token expired.");
        }

        const response = await axios.get<CouponModel[]>(appConfig.apiAddress + "company/customer_coupon/byCustomer/" + customerId,
        {headers: {"Authorization" : "Bearer " + token}});
        couponStore.dispatch({type:CouponActionType.FetchCoupons, payload:response.data});
        return response.data;
    }
}

const customerCouponService: CustomerCouponService = new CustomerCouponService();
export default customerCouponService;