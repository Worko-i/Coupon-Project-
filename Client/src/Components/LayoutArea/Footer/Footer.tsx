import { Box, Typography, Container, Link, IconButton, Tooltip } from '@mui/material';
import { Email, Feedback } from '@mui/icons-material';

function Footer(): JSX.Element {
    const currentYear = new Date().getFullYear();

    const handleFeedbackClick = () => {
        window.open('mailto:worko.itegev@gmail.com?subject=Coupon System Feedback&body=Please share your feedback about the website:', '_blank');
    };

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'grey.900',
                color: 'white',
                py: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                mt: 'auto',
                flexShrink: 0,
                height: '70px',
                display: 'flex',
                alignItems: 'center',
            }}
            role="contentinfo"
        >
            <Container maxWidth={false} sx={{ px: 4 }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    minHeight: '40px',
                }}>
                    {/* Left side - Company info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontWeight: 600,
                                fontSize: '1rem',
                            }}
                        >
                            Coupon System
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                opacity: 0.8,
                                fontSize: '0.875rem',
                            }}
                        >
                            © {currentYear} All rights reserved
                        </Typography>
                    </Box>
                    
                    {/* Right side - Contact and actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Email contact */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Email sx={{ fontSize: 18, opacity: 0.8 }} />
                            <Link 
                                href="mailto:worko.itegev@gmail.com" 
                                color="inherit" 
                                underline="hover"
                                sx={{ 
                                    fontSize: '0.875rem',
                                    opacity: 0.9,
                                    transition: 'opacity 0.3s ease',
                                    '&:hover': {
                                        opacity: 1,
                                    },
                                }}
                                aria-label="Send email to support"
                            >
                                worko.itegev@gmail.com
                            </Link>
                        </Box>

                        {/* Feedback button */}
                        <Tooltip title="Send feedback about the website" arrow>
                            <IconButton
                                onClick={handleFeedbackClick}
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: 1,
                                    px: 1.5,
                                    py: 0.5,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        transform: 'translateY(-1px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                                aria-label="Send feedback"
                                size="small"
                            >
                                <Feedback sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                    Feedback
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
