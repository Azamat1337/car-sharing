import React from 'react';
import { Typography, Box } from '@mui/material';


export default function CarMainInfo({ car }) {
    if (!car) {
        return (
            <Box sx={{ my: 2 }}>
                <Typography variant="h6" color="text.secondary">
                    Информация о машине недоступна
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h4" gutterBottom>
                {car.brand?.name} {car.model} {car.year && `(${car.year})`}
            </Typography>
            {car.description && (
                <Typography variant="body1" paragraph>
                    {car.description}
                </Typography>
            )}
        </Box>
    );
}