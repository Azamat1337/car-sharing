import React from 'react';
import { Card, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';


const CarImageCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.mode === 'dark' ? '#111' : '#fff'
}));

export default function CarImageBlock({ car }) {
    const imageUrl = car?.img
        ? (car.img.startsWith('http')
            ? car.img
            : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${car.img}`)
        : 'https://via.placeholder.com/600x300?text=Car';

    return (
        <CarImageCard>
            <CardMedia
                component="img"
                image={imageUrl}
                alt={`${car?.brand?.name || ''} ${car?.model || ''}`}
                sx={{
                    background: '#222'
                }}
            />
        </CarImageCard>
    );
}