import { 
    Box, 
    Typography, 
    Button, 
    Container,
    Paper,
    Stack,
    keyframes,
    Fade
} from '@mui/material';
import { 
    Home, 
    ArrowBack, 
    SearchOff,
    ErrorOutline 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

function PageNotFound(): JSX.Element {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Fade in timeout={800}>
                <Paper
                    elevation={8}
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        {/* 404 Icon */}
                        <Box
                            sx={{
                                mb: 4,
                                animation: `${float} 3s ease-in-out infinite`,
                            }}
                        >
                            <SearchOff
                                sx={{
                                    fontSize: 120,
                                    color: 'primary.main',
                                    mb: 2,
                                    animation: `${pulse} 2s ease-in-out infinite`,
                                }}
                            />
                        </Box>

                        {/* 404 Text */}
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '4rem', md: '6rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2,
                                textShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            404
                        </Typography>

                        {/* Error Message */}
                        <Typography
                            variant="h4"
                            color="text.primary"
                            sx={{ 
                                fontWeight: 700, 
                                mb: 2,
                                fontSize: { xs: '1.75rem', md: '2.125rem' }
                            }}
                        >
                            Oops! Page Not Found
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ 
                                mb: 4, 
                                maxWidth: 500, 
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontSize: { xs: '1rem', md: '1.25rem' }
                            }}
                        >
                            The page you're looking for seems to have gone on vacation. 
                            Don't worry, even our best coupons sometimes get lost!
                        </Typography>

                        {/* Action Buttons */}
                        <Stack 
                            direction={{ xs: 'column', sm: 'row' }} 
                            spacing={2} 
                            justifyContent="center"
                            sx={{ mt: 4 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<Home />}
                                onClick={() => navigate('/home')}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Go Home
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<ArrowBack />}
                                onClick={() => navigate(-1)}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        color: 'white',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Go Back
                            </Button>
                        </Stack>

                        {/* Additional Help Text */}
                        <Box
                            sx={{
                                mt: 6,
                                p: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: 3,
                                border: '1px solid rgba(33, 150, 243, 0.2)',
                            }}
                        >
                            <ErrorOutline sx={{ color: 'info.main', mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                <strong>Need help?</strong> Try checking the URL for typos, or contact our support team if you believe this is an error.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Fade>
        </Container>
    );
}
export default PageNotFound;