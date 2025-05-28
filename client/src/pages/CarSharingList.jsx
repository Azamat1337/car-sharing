import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Grid,
    TextField,
    Card,
    CardMedia,
    CardContent,
    useTheme,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { carService } from '../infrastructure/services/cars/carService';
import { CARSHARING_CAR_ROUTE } from '../infrastructure/routes';
import { useNavigate } from 'react-router';

const FilterContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'dark' ? '#222' : theme.palette.background.paper,
}));

const CarCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.mode === 'dark' ? '#111' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    transition: 'box-shadow 0.2s ease-in-out, background 0.2s',
    '&:hover': {
        boxShadow: theme.shadows[4],
        backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#f5f5f5',
    },
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

    useEffect(() => {
        async function fetchCars() {
            setLoading(true);
            try {
                const data = await carService.fetchAll({ rentalType: 'HOURLY' });
                const carList = data.rows || data.cars || [];
                setCars(carList);

                // Собираем бренды из машин (без uniqueBrands)
                const brandsList = carList
                    .map(car => car.brand)
                    .filter((brand, idx, arr) =>
                        brand && arr.findIndex(b => b && b.id === brand.id) === idx
                    );
                setBrands(brandsList);
            } catch (e) {
                setCars([]);
                setBrands([]);
            }
            setLoading(false);
        }
        fetchCars();
    }, []);

    // Фильтрация по бренду, году и поиску
    const filteredCars = cars.filter(car =>
        (!selectedBrand || car.brand?.id === selectedBrand) &&
        (!search || car.model.toLowerCase().includes(search.toLowerCase())) &&
        (!yearFrom || car.year >= Number(yearFrom)) &&
        (!yearTo || car.year <= Number(yearTo))
    );

    const goToCar = (id) => {
        const path = CARSHARING_CAR_ROUTE.replace(':id', id);
        navigate(path);
    }

    return (
        <Container maxWidth="lg" sx={{
            py: 4,
            backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fff',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000'
        }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                    letterSpacing: 2,
                    fontWeight: 700
                }}
            >
                Carsharing (Почасовой)
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                    label="Поиск по модели"
                    variant="outlined"
                    size="small"
                    sx={{
                        flex: 1,
                        minWidth: 200,
                        input: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' }
                    }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <TextField
                    label="Год от"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={yearFrom}
                    onChange={e => setYearFrom(e.target.value)}
                    InputProps={{ inputProps: { min: 2000, max: new Date().getFullYear() } }}
                    sx={{ width: 120 }}
                />
                <TextField
                    label="Год до"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={yearTo}
                    onChange={e => setYearTo(e.target.value)}
                    InputProps={{ inputProps: { min: 2000, max: new Date().getFullYear() } }}
                    sx={{ width: 120 }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <FilterContainer sx={{ width: 240, cursor: 'pointer' }}>
                    <Typography variant="h6" gutterBottom color="textPrimary">
                        Фильтр по бренду
                    </Typography>
                    <List>
                        {brands.map((brand) => (
                            <ListItem
                                button
                                key={brand.id}
                                selected={selectedBrand === brand.id}
                                onClick={() => setSelectedBrand(brand.id)}
                                sx={{
                                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                                    '&.Mui-selected': {
                                        background: theme.palette.mode === 'dark' ? '#333' : '#eee'
                                    }
                                }}
                            >
                                <ListItemText primary={brand.name} />
                            </ListItem>
                        ))}
                    </List>
                </FilterContainer>

                <Box sx={{ flexGrow: 1 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredCars.length === 0 && (
                                <Grid item xs={12}>
                                    <Typography align="center">Нет машин для отображения</Typography>
                                </Grid>
                            )}
                            {filteredCars.map((car) => (
                                <Grid item xs={12} sm={6} md={4} key={car.id} onClick={() => goToCar(car.id)}>
                                    <CarCard sx={{ cursor: 'pointer' }}>
                                        <CardMedia
                                            component="img"
                                            height="160"
                                            image={car.img?.startsWith('http') ? car.img : (car.img ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${car.img}` : null)}
                                            alt={`${car.brand?.name} ${car.model}`}
                                            sx={{
                                                filter: 'grayscale(1)',
                                                background: '#222'
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
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