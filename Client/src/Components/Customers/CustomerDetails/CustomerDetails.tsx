import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Avatar,
    Chip,
    Divider,
    Card,
    CardContent,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Fade,
    Breadcrumbs,
    Link,
    Grid
} from '@mui/material';
import {
    Person,
    Email,
    Edit,
    Delete,
    ArrowBack,
    AdminPanelSettings,
    Home
} from '@mui/icons-material';
import { authStore } from '../../../Redux/AuthState';
import CustomerModel from '../../../Models/CustomerModel';
import customerService from '../../../Services/CustomerService';
import ErrorHandler from '../../HandleError/ErrorHandler';


function CustomerDetails(): JSX.Element {
    const params = useParams();
    const navigator = useNavigate();
    const customerId = +params.customerId!;
    const [customer, setCustomer] = useState<CustomerModel>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const currentUser = authStore.getState().user;
    const isCustomerView = currentUser?.clientType === "CUSTOMER";
    const isAdmin = currentUser?.clientType === "ADMIN";

    useEffect(() => {
        if (!isCustomerView) {
            customerService.getSingleCustomer(customerId)
                .then((response) => {
                    setCustomer(response);
                    setLoading(false);
                })
                .catch(error => {
                    ErrorHandler.handleErrorResponse(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [customerId, isCustomerView]);

    function handleDeleteCustomer() {
        setLoading(true);
        customerService.deleteCustomer(customerId)
            .then(() => {
                alert("Customer Has Been Deleted Successfully!");
                navigator('/customers');
            })
            .catch(error => {
                ErrorHandler.handleErrorResponse(error);
                setLoading(false);
            });
    }

    const displayUser = isCustomerView ? currentUser : customer;
    const fullName = isCustomerView 
        ? `${currentUser?.firstName} ${currentUser?.lastName}`
        : `${customer?.firstName} ${customer?.lastName}`;

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                    <Typography>Loading...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    component={NavLink}
                    to="/home"
                    underline="hover"
                    color="inherit"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                    <Home sx={{ fontSize: 20 }} />
                    Home
                </Link>
                {!isCustomerView && (
                    <Link
                        component={NavLink}
                        to="/customers"
                        underline="hover"
                        color="inherit"
                    >
                        Customers
                    </Link>
                )}
                <Typography color="text.primary">
                    {isCustomerView ? 'My Profile' : 'Customer Details'}
                </Typography>
            </Breadcrumbs>

            {/* Header */}
            <Fade in timeout={600}>
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #9c27b0 0%, #e1bee7 100%)',
                        color: 'white',
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
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                fontSize: '2.5rem',
                                fontWeight: 700,
                                mx: 'auto',
                                mb: 2,
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                border: '3px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            {fullName && fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </Avatar>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                            {fullName}
                        </Typography>
                        <Chip
                            icon={isCustomerView ? <Person /> : <AdminPanelSettings />}
                            label={isCustomerView ? 'My Profile' : 'Customer Profile'}
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontWeight: 500,
                                '& .MuiChip-icon': { color: 'white' }
                            }}
                        />
                    </Box>
                </Paper>
            </Fade>

            {/* Main Content */}
            <Grid container spacing={4}>
                {/* Customer Information */}
                <Grid item xs={12} md={8}>
                    <Fade in timeout={800}>
                        <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                                    Personal Information
                                </Typography>
                                
                                <Stack spacing={3}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                                bgcolor: 'primary.light',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Person sx={{ fontSize: 24 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Full Name
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                {fullName}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider />

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                                bgcolor: 'secondary.light',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Email sx={{ fontSize: 24 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Email Address
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                {displayUser?.email}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {!isCustomerView && customer && (
                                        <>
                                            <Divider />
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box
                                                    sx={{
                                                        p: 1.5,
                                                        borderRadius: 2,
                                                        bgcolor: 'success.light',
                                                        color: 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <AdminPanelSettings sx={{ fontSize: 24 }} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Customer ID
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                        #{customer.id}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Fade>
                </Grid>

                {/* Actions Panel */}
                <Grid item xs={12} md={4}>
                    <Fade in timeout={1000}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                                    Actions
                                </Typography>
                                
                                <Stack spacing={2}>
                                    <Button
                                        component={NavLink}
                                        to={isCustomerView ? '/home' : '/customers'}
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<ArrowBack />}
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontWeight: 500
                                        }}
                                    >
                                        {isCustomerView ? 'Back to Dashboard' : 'Back to Customers'}
                                    </Button>

                                    {isAdmin && !isCustomerView && (
                                        <>
                                            <Button
                                                component={NavLink}
                                                to={`/customers/customer/${customerId}`}
                                                variant="contained"
                                                fullWidth
                                                startIcon={<Edit />}
                                                sx={{
                                                    py: 1.5,
                                                    borderRadius: 2,
                                                    fontWeight: 500,
                                                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                                }}
                                            >
                                                Edit Customer
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="error"
                                                fullWidth
                                                startIcon={<Delete />}
                                                onClick={() => setDeleteDialogOpen(true)}
                                                sx={{
                                                    py: 1.5,
                                                    borderRadius: 2,
                                                    fontWeight: 500
                                                }}
                                            >
                                                Delete Customer
                                            </Button>
                                        </>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Fade>
                </Grid>
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: 600 }}>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this customer? This action cannot be undone and will
                        remove all associated data.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3, gap: 1 }}>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteCustomer}
                        variant="contained"
                        color="error"
                        autoFocus
                    >
                        Delete Customer
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
export default CustomerDetails;
