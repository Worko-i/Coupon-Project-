import { NavLink } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    CardActions, 
    Typography, 
    Button, 
    Box,
    Avatar,
    Chip,
    Stack,
    Divider
} from '@mui/material';
import { 
    ArrowForward, 
    Email, 
    Business,
    Badge
} from '@mui/icons-material';
import CompanyModel from '../../../Models/CompanyModel';

function CompanyCard(companyProps: CompanyModel): JSX.Element{
    const displayName = companyProps.name.length > 20 ? `${companyProps.name.substring(0, 20)}...` : companyProps.name;
    const initials = companyProps.name.substring(0, 2).toUpperCase();

    return(
        <Card 
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 30px rgba(25, 118, 210, 0.15)'
                },
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider'
            }}
        >
            {/* Header with gradient */}
            <Box 
                sx={{ 
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    color: 'white',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                    }
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                        sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            color: 'white',
                            width: 56,
                            height: 56,
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            border: '2px solid rgba(255,255,255,0.3)'
                        }}
                    >
                        {initials}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {displayName}
                        </Typography>
                        <Chip 
                            icon={<Business sx={{ fontSize: 14 }} />}
                            label="Company" 
                            size="small" 
                            sx={{ 
                                bgcolor: 'rgba(255,255,255,0.2)', 
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 500,
                                '& .MuiChip-icon': {
                                    color: 'white'
                                }
                            }} 
                        />
                    </Box>
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Stack spacing={2}>
                    {/* Email Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Email sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                Email Address
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    fontWeight: 500
                                }}
                            >
                                {companyProps.email}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Company ID Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Badge sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                Company ID
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                #{companyProps.id}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </CardContent>

            <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                    component={NavLink}
                    to={"/company-details/" + companyProps.id}
                    variant="contained"
                    endIcon={<ArrowForward />}
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}

export default CompanyCard;