import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Typography, 
    Avatar, 
    Menu, 
    MenuItem, 
    Chip,
    Stack,
    Divider,
    IconButton,
    Tooltip,
    Fade
} from '@mui/material';
import { 
    Person, 
    AdminPanelSettings, 
    Business, 
    ExitToApp, 
    Login,
    AccountCircle,
    VerifiedUser,
    KeyboardArrowDown
} from '@mui/icons-material';
import UserModel from '../../../Models/UserModel';
import { authStore } from '../../../Redux/AuthState';
import authService from '../../../Services/AuthService';

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(authStore.getState().user!);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user!);
        })

        return () => unsubscribe();
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function logout() {
        authService.logout();
        navigate("/home");
        handleMenuClose();
    }

    function getIcon() {
        if (!user) return <Person />;
        switch (user.clientType) {
            case 'ADMIN': return <AdminPanelSettings />;
            case 'COMPANY': return <Business />;
            case 'CUSTOMER': return <Person />;
            default: return <Person />;
        }
    }

    function getUserDisplayName() {
        if (!user) return 'Guest';
        switch (user.clientType) {
            case 'ADMIN': return 'Admin';
            case 'COMPANY': return user.name || 'Company';
            case 'CUSTOMER': return user.firstName || 'Customer';
            default: return 'Guest';
        }
    }

    function getUserTypeColor() {
        if (!user) return 'default';
        switch (user.clientType) {
            case 'ADMIN': return 'error';
            case 'COMPANY': return 'primary';
            case 'CUSTOMER': return 'secondary';
            default: return 'default';
        }
    }

    if (!user) {
        return (
            <Button
                variant="outlined"
                startIcon={<Login />}
                onClick={() => navigate('/login')}
                sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                }}
                aria-label="Sign in to your account"
            >
                Sign In
            </Button>
        );
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* User Type Chip - Hidden for all user types */}
            
            {/* User Menu Button */}
            <Button
                onClick={handleMenuOpen}
                startIcon={
                    <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        color: 'primary.main',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                    }}>
                        {getUserDisplayName().charAt(0).toUpperCase()}
                    </Avatar>
                }
                sx={{
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                }}
                aria-label={`User menu for ${getUserDisplayName()}`}
                aria-expanded={Boolean(anchorEl)}
                aria-haspopup="true"
            >
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 500, fontSize: '0.875rem' }}>
                    {getUserDisplayName()}
                </Typography>
            </Button>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        borderRadius: 2,
                        minWidth: 200,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        '& .MuiMenuItem-root': {
                            borderRadius: 1,
                            mx: 1,
                            my: 0.5,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                                transform: 'translateX(4px)',
                            },
                        },
                    },
                }}
            >
                {/* User Info Section */}
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {getUserDisplayName()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {user.email}
                    </Typography>
                    {/* <Chip 
                        label={user.clientType}
                        size="small"
                        color={getUserTypeColor() as any}
                        sx={{ mt: 1, fontSize: '0.7rem' }}
                    /> */}
                </Box>

                {/* Logout Option */}
                <MenuItem 
                    onClick={logout}
                    sx={{
                        color: 'error.main',
                        fontWeight: 500,
                    }}
                >
                    <ExitToApp sx={{ mr: 1.5, fontSize: 20 }} />
                    Sign Out
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default AuthMenu