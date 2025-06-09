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
            showFor: ['all'] 
        },
        { 
            path: '/companies', 
            label: 'Companies', 
            icon: <Business />, 
            showFor: ['ADMIN'] 
        },
        { 
            path: '/customers', 
            label: 'Customers', 
            icon: <People />, 
            showFor: ['ADMIN'] 
        },
        { 
            path: '/coupons', 
            label: 'Coupons', 
            icon: <LocalOffer />, 
            showFor: ['COMPANY'] 
        },
        { 
            path: `/company-details/${user?.id}`, 
            label: 'Company Details', 
            icon: <AccountCircle />, 
            showFor: ['COMPANY'] 
        },
        { 
            path: '/customer/coupons', 
            label: 'My Coupons', 
            icon: <ShoppingCart />, 
            showFor: ['CUSTOMER'] 
        },
        { 
            path: '/coupons', 
            label: 'Coupons Shop', 
            icon: <Store />, 
            showFor: ['CUSTOMER'] 
        },
        { 
            path: `/customer-details/${user?.id}`, 
            label: 'Customer Details', 
            icon: <AccountCircle />, 
            showFor: ['CUSTOMER'] 
        },
    ];

    const filteredMenuItems = menuItems.filter(item => 
        item.showFor.includes('all') || 
        (user && item.showFor.includes(user.clientType))
    );

    return (
        <Box sx={{ width: 280, height: '100%' }}>
            <Box 
                sx={{ 
                    p: 2, 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                    Navigation
                </Typography>
            </Box>
            
            <List sx={{ pt: 0 }}>
                {filteredMenuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    backgroundColor: isActive ? 'primary.light' : 'transparent',
                                    color: isActive ? 'white' : 'text.primary',
                                    '&:hover': {
                                        backgroundColor: isActive ? 'primary.main' : 'action.hover',
                                    },
                                    borderRadius: 1,
                                    mx: 1,
                                    my: 0.5,
                                }}
                            >
                                <ListItemIcon 
                                    sx={{ 
                                        color: isActive ? 'white' : 'primary.main',
                                        minWidth: 40
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 400,
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            
            {user && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            Logged in as: {user.clientType}
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Menu

