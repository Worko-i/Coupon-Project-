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
            const decodedToken: any = jwtDecode(tokenFromlocalStorage);
            this.user = {
                id: decodedToken.id,
                email: decodedToken.email,
                clientType: decodedToken.clientType,
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName,
                exp: decodedToken.exp,
                iat: decodedToken.iat
            };
            this.exp = decodedToken.exp;
            this.token = tokenFromlocalStorage;
            
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
            const tokenData: TokenModel = action.payload;
            newState.token = tokenData.token;
            
            if(tokenData.token) {
                const decodedToken: any = jwtDecode(tokenData.token);
                
                // Set expiration from token claims
                newState.exp = decodedToken.exp;
                
                // Set user data from token claims
                newState.user = {
                    id: decodedToken.id,
                    email: decodedToken.email,
                    clientType: decodedToken.clientType,
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                    exp: decodedToken.exp,
                    iat: decodedToken.iat
                };
                
                localStorage.setItem("token", tokenData.token);
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

