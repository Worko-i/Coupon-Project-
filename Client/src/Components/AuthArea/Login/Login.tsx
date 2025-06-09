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
import { Login as LoginIcon, LocalOffer } from '@mui/icons-material';
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
            console.log(authStore.getState().user?.id);
            alert("Login Successful!");
            navigate('/home');
        }).catch((error) =>{
            ErrorHandler.handleErrorResponse(error);
        })
    }

    return(
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                py: 4
            }}
        >
            <Container maxWidth="sm">
                <Fade in timeout={800}>
                    <Card elevation={10} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        {/* Header */}
                        <Box
                            sx={{
                                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                color: 'white',
                                py: 4,
                                textAlign: 'center'
                            }}
                        >
                            <Zoom in timeout={1000}>
                                <Box>
                                    <LocalOffer sx={{ fontSize: 48, mb: 2 }} />
                                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                                        Welcome Back
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                                        Sign in to access your coupon system
                                    </Typography>
                                </Box>
                            </Zoom>
                        </Box>

                        <CardContent sx={{ p: 4 }}>
                            <form onSubmit={handleSubmit(login)}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {/* Email Field */}
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        type="email"
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
                                                borderRadius: 2,
                                            }
                                        }}
                                    />

                                    {/* Password Field */}
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        {...register("password", {
                                            required: { value: true, message: "Password field is mandatory" }
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
                                    <FormControl fullWidth error={!!formState.errors.clientType}>
                                        <InputLabel>Client Type</InputLabel>
                                        <Select
                                            label="Client Type"
                                            defaultValue=""
                                            {...register("clientType", {
                                                required: { value: true, message: "Client Type field is mandatory" }
                                            })}
                                            sx={{ borderRadius: 2 }}
                                        >
                                            <MenuItem value="" disabled>Please Select Client Type</MenuItem>
                                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                                            <MenuItem value="COMPANY">COMPANY</MenuItem>
                                            <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                                        </Select>
                                        {formState.errors.clientType && (
                                            <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
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
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                                            },
                                            transition: 'all 0.3s ease'
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