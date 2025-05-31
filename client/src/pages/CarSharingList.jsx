import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { carService } from '../infrastructure/services/cars/carService';
import { CARSHARING_CAR_ROUTE } from '../infrastructure/routes';
import { useNavigate } from 'react-router';

import CarListFilter from '../components/CarList/CarListFilter.jsx';
import CarListGrid from '../components/CarList/CarListGrid.jsx';

const FilterContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'dark' ? '#222' : theme.palette.background.paper,
    width: 240,
    minWidth: 240,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
}));

export default function CarSharingList() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCars() {
            setLoading(true);
            setError('');
            try {
                const data = await carService.fetchAll({ rentalType: 'HOURLY' });
                const carList = data.rows || data.cars || [];
                setCars(carList);

                const brandsList = carList
                    .map(car => car.brand)
                    .filter((brand, idx, arr) =>
                        brand && arr.findIndex(b => b && b.id === brand.id) === idx
                    );
                setBrands(brandsList);
            } catch (e) {
                setCars([]);
                setBrands([]);
                setError('Ошибка загрузки машин');
            }
            setLoading(false);
        }
        fetchCars();
    }, []);

    const filteredCars = cars.filter(car =>
        (!selectedBrand || car.brand?.id === selectedBrand) &&
        (!search || car.model.toLowerCase().includes(search.toLowerCase())) &&
        (!yearFrom || car.year >= Number(yearFrom)) &&
        (!yearTo || car.year <= Number(yearTo))
    );

    const goToCar = (id) => {
        const path = CARSHARING_CAR_ROUTE.replace(':id', id);
        navigate(path);
    };

    const handleBrandChange = (brandId) => setSelectedBrand(brandId);
    const handleSearchChange = (value) => setSearch(value);
    const handleYearFromChange = (value) => setYearFrom(value);
    const handleYearToChange = (value) => setYearTo(value);

    return (
        <Container maxWidth="lg" sx={{
            py: 4,
            backgroundColor: theme => theme.palette.mode === 'dark' ? '#181818' : '#fff',
            color: theme => theme.palette.mode === 'dark' ? '#fff' : '#000'
        }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    color: theme => theme.palette.mode === 'dark' ? '#fff' : '#111',
                    letterSpacing: 2,
                    fontWeight: 700
                }}
            >
                Carsharing (Почасовой)
            </Typography>

            <Box sx={{ display: 'flex', gap: 4 }}>
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