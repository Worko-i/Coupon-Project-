import { useForm } from 'react-hook-form';
import { 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Button, 
    Box, 
    Grid,
    Fade
} from '@mui/material';
import { Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import CouponModel from '../../../Models/CouponModel';
import couponService from '../../../Services/CouponService';
import { useEffect, useState } from 'react';
import categoryService from '../../../Services/CategoryService';
import CategoryModel from '../../../Models/CategoryModel';
import { categoryStore } from '../../../Redux/CategoryState';
import { couponStore } from '../../../Redux/CouponState';
import ErrorHandler from '../../HandleError/ErrorHandler';

function Coupon(): JSX.Element {

    const { register, handleSubmit, setValue, formState } = useForm<CouponModel>();
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        categoryService.getAllCategories().then((categoriesResponse) => {
            setCategories(categoriesResponse);
        }).catch(error =>{
            ErrorHandler.handleErrorResponse(error);
        })        
    },[]);

    useEffect(()=>{
        if(params.couponId){
            const couponId = +params.couponId;
            const couponFromState: CouponModel = couponStore.getState().couponList.find(coupon => coupon.id === couponId)!;
            setValue('title', couponFromState.title, {shouldValidate: true});
            setValue('description', couponFromState.description, {shouldValidate: true}); 
            setValue('category', couponFromState.category, { shouldValidate: false });   
            setValue('startDate', couponFromState.startDate, {shouldValidate: true});
            setValue('endDate', couponFromState.endDate, {shouldValidate: true});
            setValue('amount', couponFromState.amount, {shouldValidate: true});
            setValue('price', couponFromState.price, {shouldValidate: true});
            setValue('image', couponFromState.image, {shouldValidate: true});
            console.log(couponFromState.category);
            console.log(categories);
        }
    },[categories])


    function sendCoupon(coupon: CouponModel): void {
        console.log(coupon);
        if(params.couponId){
            coupon.id = +params.couponId;
            console.log(coupon);
            couponService.updateCoupon(coupon.id, coupon).then(response => {
                alert("The Coupon Has Been Updated Successfully");
                navigate('/coupon-details/'+ coupon.id);

            }).catch(error =>{
                ErrorHandler.handleErrorResponse(error);
            })
        }

        else{
            couponService.addCoupon(coupon).then(resopnse => {  
                alert("The Coupon Has Been Added Successfully");
                navigate("/coupons")
            }).catch(error =>{
                ErrorHandler.handleErrorResponse(error);
            });
        }
}
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Fade in timeout={600}>
                <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ 
                        background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                        color: 'white',
                        p: 3,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                            {params.couponId ? 'Edit Coupon' : 'Add New Coupon'}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit(sendCoupon)}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        variant="outlined"
                                        {...register("title", {
                                            required: { value: true, message: "Title field is mandatory" }
                                        })}
                                        error={!!formState.errors.title}
                                        helperText={formState.errors.title?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined" error={!!formState.errors.category}>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            label="Category"
                                            {...register("category", {
                                                required: { value: true, message: "Category field is mandatory" }
                                            })}
                                            defaultValue=""
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category.id} value={category.name}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formState.errors.category && (
                                            <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                                                {formState.errors.category.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        {...register("description", {
                                            required: { value: true, message: "Description field is mandatory" }
                                        })}
                                        error={!!formState.errors.description}
                                        helperText={formState.errors.description?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Start Date"
                                        type="date"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        {...register("startDate", {
                                            required: { value: true, message: "Start date field is mandatory" }
                                        })}
                                        error={!!formState.errors.startDate}
                                        helperText={formState.errors.startDate?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="End Date"
                                        type="date"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        {...register("endDate", {
                                            required: { value: true, message: "End date field is mandatory" }
                                        })}
                                        error={!!formState.errors.endDate}
                                        helperText={formState.errors.endDate?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Amount"
                                        type="number"
                                        variant="outlined"
                                        {...register("amount", {
                                            required: { value: true, message: "Amount field is mandatory" }
                                        })}
                                        error={!!formState.errors.amount}
                                        helperText={formState.errors.amount?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        type="number"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                                        }}
                                        {...register("price", {
                                            required: { value: true, message: "Price field is mandatory" }
                                        })}
                                        error={!!formState.errors.price}
                                        helperText={formState.errors.price?.message}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Image URL"
                                        variant="outlined"
                                        {...register("image", {
                                            required: { value: true, message: "Image field is mandatory" }
                                        })}
                                        error={!!formState.errors.image}
                                        helperText={formState.errors.image?.message}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            startIcon={params.couponId ? <SaveIcon /> : <AddIcon />}
                                            sx={{
                                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                                borderRadius: 3,
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                fontSize: '1.1rem',
                                                boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)',
                                                }
                                            }}
                                        >
                                            {params.couponId ? 'Update Coupon' : 'Add Coupon'}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Paper>
            </Fade>
        </Container>
    );
}

export default Coupon