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

function Company(): JSX.Element {
    const { register, handleSubmit, setValue, formState } = useForm<CompanyModel>();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const isEditMode = !!params.companyId;

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

    function sendCompany(company: CompanyModel): void {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        if (isEditMode && params.companyId) {
            company.id = +params.companyId;
            companyService.updateCompany(company.id, company)
                .then(() => {
                    setSuccessMessage("Company has been updated successfully!");
                    setTimeout(() => {
                        navigate('/company-details/' + company.id);
                    }, 1500);
                })
                .catch(error => {
                    ErrorHandler.handleErrorResponse(error);
                    setErrorMessage('Failed to update company');
                })
                .finally(() => setLoading(false));
        } else {
            companyService.addCompany(company)
                .then(() => {
                    setSuccessMessage("Company has been added successfully!");
                    setTimeout(() => {
                        navigate("/companies");
                    }, 1500);
                })
                .catch(error => {
                    ErrorHandler.handleErrorResponse(error);
                    setErrorMessage('Failed to add company');
                })
                .finally(() => setLoading(false));
        }
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Fade in timeout={600}>
                <Paper
                    elevation={8}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                            backdropFilter: 'blur(10px)',
                            zIndex: 0,
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                            <Business sx={{ fontSize: 40, color: 'white' }} />
                            <Typography variant="h4" component="h1" fontWeight="bold">
                                {isEditMode ? 'Edit Company' : 'Add Company'}
                            </Typography>
                        </Box>

                        {successMessage && (
                            <Alert severity="success" sx={{ mb: 2, '& .MuiAlert-message': { color: 'inherit' } }}>
                                {successMessage}
                            </Alert>
                        )}

                        {errorMessage && (
                            <Alert severity="error" sx={{ mb: 2, '& .MuiAlert-message': { color: 'inherit' } }}>
                                {errorMessage}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit(sendCompany)}
                            sx={{ '& .MuiTextField-root': { mb: 2 } }}
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
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.8)' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' }
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
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                        '&:hover fieldset': { borderColor: 'white' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.8)' },
                                    '& .MuiInputLabel-root.Mui-focused': { color: 'white' }
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
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                            '&:hover fieldset': { borderColor: 'white' },
                                            '&.Mui-focused fieldset': { borderColor: 'white' }
                                        },
                                        '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.8)' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'white' }
                                    }}
                                />
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : 
                                         isEditMode ? <Edit /> : <Save />}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                                    },
                                    '&:disabled': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {loading ? 'Processing...' : 
                                 isEditMode ? 'Update Company' : 'Add Company'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Fade>
        </Container>
    );
}

export default Company