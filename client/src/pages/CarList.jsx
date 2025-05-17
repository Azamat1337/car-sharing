import React from 'react';
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
import {useNavigate} from "react-router";
import {CAR_PAGE_ROUTE} from "../infrastructure/routes/index.js";

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

const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Audi'];
const cars = [
    { id: 1, brand: 'Toyota', model: 'Camry', year: 2020, image: 'https://via.placeholder.com/300x200?text=Camry' },
    { id: 2, brand: 'Honda', model: 'Civic', year: 2019, image: 'https://via.placeholder.com/300x200?text=Civic' },
    { id: 3, brand: 'Ford', model: 'Focus', year: 2021, image: 'https://via.placeholder.com/300x200?text=Focus' },
    { id: 4, brand: 'BMW', model: 'X5', year: 2022, image: 'https://via.placeholder.com/300x200?text=X5' },
    { id: 5, brand: 'Audi', model: 'A4', year: 2018, image: 'https://via.placeholder.com/300x200?text=A4' },
];

export default function CarList() {
    const navigate = useNavigate();

    const goToCar = (id) => {
        const path = CAR_PAGE_ROUTE.replace(':id', id);
        navigate(path);
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
                            <ListItem button key={brand}>
                                <ListItemText primary={brand} />
                            </ListItem>
                        ))}
                    </List>
                </FilterContainer>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        {cars.map((car) => (
                            <Grid item xs={12} sm={6} md={4} key={car.id}>
                                <CarCard sx={{ cursor: 'pointer' }} onClick={() => goToCar(car.id)}>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={car.image}
                                        alt={`${car.brand} ${car.model}`}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">
                                            {car.brand} {car.model}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {car.year}
                                        </Typography>
                                    </CardContent>
                                </CarCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
