import { NavLink } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    Box,
    Avatar,
    Chip,
    Stack,
    Divider
} from '@mui/material';
import { 
    ArrowForward, 
    AccessTime, 
    AttachMoney, 
    LocalOffer,
    Badge
} from '@mui/icons-material';
import CouponModel from '../../../Models/CouponModel';

function CouponCard(couponProps: CouponModel): JSX.Element{
    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getDaysUntilExpiration = (endDate: Date | string) => {
        const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
        const today = new Date();
        const diffTime = end.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysLeft = getDaysUntilExpiration(couponProps.endDate);
    const isExpiringSoon = daysLeft <= 7 && daysLeft > 0;
    const isExpired = daysLeft <= 0;
    
    const displayTitle = couponProps.title.length > 20 ? `${couponProps.title.substring(0, 20)}...` : couponProps.title;
    const initials = couponProps.title.substring(0, 2).toUpperCase();

    return(
        <Card 
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: isExpired ? '0 8px 20px rgba(0,0,0,0.1)' : '0 12px 30px rgba(76, 175, 80, 0.15)'
                },
                borderRadius: 3,
                overflow: 'hidden',
                border: isExpired ? '2px solid #f44336' : isExpiringSoon ? '2px solid #ff9800' : '1px solid',
                borderColor: isExpired ? '#f44336' : isExpiringSoon ? '#ff9800' : 'divider',
                opacity: isExpired ? 0.7 : 1
            }}
        >
            {/* Header with gradient */}
            <Box 
                sx={{ 
                    background: isExpired ? 'linear-gradient(135deg, #f44336 0%, #ff8a80 100%)' : 
                              isExpiringSoon ? 'linear-gradient(135deg, #ff9800 0%, #ffcc80 100%)' :
                              'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                    color: 'white',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                    }
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                        sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            color: 'white',
                            width: 56,
                            height: 56,
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            border: '2px solid rgba(255,255,255,0.3)'
                        }}
                    >
                        {initials}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {displayTitle}
                        </Typography>
                        <Chip 
                            icon={<LocalOffer sx={{ fontSize: 14 }} />}
                            label={isExpired ? 'Expired' : isExpiringSoon ? `${daysLeft} days left` : 'Active'} 
                            size="small" 
                            sx={{ 
                                bgcolor: 'rgba(255,255,255,0.2)', 
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 500,
                                '& .MuiChip-icon': {
                                    color: 'white'
                                }
                            }} 
                        />
                    </Box>
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Stack spacing={2}>
                    {/* Price Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <AttachMoney sx={{ color: 'success.main', fontSize: 20 }} />
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                Price
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontWeight: 600,
                                    color: isExpired ? 'text.disabled' : 'success.main',
                                    fontSize: '1.1rem'
                                }}
                            >
                                ${couponProps.price}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Category Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Badge sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                Category
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontWeight: 500,
                                    color: isExpired ? 'text.disabled' : 'text.primary'
                                }}
                            >
                                {couponProps.category || 'General'}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Expiration Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <AccessTime sx={{ 
                            color: isExpired ? 'error.main' : isExpiringSoon ? 'warning.main' : 'info.main', 
                            fontSize: 20 
                        }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                Expires On
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontWeight: 500,
                                    color: isExpired ? 'error.main' : isExpiringSoon ? 'warning.main' : 'text.primary'
                                }}
                            >
                                {formatDate(couponProps.endDate)}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </CardContent>

            <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                    component={NavLink}
                    to={`/coupon-details/${couponProps.id}`}
                    variant="contained"
                    endIcon={<ArrowForward />}
                    fullWidth
                    disabled={isExpired}
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                        background: isExpired ? 'linear-gradient(45deg, #bdbdbd 30%, #e0e0e0 90%)' :
                                   isExpiringSoon ? 'linear-gradient(45deg, #ff9800 30%, #ffcc80 90%)' :
                                   'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        '&:hover': {
                            background: isExpired ? 'linear-gradient(45deg, #bdbdbd 30%, #e0e0e0 90%)' :
                                       isExpiringSoon ? 'linear-gradient(45deg, #f57c00 30%, #ff9800 90%)' :
                                       'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
                            transform: isExpired ? 'none' : 'translateY(-1px)',
                            boxShadow: isExpired ? 'none' : '0 4px 12px rgba(76, 175, 80, 0.3)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    {isExpired ? 'Expired' : 'View Details'}
                </Button>
            </CardActions>
        </Card>
    );
}

export default CouponCard;
