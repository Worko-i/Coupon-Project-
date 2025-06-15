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
    const userId = authStore.getState().user?.id;
    
    // Check if token exists and is not expired
    const isAuthenticated = token && !tokenService.isTokenExpired();
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        // If token exists but is expired, logout first
        if (token) {
            authService.logout();
        }
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // For company URLs, implement specific protection rules
    if (location.pathname.includes('/company-details/')) {
        const urlCompanyId = parseInt(location.pathname.split('/').pop() || '0');
        
        // For COMPANY users
        if (userType === 'COMPANY') {
            // Company can only view their own details
            if (!urlCompanyId || urlCompanyId !== userId) {
                return <Navigate to={`/company-details/${userId}`} replace />;
            }
        }
        // For non-ADMIN users who aren't accessing their own profile
        else if (userType !== 'ADMIN') {
            return <Navigate to="/home" replace />;
        }
    }

    // General protection for company-related routes
    if (location.pathname.includes('/companies/') && userType !== 'ADMIN') {
        return <Navigate to="/home" replace />;
    }

    // Customer protection remains the same...
    if (location.pathname.includes('/customers') && userType !== 'ADMIN') {
        if (location.pathname.includes('/customer-details/')) {
            const urlCustomerId = parseInt(location.pathname.split('/').pop() || '0');
            if (userType === 'CUSTOMER' && urlCustomerId === userId) {
                return <Outlet />;
            }
            return <Navigate to="/home" replace />;
        }
        return <Navigate to="/home" replace />;
    }

    // Set up auto-logout for when token will expire
    tokenService.setupAutoLogout(30);

    return <Outlet />;
};

export default ProtectedRoutes;