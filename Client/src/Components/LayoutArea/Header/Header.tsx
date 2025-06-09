import { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { LocalOffer as CouponIcon } from '@mui/icons-material';
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';
import { authStore } from '../../../Redux/AuthState';
import { useNavigate } from 'react-router-dom';

function Header(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            if (authStore.getState().token === null) {
                alert("Your Session Has Expired, Please Login Again To Enjoy The Website!");
                navigate('/login');
            }
        })

        return () => unsubscribe();
    }, []);

    return (
        <AppBar 
            position="static" 
            sx={{ 
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton edge="start" color="inherit" sx={{ p: 0 }}>
                        <CouponIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <Typography 
                        variant="h4" 
                        component="h1"
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'white'
                        }}
                    >
                        Coupons System
                    </Typography>
                </Box>
                
                <AuthMenu />
            </Toolbar>
        </AppBar>
    );
}

export default Header

