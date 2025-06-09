import { authStore, logoutAction } from "../Redux/AuthState";
import TokenModel from "../Models/TokenModel";
import authService from "./AuthService";

/**
 * Service for handling token operations in the client application
 */
class TokenService {
  /**
   * Checks if the current token is expired
   * @returns boolean indicating if the token is expired
   */
  isTokenExpired(): boolean {
    const token = authStore.getState()?.token;
    if (!token) {
      return true;
    }
    
    const expirationDate: number = authStore.getState().exp!;
    const currentDate: number = Math.round((new Date()).getTime() / 1000);
    
    // Return true if expired (expiration date is less than or equal to current time)
    return expirationDate <= currentDate;
  }
  
  /**
   * Handles token expiration by logging out if expired
   * @param token The JWT token string
   * @returns boolean indicating if the token was expired and user was logged out
   */
  TokenExpiredHandler(token: string): boolean {
    if (!token || this.isTokenExpired()) {
      authService.logout();
      return true;
    }
    return false;
  }
  
  /**
   * Gets the remaining time until token expiration in seconds
   * @returns number of seconds until expiration or 0 if already expired
   */
  getTimeUntilExpiration(): number {
    const token = authStore.getState()?.token;
    if (!token) {
      return 0;
    }
    
    const expirationDate: number = authStore.getState().exp!;
    const currentDate: number = Math.round((new Date()).getTime() / 1000);
    const remainingTime = expirationDate - currentDate;
    
    return remainingTime > 0 ? remainingTime : 0;
  }
  
  /**
   * Sets up auto-logout when token expires
   * @param bufferSeconds Number of seconds before actual expiration to trigger logout
   */
  setupAutoLogout(bufferSeconds: number = 10): void {
    const timeUntilExpiry = this.getTimeUntilExpiration();
    
    if (timeUntilExpiry > 0) {
      // Set timeout to automatically logout when token expires (minus buffer)
      const logoutTime = Math.max(0, (timeUntilExpiry - bufferSeconds) * 1000);
      
      setTimeout(() => {
        if (authStore.getState()?.token) {
          console.log("Token expiring soon, logging out...");
          authService.logout();
        }
      }, logoutTime);
    }
  }
}

const tokenService: TokenService = new TokenService();
export default tokenService;