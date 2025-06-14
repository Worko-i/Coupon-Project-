import { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';
import { LocalOffer as CouponIcon } from '@mui/icons-material';
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';
import { authStore } from '../../../Redux/AuthState';
import { useNavigate } from 'react-router-dom';

function Header(): JSX.Element {
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            if (authStore.getState().token === null) {
                alert("Your Session Has Expired, Please Login Again To Enjoy The Website!");
                navigate('/login');
            }
        })

        return () => unsubscribe();
    }, [navigate]);

    return (
        <AppBar 
            position="static" 
            elevation={2}
            sx={{ 
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                height: '70px',
                justifyContent: 'center',
                borderRadius: '0 0 0 0px',
            }}
        >
            <Toolbar 
                sx={{ 
                    justifyContent: 'space-between', 
                    px: 4,
                    minHeight: '70px !important',
                }}
            >
                {/* Logo and Title */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                        },
                    }}
                    onClick={() => navigate('/home')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            navigate('/home');
                        }
                    }}
                    aria-label="Navigate to home page"
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                            borderRadius: '50%',
                            p: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <CouponIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                    </Box>
                    <Typography 
                        variant="h5" 
                        component="h1"
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'white',
                            letterSpacing: '0.5px',
                        }}
                    >
                        Coupon System
                    </Typography>
                </Box>
                
                {/* Right side actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Auth Menu */}
                    <AuthMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
