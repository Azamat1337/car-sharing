import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
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

const StyledContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default
}));

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
    }
}));

const FilterContainer = styled(Box)(({ theme }) => ({
    width: 280,
    flexShrink: 0,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'light'
        ? '0 1px 3px rgba(0,0,0,0.12)'
        : '0 1px 3px rgba(255,255,255,0.05)',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const ContentBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    minWidth: 0,
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'light'
        ? '0 1px 3px rgba(0,0,0,0.12)'
        : '0 1px 3px rgba(255,255,255,0.05)'
}));

export default function RentalList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
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

    const filteredCars = cars.filter(car =>
        (!yearFrom || car.year >= Number(yearFrom)) &&
        (!yearTo || car.year <= Number(yearTo))
    );

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
        <StyledContainer maxWidth="lg">
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    color: theme.palette.mode === 'light' ? '#000' : '#fff',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                    mb: 6,
                    '& span': {
                        color: theme.palette.mode === 'light'
                            ? 'rgba(0,0,0,0.6)'
                            : 'rgba(255,255,255,0.6)',
                        fontWeight: 400
                    }
                }}
            >
                Аренда <span>(Посуточно)</span>
            </Typography>

            <MainBox>
                <FilterContainer>
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
                <ContentBox>
                    <CarListGrid
                        cars={filteredCars}
                        loading={loading}
                        error={error}
                        onCarClick={goToCar}
                    />
                </ContentBox>
            </MainBox>
        </StyledContainer>
    );
}


