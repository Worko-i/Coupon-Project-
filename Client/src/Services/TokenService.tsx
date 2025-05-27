import { authStore, logoutAction } from "../Redux/AuthState";
import TokenModel from "../Models/TokenModel";
import authService from "./AuthService";
import axios from "axios";
import appConfig from "../Configuration/config";

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
    
    const expirationDate: number = authStore.getState().exp!; // Expiration time in milliseconds
    const currentDate: number = (new Date()).getTime(); // Current time in milliseconds
    
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
    const currentDate: number = Math.round((new Date()).getTime()); // Current time in milliseconds
    const remainingTime = Math.round((expirationDate - currentDate) / 1000); // Convert to seconds
    
    console.log("🕐 Token expiration calculation:");
    console.log("- Current time (ms):", currentDate);
    console.log("- Expiration time (ms):", expirationDate);
    console.log("- Remaining time (seconds):", remainingTime);
    
    return remainingTime > 0 ? remainingTime : 0;
  }
  
  /**
   * Sets up auto-logout when token expires
   * @param bufferSeconds Number of seconds before actual expiration to trigger logout
   */
  setupAutoLogout(bufferSeconds: number = 10): void {
    const timeUntilExpiry = this.getTimeUntilExpiration();
    
    console.log(`⏰ Setting up auto-logout with ${bufferSeconds}s buffer`);
    console.log(`- Time until expiry: ${timeUntilExpiry} seconds`);
    
    if (timeUntilExpiry > bufferSeconds) {
      // Set timeout to automatically logout when token expires (minus buffer)
      const logoutTime = (timeUntilExpiry - bufferSeconds) * 1000;
      
      console.log(`- Auto-logout scheduled in ${Math.round(logoutTime / 1000)} seconds`);
      
      setTimeout(() => {
        if (authStore.getState()?.token) {
          console.log("Token expiring soon, logging out...");
          authService.logout();
        }
      }, logoutTime);
    } else {
      console.log("- Token expires too soon for auto-logout setup");
    }
  }
  
  /**
   * Validates the token with the server
   * @param token The JWT token string
   * @returns Promise resolving to boolean indicating if the token is valid
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      // You may need to create a token validation endpoint on your server
      // For now, we'll try to access a protected endpoint that requires authentication
      await axios.get(appConfig.apiAddress + "auth/validate", {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  }
}

const tokenService: TokenService = new TokenService();
export default tokenService;