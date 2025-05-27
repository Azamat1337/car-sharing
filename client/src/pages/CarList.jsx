import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Grid,
    TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router";
import { CAR_PAGE_ROUTE } from "../infrastructure/routes/index.js";
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCarsRequest,
    getAllCarsDataSelector,
    getAllCarsLoadingSelector,
    getAllCarsErrorSelector
} from '../infrastructure/redux/car/getAll/slice.js';
import { getBrandsDataSelector, getBrandsRequest } from '../infrastructure/redux/brand/get/slice.js';

const FilterContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
}));

const CarCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover': {
        boxShadow: theme.shadows[4],
    },
}));


export default function CarList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedBrand, setSelectedBrand] = useState('');
    const [search, setSearch] = useState('');
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');

    const carsData = useSelector(getAllCarsDataSelector);
    const loading = useSelector(getAllCarsLoadingSelector);
    const error = useSelector(getAllCarsErrorSelector);
    const brands = useSelector(getBrandsDataSelector)
    const cars = carsData?.cars ?? [];

    useEffect(() => {
        dispatch(getBrandsRequest());
        dispatch(getAllCarsRequest());
    }, []);

    const goToCar = (id) => {
        const path = CAR_PAGE_ROUTE.replace(':id', id);
        navigate(path);
    }

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(getAllCarsRequest({ model: search }));
        }
    }

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand.id);
        dispatch(getAllCarsRequest({ brandId: brand.id }));
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4, backgroundColor: 'white' }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
                Car Sharing Inventory
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                    label="Search by model"
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1, minWidth: 200 }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                />
                <TextField
                    label="Year from"
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{ inputProps: { min: 2000, max: new Date().getFullYear() } }}
                    sx={{ width: 120 }}
                />
                <TextField
                    label="Year to"
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{ inputProps: { min: 2000, max: new Date().getFullYear() } }}
                    sx={{ width: 120 }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <FilterContainer sx={{ width: 240, cursor: 'pointer' }}>
                    <Typography variant="h6" gutterBottom color="textPrimary">
                        Filter by Brand
                    </Typography>
                    <List>
                        {brands.map((brand) => (
                            <ListItem
                                button
                                key={brand.id}
                                selected={selectedBrand === brand.id}
                                onClick={() => handleBrandClick(brand)}
                            >
                                <ListItemText primary={brand.name} />
                            </ListItem>
                        ))}
                    </List>
                </FilterContainer>

                <Box sx={{ flexGrow: 1 }}>
                    {loading && (
                        <Typography align="center" sx={{ mt: 4 }}>Загрузка...</Typography>
                    )}
                    {error && (
                        <Typography align="center" color="error" sx={{ mt: 4 }}>{error}</Typography>
                    )}
                    {!loading && !error && (
                        <Grid container spacing={3}>
                            {cars.length === 0 && (
                                <Grid item xs={12}>
                                    <Typography align="center">Нет машин для отображения</Typography>
                                </Grid>
                            )}
                            {cars.map((car) => (
                                <Grid item xs={12} sm={6} md={4} key={car.id}>
                                    <CarCard sx={{ cursor: 'pointer' }} onClick={() => goToCar(car.id)}>
                                        <CardMedia
                                            component="img"
                                            height="160"
                                            image={car.image?.startsWith('http') ? car.img : (car.img ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${car.img}` : null)}
                                            alt={`${car.brand?.name} ${car.model}`}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">
                                                {car.brand?.name} {car.model}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {car.year}
                                            </Typography>
                                        </CardContent>
                                    </CarCard>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
        </Container>
    );
}