import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Fade
} from '@mui/material';
import { Add, People } from '@mui/icons-material';
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
    const customersPerPage = 12; // Changed for better grid layout
    const numberOfRecordsVisited = page * customersPerPage; 
    const totalPages = Math.ceil(customers.length / customersPerPage);
    const [loading, setLoading] = useState<boolean>(true);

    const changePage = ({selected}: any) =>{
        setPage(selected);
    };

    useEffect(() => {
        console.log(customerStore.getState().customerList);
        customerService.getCustomers().then((response) =>{
            console.log(response);
            setCustomers(response);
            setTimeout(() => {
                setLoading(false); 
              }, 1000); 
        }).catch(error =>{
            setLoading(false);
            console.log(error);
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
        <Box>
            {/* Header Section */}
            <Fade in timeout={800}>
                <Paper 
                    elevation={3}
                    sx={{ 
                        background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
                        color: 'white',
                        p: 4,
                        mb: 4,
                        borderRadius: 3,
                        textAlign: 'center'
                    }}
                >
                    <People sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
                        Customers Management
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                        Manage and view all registered customers in the system
                    </Typography>
                    
                    <Button
                        component={NavLink}
                        to="/customers/customer"
                        variant="contained"
                        startIcon={<Add />}
                        size="large"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.3)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Add New Customer
                    </Button>
                </Paper>
            </Fade>

            {/* Customers Grid */}
            {customers.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
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
        </Box>
    );
}

export default Customers;