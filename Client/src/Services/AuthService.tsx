import axios from "axios";
import appConfig from "../Configuration/config";
import LoginModel from "../Models/LoginModel";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import TokenModel from "../Models/TokenModel";
import tokenService from "./TokenService";

/**
 * Service handling authentication operations
 */
class AuthService {
    /**
     * Authenticates user with provided login details
     * @param loginDetails The login credentials
     * @returns A promise resolving to void
     */
    async login(loginDetails: LoginModel): Promise<void> {
        try {
            const response = await axios.post<TokenModel>(appConfig.apiLogin, loginDetails);
            const token: TokenModel = response.data;
            authStore.dispatch(loginAction(token));
            
            console.log("Auth state after login:", authStore.getState());
            
            // Set up auto logout when token is about to expire
            tokenService.setupAutoLogout(30); // Logout 30 seconds before expiration
            
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    /**
     * Logs out the current user
     * Removes token from storage and updates auth state
     */
    logout(): void {
        authStore.dispatch(logoutAction());
    }
    
    /**
     * Checks if a user is currently logged in
     * @returns Boolean indicating login status
     */
    isLoggedIn(): boolean {
        return authStore.getState().token !== null && !tokenService.isTokenExpired();
    }
    
    /**
     * Gets user's client type (role) from the auth store
     * @returns Client type string or null if not logged in
     */
    getUserClientType(): string | null {
        return this.isLoggedIn() ? authStore.getState().user?.clientType || null : null;
    }

    /**
     * Refreshes the authentication status
     * Checks token expiration and logs out if needed
     */
    refreshAuthStatus(): void {
        if (authStore.getState().token) {
            // If token exists but is expired, log out
            if (tokenService.isTokenExpired()) {
                this.logout();
            }
        }
    }
}

const authService: AuthService = new AuthService();
export default authService;