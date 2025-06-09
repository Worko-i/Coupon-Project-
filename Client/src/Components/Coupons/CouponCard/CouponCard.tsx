import { NavLink } from 'react-router-dom';
import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions, 
    Typography, 
    Chip, 
    Box,
    IconButton,
    Fade 
} from '@mui/material';
import { Visibility, AccessTime, AttachMoney } from '@mui/icons-material';
import CouponModel from '../../../Models/CouponModel';
import couponImage from '../../../Images/couponImage.png';

function CouponCard(couponProps: CouponModel): JSX.Element{

    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('he-IL');
    };

    return(
        <Fade in timeout={600}>
            <Card 
                sx={{ 
                    maxWidth: 345,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                    },
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
                component={NavLink}
                to={`/coupon-details/${couponProps.id}`}
                style={{ textDecoration: 'none' }}
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={couponImage}
                    alt={couponProps.title}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="div"
                        sx={{ 
                            fontWeight: 600,
                            lineHeight: 1.3,
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {couponProps.title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.5em'
                        }}
                    >
                        {couponProps.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                            icon={<AttachMoney />}
                            label={`$${couponProps.price}`}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 600 }}
                        />
                        <Chip
                            icon={<AccessTime />}
                            label={formatDate(couponProps.endDate)}
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                    <IconButton 
                        size="small" 
                        color="primary"
                        sx={{ 
                            '&:hover': { 
                                backgroundColor: 'primary.main',
                                color: 'white'
                            } 
                        }}
                    >
                        <Visibility />
                    </IconButton>
                </CardActions>
            </Card>
        </Fade>
    );
}
export default CouponCard;