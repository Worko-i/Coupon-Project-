import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authStore } from '../../Redux/AuthState';
import tokenService from '../../Services/TokenService';
import authService from '../../Services/AuthService';

/**
 * Component to protect routes based on authentication and authorization
 */
const ProtectedRoutes = () => {
    const location = useLocation();
    const token = authStore.getState().token;
    const userType = authStore.getState().user?.clientType;
    
    // Check if token exists and is not expired
    const isAuthenticated = token && !tokenService.isTokenExpired();
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        // If token exists but is expired, logout first
        if (token) {
            authService.logout();
        }
        
        // Redirect to login and remember where user was trying to go
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    
    // Check for role-based access restrictions
    if (location.pathname.includes('/admin') && userType !== 'ADMIN') {
        return <Navigate to="/home" replace />;
    }
    
    if (location.pathname.includes('/companies') && userType !== 'ADMIN') {
        // Only allow a company to see its own details
        if (location.pathname.includes('/company-details/')) {
            const urlCompanyId = parseInt(location.pathname.split('/').pop() || '0');
            const loggedInId = authStore.getState().user?.id;
            
            if (userType === 'COMPANY' && urlCompanyId === loggedInId) {
                // Allow company to see its own details
                return <Outlet />;
            } else {
                return <Navigate to="/home" replace />;
            }
        }
        
        // For any other company-related routes, restrict to ADMIN
        return <Navigate to="/home" replace />;
    }
    
    if (location.pathname.includes('/customers') && userType !== 'ADMIN') {
        // Only allow a customer to see its own details
        if (location.pathname.includes('/customer-details/')) {
            const urlCustomerId = parseInt(location.pathname.split('/').pop() || '0');
            const loggedInId = authStore.getState().user?.id;
            
            if (userType === 'CUSTOMER' && urlCustomerId === loggedInId) {
                // Allow customer to see its own details
                return <Outlet />;
            } else {
                return <Navigate to="/home" replace />;
            }
        }
        
        // For any other customer-related routes, restrict to ADMIN
        return <Navigate to="/home" replace />;
    }
    
    // Set up auto-logout for when token will expire
    tokenService.setupAutoLogout(30); // 30 seconds before expiration
    
    // User is authenticated and authorized, render the protected route
    return <Outlet />;
};

export default ProtectedRoutes;