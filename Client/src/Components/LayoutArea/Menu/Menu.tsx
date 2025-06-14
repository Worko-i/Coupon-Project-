import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Divider,
    Box,
    Typography
} from '@mui/material';
import {
    Home,
    Business,
    People,
    LocalOffer,
    AccountCircle,
    ShoppingCart,
    Store
} from '@mui/icons-material';
import { authStore } from '../../../Redux/AuthState';
import UserModel from '../../../Models/UserModel';

function Menu(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const location = useLocation();
    
    useEffect(() => {
        setUser(authStore.getState().user!);
        const unsubscribe = authStore.subscribe(() =>{
            setUser(authStore.getState().user!);
        })

        return ()=> unsubscribe();
    },[]);

    const menuItems = [
        { 
            path: '/home', 
            label: 'Home', 
            icon: <Home />, 
            showFor: ['all'],
            description: 'Main dashboard and overview'
        },
        { 
            path: '/companies', 
            label: 'Companies', 
            icon: <Business />, 
            showFor: ['ADMIN'],
            description: 'Manage all companies'
        },
        { 
            path: '/customers', 
            label: 'Customers', 
            icon: <People />, 
            showFor: ['ADMIN'],
            description: 'Manage all customers'
        },
        { 
            path: '/coupons', 
            label: 'Coupons', 
            icon: <LocalOffer />, 
            showFor: ['COMPANY'],
            description: 'Manage your coupons'
        },
        { 
            path: `/company-details/${user?.id}`, 
            label: 'Company Profile', 
            icon: <AccountCircle />, 
            showFor: ['COMPANY'],
            description: 'View and edit company details'
        },
        { 
            path: '/customer/coupons', 
            label: 'My Coupons', 
            icon: <ShoppingCart />, 
            showFor: ['CUSTOMER'],
            description: 'View purchased coupons'
        },
        { 
            path: '/coupons', 
            label: 'Coupons Shop', 
            icon: <Store />, 
            showFor: ['CUSTOMER'],
            description: 'Browse and purchase coupons'
        },
        { 
            path: `/customer-details/${user?.id}`, 
            label: 'My Profile', 
            icon: <AccountCircle />, 
            showFor: ['CUSTOMER'],
            description: 'View and edit profile'
        },
    ];

    const filteredMenuItems = menuItems.filter(item => 
        item.showFor.includes('all') || 
        (user && item.showFor.includes(user.clientType))
    );

    return (
        <Box sx={{ 
            width: '100%', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper',
        }}>
            {/* Navigation Header */}
            <Box 
                sx={{ 
                    p: 3, 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    Navigation Menu
                </Typography>
                {/* {user && (
                    <Typography variant="caption" sx={{ opacity: 0.9, mt: 0.5, display: 'block' }}>
                        {user.clientType} Panel
                    </Typography>
                )} */}
            </Box>
            
            {/* Navigation Items */}
            <List sx={{ 
                pt: 2, 
                flex: 1, 
                overflow: 'auto',
                px: 1,
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '2px',
                },
            }}>
                {filteredMenuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    py: 2,
                                    px: 2,
                                    borderRadius: 2,
                                    mx: 1,
                                    backgroundColor: isActive ? 'primary.main' : 'transparent',
                                    color: isActive ? 'white' : 'text.primary',
                                    border: isActive ? 'none' : '1px solid transparent',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                                        transform: 'translateX(4px)',
                                        border: isActive ? 'none' : '1px solid rgba(25, 118, 210, 0.2)',
                                    },
                                    '&:focus': {
                                        outline: '2px solid',
                                        outlineColor: 'primary.main',
                                        outlineOffset: '2px',
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        height: '100%',
                                        width: '4px',
                                        backgroundColor: isActive ? 'white' : 'primary.main',
                                        transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                                        transformOrigin: 'center',
                                        transition: 'transform 0.3s ease',
                                    },
                                    '&:hover::before': {
                                        transform: 'scaleY(1)',
                                    },
                                }}
                                aria-describedby={`menu-item-${index}-description`}
                            >
                                <ListItemIcon 
                                    sx={{ 
                                        color: isActive ? 'white' : 'primary.main',
                                        minWidth: 44,
                                        transition: 'transform 0.2s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.label}
                                    secondary={!isActive ? item.description : undefined}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '0.95rem',
                                        color: isActive ? 'white' : 'text.primary',
                                    }}
                                    secondaryTypographyProps={{
                                        fontSize: '0.75rem',
                                        color: 'text.secondary',
                                        sx: { 
                                            mt: 0.5,
                                            opacity: 0.8,
                                            lineHeight: 1.2,
                                        },
                                    }}
                                />
                                {/* Hidden description for screen readers */}
                                <Box
                                    id={`menu-item-${index}-description`}
                                    sx={{ display: 'none' }}
                                    aria-hidden="true"
                                >
                                    {item.description}
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            
            {/* User Info Section */}
            {user && (
                <>
                    <Divider sx={{ mx: 2 }} />
                    <Box sx={{ 
                        px: 3, 
                        py: 2,
                        backgroundColor: 'grey.50',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Logged in as
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mt: 0.5 }}>
                            {user.clientType}
                        </Typography>
                        {(user.name || user.firstName) && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                {user.name || user.firstName}
                            </Typography>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Menu

