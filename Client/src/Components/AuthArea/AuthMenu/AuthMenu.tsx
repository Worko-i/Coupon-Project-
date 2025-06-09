import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Avatar, Menu, MenuItem, Chip } from '@mui/material';
import { Person, AdminPanelSettings, Business, ExitToApp, Login } from '@mui/icons-material';
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
            case 'COMPANY': return user.name;
            case 'CUSTOMER': return user.firstName;
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
                    borderColor: 'white',
                    '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                Login
            </Button>
        );
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
                icon={getIcon()}
                label={user.clientType}
                color={getUserTypeColor() as any}
                size="small"
                sx={{ color: 'white', '& .MuiChip-icon': { color: 'white' } }}
            />
            
            <Button
                onClick={handleMenuOpen}
                startIcon={
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                        {getUserDisplayName().charAt(0).toUpperCase()}
                    </Avatar>
                }
                sx={{
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 500 }}>
                    Hello, {getUserDisplayName()}
                </Typography>
            </Button>

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
            >
                <MenuItem onClick={logout}>
                    <ExitToApp sx={{ mr: 1 }} />
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default AuthMenu