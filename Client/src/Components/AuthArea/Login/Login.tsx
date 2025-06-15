import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Fade,
    Zoom
} from '@mui/material';
import { Login as LoginIcon, LocalOffer, AdminPanelSettings, Business, Person } from '@mui/icons-material';
import LoginModel from '../../../Models/LoginModel';
import authService from '../../../Services/AuthService';
import { authStore } from '../../../Redux/AuthState';
import ErrorHandler from '../../HandleError/ErrorHandler';

function Login(): JSX.Element{
    const {register, handleSubmit, formState, setError} = useForm<LoginModel>();
    const navigate = useNavigate();

    function login(loginModel: LoginModel): void{
        authService.login(loginModel)
        .then(response =>{

            alert("Login Successful!");
            navigate('/home');
        }).catch((error) =>{
            ErrorHandler.handleErrorResponse(error);
        })
    }

    return(
        <Box
            // sx={{
            //     minHeight: '90vh',
            //     width: '100%',
            //     display: 'flex',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            //     py: 2,
            //     overflow: 'hidden',
            // }}
        >
            <Container maxWidth="sm" sx={{ px: 3 }}>
                <Fade in timeout={800}>
                    <Card 
                        elevation={12} 
                        sx={{ 
                            borderRadius: 4, 
                            overflow: 'hidden',
                            maxWidth: '480px',
                            margin: '0 auto',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                color: 'white',
                                py: 3,
                                textAlign: 'center'
                            }}
                        >
                            <Zoom in timeout={1000}>
                                <Box>
                                    <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                                        Sign In
                                    </Typography>
                                </Box>
                            </Zoom>
                        </Box>

                        <CardContent sx={{ p: 4 }}>
                            <form onSubmit={handleSubmit(login)}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {/* Email Field */}
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        type="email"
                                        {...register("email", {
                                            required: { value: true, message: "Email is required" },
                                            pattern: { 
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                                                message: "Invalid email format" 
                                            }
                                        })}
                                        error={!!formState.errors.email}
                                        helperText={formState.errors.email?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />

                                    {/* Password Field */}
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        {...register("password", {
                                            required: { value: true, message: "Password is required" }
                                        })}
                                        error={!!formState.errors.password}
                                        helperText={formState.errors.password?.message}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />

                                    {/* Client Type Field */}
                                    <FormControl fullWidth error={!!formState.errors.clientType} size="small">
                                        <InputLabel>Client Type</InputLabel>
                                        <Select
                                            label="Client Type"
                                            defaultValue=""
                                            {...register("clientType", {
                                                required: { value: true, message: "Please select a client type" }
                                            })}
                                            sx={{ borderRadius: 2 }}
                                        >
                                            <MenuItem value="" disabled>Select Type</MenuItem>
                                            <MenuItem value="ADMIN">Admin</MenuItem>
                                            <MenuItem value="COMPANY">Company</MenuItem>
                                            <MenuItem value="CUSTOMER">Customer</MenuItem>
                                        </Select>
                                        {formState.errors.clientType && (
                                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                                {formState.errors.clientType.message}
                                            </Typography>
                                        )}
                                    </FormControl>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        startIcon={<LoginIcon />}
                                        sx={{
                                            py: 1,
                                            mt: 1,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Box>
    );
}
export default Login;