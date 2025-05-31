import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router";
import { RENTAL_CAR_ROUTE } from "../infrastructure/routes/index.js";
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCarsRequest,
    getAllCarsDataSelector,
    getAllCarsLoadingSelector,
    getAllCarsErrorSelector
} from '../infrastructure/redux/car/getAll/slice.js';
import { getBrandsDataSelector, getBrandsRequest } from '../infrastructure/redux/brand/get/slice.js';

import CarListFilter from '../components/CarList/CarListFilter.jsx';
import CarListGrid from '../components/CarList/CarListGrid.jsx';

const FilterContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
}));

export default function RentalList() {
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
        dispatch(getAllCarsRequest({ rentalType: ['DAILY', 'BOTH'] }));
    }, [dispatch]);

    const goToCar = (id) => {
        const path = RENTAL_CAR_ROUTE.replace(':id', id);
        navigate(path);
    };

    // Фильтрация по году
    const filteredCars = cars.filter(car =>
        (!yearFrom || car.year >= Number(yearFrom)) &&
        (!yearTo || car.year <= Number(yearTo))
    );

    // Обработчики для фильтра
    const handleBrandChange = (brandId) => {
        setSelectedBrand(brandId);
        dispatch(getAllCarsRequest({ brandId, rentalType: ['DAILY', 'BOTH'] }));
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        dispatch(getAllCarsRequest({ model: value, rentalType: ['DAILY', 'BOTH'] }));
    };

    const handleYearFromChange = (value) => setYearFrom(value);
    const handleYearToChange = (value) => setYearTo(value);

    return (
        <Container maxWidth="lg" sx={{ py: 4, backgroundColor: 'white' }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
                Car Rental Inventory
            </Typography>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <FilterContainer sx={{ width: 240 }}>
                    <CarListFilter
                        brands={brands}
                        selectedBrand={selectedBrand}
                        onBrandChange={handleBrandChange}
                        search={search}
                        onSearchChange={handleSearchChange}
                        yearFrom={yearFrom}
                        onYearFromChange={handleYearFromChange}
                        yearTo={yearTo}
                        onYearToChange={handleYearToChange}
                    />
                </FilterContainer>
                <Box sx={{ flexGrow: 1 }}>
                    <CarListGrid
                        cars={filteredCars}
                        loading={loading}
                        error={error}
                        onCarClick={goToCar}
                    />
                </Box>
            </Box>
        </Container>
    );
}