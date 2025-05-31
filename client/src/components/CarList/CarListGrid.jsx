import React from 'react';
import { Grid, Typography } from '@mui/material';
import CarCard from './CarCard.jsx';

export default function CarListGrid({ cars, onCarClick, loading, error }) {
    if (loading) {
        return <Typography align="center" sx={{ mt: 4 }}>Загрузка...</Typography>;
    }
    if (error) {
        return <Typography align="center" color="error" sx={{ mt: 4 }}>{error}</Typography>;
    }
    if (!cars || cars.length === 0) {
        return (
            <Typography align="center" sx={{ mt: 4 }}>
                Нет машин для отображения
            </Typography>
        );
    }
    return (
        <Grid container spacing={3}>
            {cars.map((car) => (
                <Grid item xs={12} sm={6} md={4} key={car.id}>
                    <CarCard car={car} onClick={() => onCarClick(car.id)} />
                </Grid>
            ))}
        </Grid>
    );
}