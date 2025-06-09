import { 
    Box, 
    Typography, 
    Container, 
    Grid, 
    Card, 
    CardContent
} from '@mui/material';
import { 
    LocalOffer, 
    ShoppingCart,
    TrendingUp,
    Security
} from '@mui/icons-material';

function Home(): JSX.Element {  
    const features = [
        {
            icon: <LocalOffer sx={{ fontSize: 52 }} />,
            title: "Create Coupons",
            description: "Companies can easily create and manage promotional coupons for their marketing campaigns."
        },
        {
            icon: <ShoppingCart sx={{ fontSize: 52 }} />,
            title: "Purchase Coupons",
            description: "Customers can browse and purchase coupons with quantity and validity limitations."
        },
        {
            icon: <TrendingUp sx={{ fontSize: 52 }} />,
            title: "Track Performance",
            description: "Monitor coupon usage and generate revenue from customer purchases and company subscriptions."
        },
        {
            icon: <Security sx={{ fontSize: 52 }} />,
            title: "Secure System",
            description: "Advanced authentication and authorization system with role-based access control."
        }
    ];

    return (
        <Box 
            sx={{
                height: '100vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                padding: '0 0 2.5rem 0',
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '5px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '5px',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    },
                },
            }}
        >
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    py: 16,
                    mb: 8,
                    borderRadius: 3,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Typography 
                        variant="h1" 
                        component="h1" 
                        gutterBottom
                        sx={{ 
                            fontWeight: 700,
                            mb: 3,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >
                        Welcome To Our Coupon System!
                    </Typography>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            mb: 6,
                            opacity: 0.9,
                            lineHeight: 1.6
                        }}
                    >
                        The ultimate platform for companies and customers to create, manage, and purchase promotional coupons
                    </Typography>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mb: 8, py: 6 }}>
                <Typography 
                    variant="h2" 
                    component="h2" 
                    textAlign="center" 
                    gutterBottom
                    sx={{ mb: 6, fontWeight: 600, color: 'primary.main' }}
                >
                    Key Features
                </Typography>
                
                <Grid container spacing={5}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 15px 25px rgba(0,0,0,0.15)'
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 5 }}>
                                    <Box sx={{ color: 'primary.main', mb: 3 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Images Gallery Section */}
            {/* <Box sx={{ bgcolor: 'grey.50', py: 8, borderRadius: 3, mb: 4 }}>
                <Container maxWidth="lg">
                    <Typography 
                        variant="h3" 
                        component="h2" 
                        textAlign="center" 
                        gutterBottom
                        sx={{ mb: 5, fontWeight: 600, color: 'primary.main' }}
                    >
                        System Overview
                    </Typography>
                    
                    <Grid container spacing={4}>
                        {[
                            { img: shoppingImage, title: "Shopping Experience" },
                            { img: couponSystemOnline, title: "Online System" },
                            { img: couponImage2, title: "Coupon Management" }
                        ].map((item, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card sx={{ 
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={item.img}
                                        alt={item.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="h3" textAlign="center" sx={{ fontWeight: 600 }}>
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box> */}

            {/* System Description */}
            {/* <Container maxWidth="md">
                <Card sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 3 }}>
                    <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}>
                        How It Works
                    </Typography>
                    <Typography 
                        variant="body1" 
                        paragraph
                        sx={{ 
                            lineHeight: 1.8,
                            textAlign: 'justify',
                            fontSize: '1.1rem',
                            color: 'text.secondary'
                        }}
                    >
                        Our Coupon System allows companies to create coupons as part of their promotional and marketing campaigns.
                        The system also has registered customers who can purchase coupons, which are limited in quantity and validity.
                        Each customer is limited to one coupon per type, and the system keeps track of purchased coupons for each customer.
                        The system generates revenue from customer coupon purchases and the creation and updating of new coupons by companies.
                    </Typography>
                </Card>
            </Container> */}
        </Box>
    );
}

export default Home; 