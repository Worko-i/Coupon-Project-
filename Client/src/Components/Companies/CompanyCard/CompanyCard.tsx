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
import { Business, ArrowForward, Email } from '@mui/icons-material';
import CompanyModel from '../../../Models/CompanyModel';

function CompanyCard(companyProps: CompanyModel): JSX.Element{
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
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                    <Business />
                </Avatar>
                <Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {companyProps.name.length > 16 ? 
                            `${companyProps.name.substring(0, 16)}...` : 
                            companyProps.name
                        }
                    </Typography>
                    <Chip 
                        label="Company" 
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
                        {companyProps.email}
                    </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Company ID: {companyProps.id}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    component={NavLink}
                    to={"/company-details/" + companyProps.id}
                    variant="contained"
                    endIcon={<ArrowForward />}
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        py: 1,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        }
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}
export default CompanyCard;