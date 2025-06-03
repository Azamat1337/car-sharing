import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'light'
            ? '0 6px 12px rgba(0,0,0,0.15)'
            : '0 6px 12px rgba(255,255,255,0.1)'
    }
}));

const ImageContainer = styled(Box)({
    position: 'relative',
    paddingTop: '75%', // Соотношение сторон 4:3
    overflow: 'hidden'
});

const StyledCardMedia = styled(CardMedia)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
    '&:last-child': {
        paddingBottom: theme.spacing(2)
    }
}));

const CarTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
    color: theme.palette.mode === 'light' ? '#000' : '#fff'
}));

const CarYear = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'light'
        ? 'rgba(0,0,0,0.6)'
        : 'rgba(255,255,255,0.7)'
}));

export default function CarCard({ car, onClick, sx }) {
    const imageUrl = car.img?.startsWith('http')
        ? car.img
        : (car.img ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${car.img}` : 'https://via.placeholder.com/400x300?text=Car');

    return (
        <StyledCard onClick={onClick} sx={sx}>
            <ImageContainer>
                <StyledCardMedia
                    component="img"
                    image={imageUrl}
                    alt={`${car.brand?.name || ''} ${car.model || ''}`}
                />
            </ImageContainer>
            <StyledCardContent>
                <CarTitle variant="h6">
                    {car.brand?.name} {car.model}
                </CarTitle>
                <CarYear variant="body2">
                    {car.year} год
                </CarYear>
            </StyledCardContent>
        </StyledCard>
    );
}