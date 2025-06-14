import { useForm } from 'react-hook-form';
import CustomerModel from '../../../Models/CustomerModel';
import customerService from '../../../Services/CustomerService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorHandler from '../../HandleError/ErrorHandler';
import { authStore } from '../../../Redux/AuthState';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    Fade
} from '@mui/material';
import { PersonAdd, Save, Edit } from '@mui/icons-material';

function Customer(): JSX.Element {
    const { register, handleSubmit, setValue, formState } = useForm<CustomerModel>();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const isEditMode = !!params.customerId;
    const isAdmin = authStore.getState().user?.clientType === "ADMIN";

    useEffect(() => {
        if (params.customerId) {
            setLoading(true);
            customerService.getSingleCustomer(+params.customerId)
                .then((customer) => {
                    setValue('firstName', customer.firstName, { shouldValidate: true });
                    setValue('lastName', customer.lastName, { shouldValidate: true });
                    setValue('email', customer.email, { shouldValidate: true });
                })
                .catch(error => {
                    ErrorHandler.handleErrorResponse(error);
                    setErrorMessage('Failed to load customer data');
                })
                .finally(() => setLoading(false));
        }
    }, [params.customerId, setValue]);

    function sendCustomer(customer: CustomerModel): void {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        if (isEditMode && params.customerId) {
            const customerId = +params.customerId;
            customer.id = customerId;
            customerService.updateCustomer(customerId, customer)
                .then(() => {
                    setSuccessMessage("Customer has been updated successfully!");
                    if (isAdmin && customerId) {
                        setTimeout(() => {
                            navigate(`/customer-details/${customerId}`);
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            navigate("/customers");
                        }, 1500);
                    }
                })
                .catch(error => {
                    ErrorHandler.handleErrorResponse(error);
                    setErrorMessage('Failed to update customer');
                })
                .finally(() => setLoading(false));
        } else {
            customerService.addCustomer(customer)
                .then((savedCustomer) => {
                    setSuccessMessage("Customer has been added successfully!");
                    if (isAdmin && savedCustomer && savedCustomer.id) {
                        setTimeout(() => {
                            navigate(`/customer-details/${savedCustomer.id}`);
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            navigate("/customers");
                        }, 1500);
                    }
                })
                .catch(error => {
                    ErrorHandler.handleErrorResponse(error);
                    setErrorMessage('Failed to add customer');
                })
                .finally(() => setLoading(false));
        }
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Fade in timeout={800}>
                <Box>
                    {/* Enhanced Hero Section */}
                    <Paper
                        elevation={12}
                        sx={{
                            p: 6,
                            mb: 4,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #e3f2fd 100%)',
                            color: 'white',
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
                                backdropFilter: 'blur(15px)',
                                zIndex: 0,
                            }
                        }}
                    >
                        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                <PersonAdd sx={{ fontSize: 60, color: 'white', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
                            </Box>
                            <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 2 }}>
                                {isEditMode ? 'Edit Customer' : 'Add New Customer'}
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
                                {isEditMode ? 'Update customer information below' : 'Enter customer details to create a new account'}
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Form Section */}
                    <Paper
                        elevation={8}
                        sx={{
                            p: 5,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
                            border: '1px solid rgba(25, 118, 210, 0.1)',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 4,
                                zIndex: 0
                            }
                        }}
                    >
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            {successMessage && (
                                <Alert 
                                    severity="success" 
                                    sx={{ 
                                        mb: 3, 
                                        borderRadius: 2,
                                        '& .MuiAlert-message': { fontWeight: 600 }
                                    }}
                                >
                                    {successMessage}
                                </Alert>
                            )}

                            {errorMessage && (
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        mb: 3, 
                                        borderRadius: 2,
                                        '& .MuiAlert-message': { fontWeight: 600 }
                                    }}
                                >
                                    {errorMessage}
                                </Alert>
                            )}

                            <Box
                                component="form"
                                onSubmit={handleSubmit(sendCustomer)}
                                sx={{ '& .MuiTextField-root': { mb: 3 } }}
                            >
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    variant="outlined"
                                    placeholder="Enter first name"
                                    {...register("firstName", {
                                        required: { value: true, message: "First name is required" }
                                    })}
                                    error={!!formState.errors.firstName}
                                    helperText={formState.errors.firstName?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'white',
                                            borderRadius: 2,
                                            '& fieldset': { 
                                                borderColor: 'rgba(25, 118, 210, 0.2)',
                                                borderWidth: 2
                                            },
                                            '&:hover fieldset': { 
                                                borderColor: 'rgba(25, 118, 210, 0.5)' 
                                            },
                                            '&.Mui-focused fieldset': { 
                                                borderColor: '#1976d2',
                                                borderWidth: 2
                                            }
                                        }
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                    placeholder="Enter last name"
                                    {...register("lastName", {
                                        required: { value: true, message: "Last name is required" }
                                    })}
                                    error={!!formState.errors.lastName}
                                    helperText={formState.errors.lastName?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'white',
                                            borderRadius: 2,
                                            '& fieldset': { 
                                                borderColor: 'rgba(25, 118, 210, 0.2)',
                                                borderWidth: 2
                                            },
                                            '&:hover fieldset': { 
                                                borderColor: 'rgba(25, 118, 210, 0.5)' 
                                            },
                                            '&.Mui-focused fieldset': { 
                                                borderColor: '#1976d2',
                                                borderWidth: 2
                                            }
                                        }
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    placeholder="Enter email address"
                                    {...register("email", {
                                        required: { value: true, message: "Email is required" },
                                        pattern: { 
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                                            message: "Invalid email address" 
                                        }
                                    })}
                                    error={!!formState.errors.email}
                                    helperText={formState.errors.email?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'white',
                                            borderRadius: 2,
                                            '& fieldset': { 
                                                borderColor: 'rgba(25, 118, 210, 0.2)',
                                                borderWidth: 2
                                            },
                                            '&:hover fieldset': { 
                                                borderColor: 'rgba(25, 118, 210, 0.5)' 
                                            },
                                            '&.Mui-focused fieldset': { 
                                                borderColor: '#1976d2',
                                                borderWidth: 2
                                            }
                                        }
                                    }}
                                />

                                {!isEditMode && (
                                    <TextField
                                        fullWidth
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        placeholder="Enter password"
                                        {...register("password", {
                                            required: { value: true, message: "Password is required" },
                                            minLength: { value: 4, message: "Password must be at least 4 characters" }
                                        })}
                                        error={!!formState.errors.password}
                                        helperText={formState.errors.password?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white',
                                                borderRadius: 2,
                                                '& fieldset': { 
                                                    borderColor: 'rgba(25, 118, 210, 0.2)',
                                                    borderWidth: 2
                                                },
                                                '&:hover fieldset': { 
                                                    borderColor: 'rgba(25, 118, 210, 0.5)' 
                                                },
                                                '&.Mui-focused fieldset': { 
                                                    borderColor: '#1976d2',
                                                    borderWidth: 2
                                                }
                                            }
                                        }}
                                    />
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : isEditMode ? <Edit /> : <Save />}
                                    sx={{
                                        mt: 4,
                                        py: 2,
                                        borderRadius: 3,
                                        fontWeight: 700,
                                        fontSize: '1.2rem',
                                        textTransform: 'none',
                                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 10px 30px rgba(25, 118, 210, 0.4)'
                                        },
                                        '&:disabled': {
                                            background: 'linear-gradient(45deg, #bdbdbd 30%, #e0e0e0 90%)',
                                            color: 'rgba(255, 255, 255, 0.7)'
                                        },
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    {loading ? 'Processing...' : isEditMode ? 'Update Customer' : 'Add Customer'}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Fade>
        </Container>
    );
}

export default Customer;