import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { carService } from '../infrastructure/services/cars/carService';
import { CARSHARING_CAR_ROUTE } from '../infrastructure/routes';
import { useNavigate } from 'react-router';
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
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    boxShadow: theme.palette.mode === 'light'
        ? '0 1px 3px rgba(0,0,0,0.12)'
        : '0 1px 3px rgba(255,255,255,0.05)',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

export default function CarSharingList() {
    const navigate = useNavigate();
    const theme = useTheme();
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
                        color: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
                        fontWeight: 400
                    }
                }}
            >
                Carsharing <span>(Hourly)</span>
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
                <Box
                    sx={{
                        flexGrow: 1,
                        minWidth: 0,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: theme.shape.borderRadius,
                        padding: theme.spacing(3),
                        boxShadow: theme.palette.mode === 'light'
                            ? '0 1px 3px rgba(0,0,0,0.12)'
                            : '0 1px 3px rgba(255,255,255,0.05)'
                    }}
                >
                    <CarListGrid
                        cars={filteredCars}
                        loading={loading}
                        error={error}
                        onCarClick={goToCar}
                    />
                </Box>
            </MainBox>
        </StyledContainer>
    );
}

