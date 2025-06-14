import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    Grid, 
    Divider,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Fade,
    Alert
} from '@mui/material';
import { 
    Edit as EditIcon, 
    Delete as DeleteIcon, 
    ShoppingCart as ShoppingCartIcon,
    Category as CategoryIcon,
    AttachMoney as MoneyIcon,
    Inventory as InventoryIcon,
    CalendarToday as CalendarIcon,
    AccessTime as TimeIcon
} from '@mui/icons-material';
import CouponModel from '../../../Models/CouponModel';
import { useEffect, useState } from 'react';
import couponService from '../../../Services/CouponService';
import { authStore } from '../../../Redux/AuthState';
import customerCouponService from '../../../Services/CustomerCouponService';
import ErrorHandler from '../../HandleError/ErrorHandler';


function CouponDetails(): JSX.Element {

    const params = useParams();
    const navigator = useNavigate();
    const couponId = +params.couponId!;
    const [coupon, setCoupon] = useState<CouponModel>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [buyDialogOpen, setBuyDialogOpen] = useState(false);

    useEffect(() => {
        couponService.getSingleCoupon(couponId).then((response) => {
            setCoupon(response);
        }).catch(error => {
            ErrorHandler.handleErrorResponse(error);
        });
    }, []);

    function deleteCoupon() {
        couponService.deleteCoupon(couponId).then((response) => {
            navigator('/coupons')
        }).catch(error => {
            ErrorHandler.handleErrorResponse(error);
        });
        setDeleteDialogOpen(false);
    }

    function buyCoupon() {
        customerCouponService.purchaseCoupon(authStore.getState().user!.id, couponId).then(response => {
            navigator('/customer/coupons')
        }).catch(error => {
            ErrorHandler.handleErrorResponse(error);
        });
        setBuyDialogOpen(false);
    }

    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('he-IL');
    };

    const isExpired = coupon && new Date(coupon.endDate) < new Date();
    const isOutOfStock = coupon && coupon.amount <= 0;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {coupon && (
                <Fade in timeout={800}>
                    <Box>
                        {/* Header */}
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom
                            sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textAlign: 'center',
                                mb: 4
                            }}
                        >
                            {coupon.title}
                        </Typography>

                        {/* Status Alerts */}
                        {isExpired && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                This coupon has expired
                            </Alert>
                        )}
                        {isOutOfStock && (
                            <Alert severity="warning" sx={{ mb: 3 }}>
                                This coupon is out of stock
                            </Alert>
                        )}

                        <Grid container spacing={4}>
                            {/* Main Details Card */}
                            <Grid item xs={12} md={8}>
                                <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                            Coupon Details
                                        </Typography>
                                        
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                                Description
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                                                {coupon.description}
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ my: 3 }} />

                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <CategoryIcon sx={{ mr: 2, color: 'primary.main' }} />
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Category
                                                        </Typography>
                                                        <Typography variant="body1" fontWeight={500}>
                                                            {coupon.category}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <MoneyIcon sx={{ mr: 2, color: 'success.main' }} />
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Price
                                                        </Typography>
                                                        <Typography variant="h6" fontWeight={600} color="success.main">
                                                            ${coupon.price}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <InventoryIcon sx={{ mr: 2, color: 'warning.main' }} />
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Amount Left
                                                        </Typography>
                                                        <Typography variant="body1" fontWeight={500}>
                                                            {coupon.amount}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <CalendarIcon sx={{ mr: 2, color: 'info.main' }} />
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Start Date
                                                        </Typography>
                                                        <Typography variant="body1" fontWeight={500}>
                                                            {formatDate(coupon.startDate)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <TimeIcon sx={{ mr: 2, color: isExpired ? 'error.main' : 'info.main' }} />
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            End Date
                                                        </Typography>
                                                        <Typography 
                                                            variant="body1" 
                                                            fontWeight={500}
                                                            color={isExpired ? 'error.main' : 'inherit'}
                                                        >
                                                            {formatDate(coupon.endDate)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Actions Card */}
                            <Grid item xs={12} md={4}>
                                <Card elevation={3} sx={{ borderRadius: 3, position: 'sticky', top: 20 }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                            Actions
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            {authStore.getState().user?.clientType === 'COMPANY' && (
                                                <>
                                                    <Button
                                                        component={NavLink}
                                                        to={`/coupons/coupon/${coupon.id}`}
                                                        variant="contained"
                                                        startIcon={<EditIcon />}
                                                        fullWidth
                                                        sx={{
                                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                                            py: 1.5,
                                                            fontWeight: 600,
                                                            textTransform: 'none'
                                                        }}
                                                    >
                                                        Edit Coupon
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => setDeleteDialogOpen(true)}
                                                        fullWidth
                                                        sx={{ py: 1.5, fontWeight: 600, textTransform: 'none' }}
                                                    >
                                                        Delete Coupon
                                                    </Button>
                                                </>
                                            )}

                                            {authStore.getState().user?.clientType === 'CUSTOMER' && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    startIcon={<ShoppingCartIcon />}
                                                    onClick={() => setBuyDialogOpen(true)}
                                                    disabled={isExpired || isOutOfStock}
                                                    fullWidth
                                                    sx={{
                                                        background: !isExpired && !isOutOfStock 
                                                            ? 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)' 
                                                            : undefined,
                                                        py: 1.5,
                                                        fontWeight: 600,
                                                        textTransform: 'none',
                                                        fontSize: '1.1rem'
                                                    }}
                                                >
                                                    {isExpired ? 'Expired' : isOutOfStock ? 'Out of Stock' : 'Buy Coupon'}
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Delete Confirmation Dialog */}
                        <Dialog
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            maxWidth="sm"
                            fullWidth
                        >
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this coupon? This action cannot be undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ p: 3, gap: 1 }}>
                                <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
                                    Cancel
                                </Button>
                                <Button onClick={deleteCoupon} variant="contained" color="error">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* Buy Confirmation Dialog */}
                        <Dialog
                            open={buyDialogOpen}
                            onClose={() => setBuyDialogOpen(false)}
                            maxWidth="sm"
                            fullWidth
                        >
                            <DialogTitle>Confirm Purchase</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to buy this coupon for ${coupon.price}?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ p: 3, gap: 1 }}>
                                <Button onClick={() => setBuyDialogOpen(false)} variant="outlined">
                                    Cancel
                                </Button>
                                <Button onClick={buyCoupon} variant="contained" color="success">
                                    Buy Now
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Fade>
            )}
        </Container>
    );
}
export default CouponDetails;
