import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";
import TokenModel from "../Models/TokenModel";

//1
export class AuthState{
    user: UserModel | null = null;
    token: string | null = null;
    exp: number | null = null; // expiration time (unix time)

    constructor(){
        const tokenFromlocalStorage: string|null = localStorage.getItem("token");

        if(tokenFromlocalStorage){
            try {
                const userFromToken: UserModel = jwtDecode(tokenFromlocalStorage);
                this.user = userFromToken;
                const tokenModel: TokenModel = jwtDecode(tokenFromlocalStorage);
                this.exp = tokenModel.exp;
                this.token = tokenFromlocalStorage;
                
                console.log("🔄 AuthState initialized from localStorage:");
                console.log("- User:", this.user);
                console.log("- Token exists:", !!this.token);
                console.log("- Exp:", this.exp);
            } catch (error) {
                console.error("❌ Error decoding token from localStorage:", error);
                // Clear invalid token
                localStorage.removeItem("token");
                this.user = null;
                this.token = null;
                this.exp = null;
            }
        } else {
            console.log("📭 No token found in localStorage");
        }
    }
}

//2
export enum AuthActionType{
    Login,  // fetch user
    Logout,
}

//3
export interface AuthAction{
    type: AuthActionType;
    payload?: any;
}

//4 - instead of doing it in the service

export function loginAction(token: TokenModel): AuthAction{
    return {type: AuthActionType.Login, payload: token};
}

export function logoutAction(): AuthAction{
    return {type: AuthActionType.Logout};
}

//5
export function authReducer(currentState: AuthState = new AuthState, action: AuthAction): AuthState{
    const newState: AuthState = {...currentState};
    
    switch(action.type){
        case AuthActionType.Login:
            try {
                newState.token = action.payload.token;
                newState.exp = action.payload.expiration; // Note: payload has 'expiration', not 'exp'
                const userFromToken: UserModel = jwtDecode(newState.token!);
                newState.user = userFromToken;
                localStorage.setItem("token", newState.token!);
                
                console.log("✅ Login action processed:");
                console.log("- Token stored:", !!newState.token);
                console.log("- User:", newState.user);
                console.log("- Expiration:", newState.exp);
            } catch (error) {
                console.error("❌ Error processing login action:", error);
                // Reset state on error
                newState.token = null;
                newState.user = null;
                newState.exp = null;
                localStorage.removeItem("token");
            }
            break;


        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            newState.exp = null;
            localStorage.removeItem("token");
            break;

    }
    return newState;
}

//6
export const authStore = createStore(authReducer);

