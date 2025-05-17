import React from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    TextField,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const RentalContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(4),
    minHeight: '100vh',
}));

const CarDetailsCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
}));

const BookingFormBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
}));

const Rental = () => {
    const car = {
        id: 1,
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        description:
            'A comfortable and reliable car, perfect for both city driving and long journeys.',
        image: 'https://via.placeholder.com/600x400?text=Toyota+Camry',
    };

    const handleBooking = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log({
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
        });
    };

    return (
        <RentalContainer maxWidth='lg'>
            <Typography
                variant='h4'
                gutterBottom
                sx={{ textAlign: 'center', mb: 4 }}
            >
                Rent Your Car
            </Typography>
            <Grid container spacing={4}>
                {/* Левая колонка – детали автомобиля */}
                <Grid item xs={12} md={7}>
                    <CarDetailsCard>
                        <CardMedia
                            component='img'
                            height='300'
                            image={car.image}
                            alt={`${car.brand} ${car.model}`}
                        />
                        <CardContent>
                            <Typography variant='h5' gutterBottom>
                                {car.brand} {car.model} ({car.year})
                            </Typography>
                            <Typography variant='body1' color='text.secondary'>
                                {car.description}
                            </Typography>
                        </CardContent>
                    </CarDetailsCard>
                </Grid>
                {/* Правая колонка – форма бронирования */}
                <Grid item xs={12} md={5}>
                    <BookingFormBox
                        component='form'
                        onSubmit={handleBooking}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <Typography variant='h6' gutterBottom>
                            Book this car
                        </Typography>
                        <TextField
                            label='Start Date'
                            type='date'
                            name='startDate'
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            label='End Date'
                            type='date'
                            name='endDate'
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            Book Now
                        </Button>
                    </BookingFormBox>
                </Grid>
            </Grid>
        </RentalContainer>
    );
};

export default Rental;
