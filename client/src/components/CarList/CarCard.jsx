import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

export default function CarCard({ car, onClick, sx }) {
    const imageUrl = car.img?.startsWith('http')
        ? car.img
        : (car.img ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${car.img}` : 'https://via.placeholder.com/400x200?text=Car');

    return (
        <Card sx={{ cursor: 'pointer', ...sx }} onClick={onClick}>
            <CardMedia
                component="img"
                height="160"
                image={imageUrl}
                alt={`${car.brand?.name || ''} ${car.model || ''}`}
            />
            <CardContent>
                <Typography variant="h6">
                    {car.brand?.name} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {car.year}
                </Typography>
            </CardContent>
        </Card>
    );
}