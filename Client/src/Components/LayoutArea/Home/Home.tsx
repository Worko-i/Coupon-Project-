import { 
    Box, 
    Typography, 
    Container, 
    Grid, 
    Card, 
    CardContent,
    Fab,
    useScrollTrigger,
    Zoom,
    Fade,
    Button
} from '@mui/material';
import { 
    LocalOffer, 
    ShoppingCart,
    KeyboardArrowUp
} from '@mui/icons-material';
import { useEffect, useState } from 'react';

// Scroll to top component
function ScrollTop() {
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Zoom in={trigger}>
            <Fab
                onClick={handleClick}
                color="primary"
                size="small"
                aria-label="scroll back to top"
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                }}
            >
                <KeyboardArrowUp />
            </Fab>
        </Zoom>
    );
}

function Home(): JSX.Element {  
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: <LocalOffer sx={{ fontSize: 52 }} />,
            title: "Create & Manage Coupons",
            description: "Companies can easily create, update, and manage promotional coupons with advanced settings."
        },
        {
            icon: <ShoppingCart sx={{ fontSize: 52 }} />,
            title: "Purchase & Redeem",
            description: "Customers can browse, purchase, and redeem coupons with intelligent limitations."
        }
    ];

    return (
        <Box 
            sx={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                scrollBehavior: 'smooth',
                // Enhanced scrollbar styling
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    borderRadius: '4px',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                    },
                },
            }}
        >
            {/* Hero Section */}
            <Fade in={isVisible} timeout={1000}>
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        py: 12,
                        mb: 6,
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.05"%3E%3Cpath d="m0 40l40-40h-40v40z"/%3E%3C/g%3E%3C/svg%3E")',
                        }
                    }}
                >
                    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography 
                            variant="h1" 
                            component="h1" 
                            gutterBottom
                            sx={{ 
                                fontWeight: 700,
                                mb: 3,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}
                        >
                            Welcome to the Future of Coupon Management
                        </Typography>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                mb: 4,
                                opacity: 0.95,
                                lineHeight: 1.6,
                                fontWeight: 400,
                                maxWidth: '600px',
                                margin: '0 auto 32px auto',
                            }}
                        >
                            The ultimate platform for companies and customers to create, manage, and purchase promotional coupons
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: 'white',
                                color: 'primary.main',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    backgroundColor: 'grey.100',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
                                }
                            }}
                            onClick={() => {
                                document.getElementById('features-section')?.scrollIntoView({ 
                                    behavior: 'smooth' 
                                });
                            }}
                        >
                            Explore Features
                        </Button>
                    </Container>
                </Box>
            </Fade>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mb: 6, py: 4 }} id="features-section">
                <Fade in={isVisible} timeout={1200}>
                    <Typography 
                        variant="h2" 
                        component="h2" 
                        textAlign="center" 
                        gutterBottom
                        sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}
                    >
                        Key Features
                    </Typography>
                </Fade>
                
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Fade in={isVisible} timeout={1400 + index * 200}>
                                <Card 
                                    sx={{ 
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            mb: 2,
                                            color: 'primary.main' 
                                        }}>
                                            {feature.icon}
                                            <Typography variant="h5" component="h3" sx={{ ml: 2, fontWeight: 600 }}>
                                                {feature.title}
                                            </Typography>
                                        </Box>
                                        <Typography 
                                            variant="body1" 
                                            color="text.secondary" 
                                            sx={{ lineHeight: 1.6 }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Call to Action */}
            <Container maxWidth="md" sx={{ mb: 6, textAlign: 'center' }}>
                <Fade in={isVisible} timeout={1800}>
                    <Card sx={{ 
                        p: 4, 
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                    }}>
                        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                            Ready to Get Started?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            Join our platform for seamless coupon management designed for optimal user experience.
                        </Typography>
                    </Card>
                </Fade>
            </Container>

            {/* Scroll to top button */}
            <ScrollTop />
        </Box>
    );
}

export default Home; 