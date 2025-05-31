import React, { useEffect } from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getBrandsRequest } from "../infrastructure/redux/brand/get/slice.js";

import BrandList from '../components/Admin/BrandList.jsx';
import BrandCreateDialog from '../components/Admin/BrandCreateDialog.jsx';
import PostCreateDialog from '../components/Admin/PostCreateDialog.jsx';
import CarCreateDialog from '../components/Admin/CarCreateDialog.jsx';

export default function AdminPanel() {
    const dispatch = useDispatch();
    const [openBrand, setOpenBrand] = React.useState(false);
    const [openPost, setOpenPost] = React.useState(false);
    const [openCar, setOpenCar] = React.useState(false);

    useEffect(() => {
        dispatch(getBrandsRequest());
    }, [dispatch]);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Админ-панель
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <BrandList onCreate={() => setOpenBrand(true)} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Посты</Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenPost(true)}
                        >
                            Создать пост
                        </Button>
                    </Box>
                    <PostCreateDialog open={openPost} onClose={() => setOpenPost(false)} />
                    {/* Здесь будет PostList */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Машины</Typography>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => setOpenCar(true)}
                        >
                            Создать машину
                        </Button>
                    </Box>
                    <CarCreateDialog open={openCar} onClose={() => setOpenCar(false)} />
                    {/* Здесь будет CarList */}
                </Grid>
            </Grid>
            <BrandCreateDialog open={openBrand} onClose={() => setOpenBrand(false)} />
        </Container>
    );
}