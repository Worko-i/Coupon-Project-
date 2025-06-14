import { useForm } from 'react-hook-form';
import CompanyModel from '../../../Models/CompanyModel';
import companyService from '../../../Services/CompanyService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorHandler from '../../HandleError/ErrorHandler';
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
import { Business, Save, Edit } from '@mui/icons-material';
import { authStore } from '../../../Redux/AuthState';

function Company(): JSX.Element {
    const { register, handleSubmit, setValue, formState } = useForm<CompanyModel>();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const isEditMode = !!params.companyId;
    const isAdmin = authStore.getState().user?.clientType === "ADMIN";

    useEffect(() => {
        if (params.companyId) {
            setLoading(true);
            companyService.getSingleCompany(+params.companyId)
                .then((company) => {
                    setValue('name', company.name, { shouldValidate: true });
                    setValue('email', company.email, { shouldValidate: true });
                })
                .catch(error => {
                    ErrorHandler.handleErrorResponse(error);
                    setErrorMessage('Failed to load company data');
                })
                .finally(() => setLoading(false));
        }
    }, [params.companyId, setValue]);

    const [navigationTimer, setNavigationTimer] = useState<NodeJS.Timeout | null>(null);

    // Cleanup effect for navigation timer
    useEffect(() => {
        return () => {
            if (navigationTimer) {
                clearTimeout(navigationTimer);
            }
        };
    }, [navigationTimer]);

    async function sendCompany(company: CompanyModel): Promise<void> {
        try {
            // Clear any existing timer
            if (navigationTimer) {
                clearTimeout(navigationTimer);
                setNavigationTimer(null);
            }

            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            if (isEditMode && params.companyId) {
                // Convert and validate company ID
                const companyId = +params.companyId;
                if (isNaN(companyId) || companyId <= 0) {
                    throw new Error('Invalid company ID for update');
                }
                
                company.id = companyId;
                await companyService.updateCompany(companyId, company);
                setSuccessMessage("Company has been updated successfully!");
                
                // Set new navigation timer with validated ID
                const timer = setTimeout(() => {
                    navigate(`/company-details/${companyId}`);
                }, 1500);
                setNavigationTimer(timer);
            } else {
                const savedCompany = await companyService.addCompany(company);
                
                // Enhanced validation for saved company
                if (!savedCompany || typeof savedCompany.id !== 'number') {
                    throw new Error('Failed to get valid company ID after creation');
                }
                
                setSuccessMessage("Company has been added successfully!");
                
                // Store company ID to ensure it's available for navigation
                const newCompanyId = savedCompany.id;
                
                // Set new navigation timer with stored ID
                const timer = setTimeout(() => {
                    // Double-check ID before navigation
                    if (typeof newCompanyId === 'number') {
                        navigate(`/company-details/${newCompanyId}`);
                    } else {
                        setErrorMessage('Error: Invalid company ID for navigation');
                        navigate('/companies'); // Fallback to companies list
                    }
                }, 1500);
                setNavigationTimer(timer);
            }
        } catch (error: any) {
            ErrorHandler.handleErrorResponse(error);
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('Failed to process company');
            }
        } finally {
            setLoading(false);
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
                                <Business sx={{ fontSize: 60, color: 'white', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
                            </Box>
                            <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 2 }}>
                                {isEditMode ? 'Edit Company' : 'Add New Company'}
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
                                {isEditMode ? 'Update company information below' : 'Enter company details to create a new business account'}
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
                                onSubmit={handleSubmit(sendCompany)}
                                noValidate
                                aria-label={isEditMode ? 'Edit Company Form' : 'Add Company Form'}
                                sx={{ '& .MuiTextField-root': { mb: 3 } }}
                            >
                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    variant="outlined"
                                    placeholder="Enter company name"
                                    {...register("name", {
                                        required: { value: true, message: "Name field is mandatory" }
                                    })}
                                    error={!!formState.errors.name}
                                    helperText={formState.errors.name?.message}
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
                                        },
                                        '& .MuiInputLabel-root': { 
                                            color: '#1976d2',
                                            fontWeight: 600
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { 
                                            color: '#1976d2' 
                                        }
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    placeholder="Enter email address"
                                    {...register("email", {
                                        required: { value: true, message: "Email field is mandatory" },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Email is not valid"
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
                                        },
                                        '& .MuiInputLabel-root': { 
                                            color: '#1976d2',
                                            fontWeight: 600
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { 
                                            color: '#1976d2' 
                                        }
                                    }}
                                />

                                {!isEditMode && (
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        placeholder="Enter password"
                                        {...register("password", {
                                            required: { value: true, message: "Password field is mandatory" }
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
                                            },
                                            '& .MuiInputLabel-root': { 
                                                color: '#1976d2',
                                                fontWeight: 600
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': { 
                                                color: '#1976d2' 
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
                                    aria-label={loading ? 'Processing...' : isEditMode ? 'Update Company' : 'Add Company'}
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : 
                                             isEditMode ? <Edit /> : <Save />}
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
                                    {loading ? 'Processing...' : 
                                     isEditMode ? 'Update Company' : 'Add Company'}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Fade>
        </Container>
    );
}

export default Company;
