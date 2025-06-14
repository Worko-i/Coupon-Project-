import { useEffect, useState } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Grid, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    TextField, 
    Paper,
    Fade,
    Chip,
    Avatar
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { authStore } from '../../../Redux/AuthState';
import CouponModel from '../../../Models/CouponModel';
import customerCouponService from '../../../Services/CustomerCouponService';
import CouponCard from '../CouponCard/CouponCard';
import { categoryStore } from '../../../Redux/CategoryState';
import { couponStore } from '../../../Redux/CouponState';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReactPaginate from 'react-paginate';
import categoryService from '../../../Services/CategoryService';
import ErrorHandler from '../../HandleError/ErrorHandler';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

function CusotmerCoupons(): JSX.Element {

    const [couponsToShow, setCouponsToShow] = useState<CouponModel[]>([]);
    const [selectValue, setSelectValue] = useState<string>("Show All Coupons");
    const [page, setPage] = useState<number>(0); // current page
    const couponPerPage = 14; // coupons per page
    const numberOfRecordsVisited = page * couponPerPage;
    const totalPages = Math.ceil(couponsToShow.length / couponPerPage);
    const [loading, setLoading] = useState<boolean>(true);

    const changePage = ({ selected }: any) => {
        setPage(selected);
    };

    useEffect(() => {

        categoryService.getAllCategories().then((categoriesResponse) => {
        }).catch(error => {
            ErrorHandler.handleErrorResponse(error);
        });

        customerCouponService.getCouponsByCustomer(authStore.getState().user?.id!).then((response) => {
            setCouponsToShow(response);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch(error => {
            setLoading(false);
            ErrorHandler.handleErrorResponse(error);
        });
    }, []);

    useEffect(() => {
        switch (selectValue) {
            case "Show Coupons By Max Price":
                handleOnChange("0") // price is 0
                break;
            case "Show Coupons By Category":
                const categories = categoryStore.getState().categoryList;
                if (categories.length > 0) {
                    handleOnChange(categories[0].name); // show the first category
                }
                break;
            default:
                setCouponsToShow(couponStore.getState().couponList); // show all coupons by default
        }
    }, [selectValue]);

    const handleOnChange = (value: string) => {
        switch (selectValue) {
            case "Show Coupons By Max Price":
                setCouponsToShow(couponStore.getState().couponList.filter(coupon => coupon.price <= parseInt(value)));
                break;
            case "Show Coupons By Category":
                setCouponsToShow(couponStore.getState().couponList.filter(coupon => coupon.category === value));
                break;
        }
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Avatar 
                        sx={{ 
                            bgcolor: 'primary.main', 
                            mr: 2,
                            width: 48,
                            height: 48
                        }}
                    >
                        <PersonIcon />
                    </Avatar>
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        {authStore.getState().user?.firstName}'s Coupons
                    </Typography>
                </Box>
            </Box>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <Fade in timeout={800}>
                    <Box>
                        {/* Filter Controls */}
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                p: 3, 
                                mb: 4, 
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                Filter Your Coupons
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                                    <InputLabel>Filter Type</InputLabel>
                                    <Select
                                        value={selectValue}
                                        onChange={(e) => setSelectValue(e.target.value)}
                                        label="Filter Type"
                                    >
                                        <MenuItem value="Show All Coupons">Show All Coupons</MenuItem>
                                        <MenuItem value="Show Coupons By Category">Show Coupons By Category</MenuItem>
                                        <MenuItem value="Show Coupons By Max Price">Show Coupons By Max Price</MenuItem>
                                    </Select>
                                </FormControl>

                                {selectValue === "Show Coupons By Category" && (
                                    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            onChange={(e) => handleOnChange(e.target.value as string)}
                                            label="Category"
                                            defaultValue=""
                                        >
                                            {categoryStore.getState().categoryList.map(category => (
                                                <MenuItem key={category.id} value={category.name}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                {selectValue === "Show Coupons By Max Price" && (
                                    <TextField
                                        type="number"
                                        label="Max Price"
                                        variant="outlined"
                                        defaultValue={0}
                                        onChange={(e) => handleOnChange(e.target.value)}
                                        sx={{ minWidth: 150 }}
                                        InputProps={{
                                            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                                        }}
                                    />
                                )}
                            </Box>
                            
                            <Box sx={{ mt: 2 }}>
                                <Chip 
                                    label={`${couponsToShow.length} coupon${couponsToShow.length !== 1 ? 's' : ''} found`}
                                    color="primary"
                                    variant="outlined"
                                />
                            </Box>
                        </Paper>

                        {/* Coupons Grid */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {couponsToShow.slice(numberOfRecordsVisited, numberOfRecordsVisited + couponPerPage).map(coupon => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={coupon.id}>
                                    <CouponCard {...coupon} />
                                </Grid>
                            ))}
                        </Grid>

                        {/* No Coupons Message */}
                        {couponsToShow.length === 0 && (
                            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                                <Typography variant="h6" color="text.secondary">
                                    You don't have any coupons yet
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Start browsing available coupons to make your first purchase!
                                </Typography>
                            </Paper>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                mt: 4,
                                '& .pagination': {
                                    display: 'flex',
                                    listStyle: 'none',
                                    padding: 0,
                                    gap: 1,
                                    alignItems: 'center'
                                },
                                '& .pagination li': {
                                    margin: 0
                                },
                                '& .pagination li a': {
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0',
                                    backgroundColor: 'white',
                                    color: '#666',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '40px',
                                    height: '40px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        borderColor: '#2196F3'
                                    }
                                },
                                '& .pagination li.active a': {
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    borderColor: '#2196F3'
                                },
                                '& .pagination li.disabled a': {
                                    opacity: 0.5,
                                    pointerEvents: 'none'
                                }
                            }}>
                                <ReactPaginate
                                    previousLabel={<ArrowBackIosIcon style={{ fontSize: 18 }} />}
                                    nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18 }} />}
                                    pageCount={totalPages}
                                    onPageChange={changePage}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"item previous"}
                                    nextLinkClassName={"item next"}
                                    disabledClassName={"disabled-page"}
                                    activeClassName={"item active"}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={2}
                                />
                            </Box>
                        )}
                    </Box>
                </Fade>
            )}
        </Container>
    );
}

export default CusotmerCoupons