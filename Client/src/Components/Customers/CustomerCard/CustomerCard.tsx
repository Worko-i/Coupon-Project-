import { NavLink } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    Box,
    Avatar,
    Chip
} from '@mui/material';
import { ArrowForward, Email } from '@mui/icons-material';
import CustomerModel from '../../../Models/CustomerModel';

function CustomerCard(customerProps: CustomerModel): JSX.Element{
    const fullName = `${customerProps.firstName} ${customerProps.lastName}`;
    const displayName = fullName.length > 16 ? `${fullName.substring(0, 16)}...` : fullName;

    return(
        <Card 
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                },
                borderRadius: 3,
                overflow: 'hidden'
            }}
        >
            {/* Header with gradient */}
            <Box 
                sx={{ 
                    background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                    {customerProps.firstName.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {displayName}
                    </Typography>
                    <Chip 
                        label="Customer" 
                        size="small" 
                        sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            color: 'white',
                            fontSize: '0.7rem'
                        }} 
                    />
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Email sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {customerProps.email}
                    </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Customer ID: {customerProps.id}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    component={NavLink}
                    to={"/customer-details/" + customerProps.id}
                    variant="contained"
                    endIcon={<ArrowForward />}
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        py: 1,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)',
                        }
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}
export default CustomerCard;