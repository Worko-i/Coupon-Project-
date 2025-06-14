import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Fade,
    Container
} from '@mui/material';
import { 
    People, 
    PersonAdd
} from '@mui/icons-material';
import CustomerModel from '../../Models/CustomerModel';
import customerService from '../../Services/CustomerService';
import CustomerCard from './CustomerCard/CustomerCard';
import { customerStore } from '../../Redux/CustomerState';
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorHandler from '../HandleError/ErrorHandler';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Customers(): JSX.Element{
    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const [page, setPage] = useState<number>(0);
    const customersPerPage = 12;
    const numberOfRecordsVisited = page * customersPerPage; 
    const totalPages = Math.ceil(customers.length / customersPerPage);
    const [loading, setLoading] = useState<boolean>(true);

    const changePage = ({selected}: any) =>{
        setPage(selected);
    };

    useEffect(() => {
        customerService.getCustomers().then((response) =>{
            setCustomers(response);
            setTimeout(() => {
                setLoading(false); 
            }, 1000); 
        }).catch(error =>{
            setLoading(false);
            ErrorHandler.handleErrorResponse(error);
        });
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <LoadingSpinner />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Hero Section */}
            <Fade in timeout={800}>
                <Paper 
                    elevation={6}
                    sx={{ 
                        background: 'linear-gradient(135deg, #9c27b0 0%, #e1bee7 100%)',
                        color: 'white',
                        p: 6,
                        mb: 4,
                        borderRadius: 4,
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
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <People sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
                        <Typography 
                            variant="h2" 
                            component="h1" 
                            sx={{ 
                                fontWeight: 800,
                                mb: 2,
                                fontSize: { xs: '2.5rem', md: '3.5rem' }
                            }}
                        >
                            Customer Management
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mb: 4, 
                                opacity: 0.9,
                                maxWidth: 600,
                                mx: 'auto'
                            }}
                        >
                            Manage your customer base with comprehensive tools for 
                            tracking, analytics, and engagement.
                        </Typography>
                        
                        <Button
                            component={NavLink}
                            to="/customers/customer"
                            variant="contained"
                            startIcon={<PersonAdd />}
                            size="large"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                border: '2px solid rgba(255,255,255,0.3)',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Add New Customer
                        </Button>
                    </Box>
                </Paper>
            </Fade>

            {/* Customers Grid */}
            {customers.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                    <Typography variant="h6" color="text.secondary">
                        No customers found
                    </Typography>
                </Paper>
            ) : (
                <>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {customers
                            .slice(numberOfRecordsVisited, numberOfRecordsVisited + customersPerPage)
                            .map((customer, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={customer.id}>
                                    <Fade in timeout={800 + index * 100}>
                                        <div>
                                            <CustomerCard {...customer} />
                                        </div>
                                    </Fade>
                                </Grid>
                            ))}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            '& .pagination': {
                                display: 'flex',
                                listStyle: 'none',
                                gap: 1,
                                p: 0,
                                '& .item': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    backgroundColor: 'background.paper',
                                    color: 'text.primary',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'secondary.light',
                                        color: 'white',
                                        transform: 'translateY(-1px)',
                                    },
                                    '&.active': {
                                        backgroundColor: 'secondary.main',
                                        color: 'white',
                                        borderColor: 'secondary.main',
                                    },
                                    '&.disabled-page': {
                                        opacity: 0.5,
                                        cursor: 'not-allowed',
                                        '&:hover': {
                                            backgroundColor: 'background.paper',
                                            color: 'text.primary',
                                            transform: 'none',
                                        },
                                    },
                                },
                            }
                        }}>
                            <ReactPaginate
                                previousLabel={<ArrowBackIosIcon style={{ fontSize: 18 }} />}
                                nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18 }} />}
                                pageCount={totalPages}
                                onPageChange={changePage}
                                containerClassName={'pagination'}
                                previousLinkClassName={'item previous'}
                                nextLinkClassName={'item next'}
                                disabledClassName={'disabled-page'}
                                activeClassName={'item active'}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                            />
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
}

export default Customers;
