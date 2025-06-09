import { Box, Typography, Container, Link } from '@mui/material';
import { Email } from '@mui/icons-material';

function Footer(): JSX.Element {
    return (
        <Box
            component="footer"
            sx={{
                position: 'flex',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(45deg, #263238 30%, #37474f 90%)',
                color: 'white',
                py: 2,
                zIndex: 1000,
                boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                            Coupon System
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            © 2025 All rights reserved
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Email sx={{ fontSize: 20 }} />
                            <Link 
                                href="mailto:worko.itegev@gmail.com" 
                                color="inherit" 
                                underline="hover"
                                sx={{ fontSize: '0.9rem' }}
                            >
                                worko.itegev@gmail.com
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer

