import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button,
    Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { carService } from '../infrastructure/services/cars/carService';
import {
    getCarInfoRequest,
    carInfoLoadingSelector,
    carInfoErrorSelector,
    carInfoDataSelector
} from '../infrastructure/redux/carInfo/get/slice';
import {
    createBookingRequest,
    createBookingLoadingSelector,
    createBookingErrorSelector,
    createBookingSuccessSelector,
    createBookingReset
} from '../infrastructure/redux/booking/create/slice';

const CarPageContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#fff',
    color: '#000',
    padding: theme.spacing(4),
    minHeight: '100vh'
}));

const CarImageCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius
}));

const InfoCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
}));

export default function CarPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const loadingInfo = useSelector(carInfoLoadingSelector);
    const errorInfo = useSelector(carInfoErrorSelector);
    const carInfo = useSelector(carInfoDataSelector);

    const bookingLoading = useSelector(createBookingLoadingSelector);
    const bookingError = useSelector(createBookingErrorSelector);
    const bookingSuccess = useSelector(createBookingSuccessSelector);

    useEffect(() => {
        async function fetchCar() {
            try {
                const data = await carService.fetchById(id);
                setCar(data);
            } catch (e) {
                setCar(null);
            }
        }
        fetchCar();
        dispatch(getCarInfoRequest(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (bookingSuccess) {
            setStartDate('');
            setEndDate('');
            setTimeout(() => {
                dispatch(createBookingReset());
            }, 2000);
        }
    }, [bookingSuccess, dispatch]);

    const handleRent = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) return;
        dispatch(createBookingRequest({
            carId: car.id,
            startTime: startDate,
            endTime: endDate
        }));
    };

    if (!car) {
        return (
            <CarPageContainer maxWidth="md">
                <Typography variant="h5" align="center" sx={{ mt: 8 }}>
                    Машина не найдена
                </Typography>
            </CarPageContainer>
        );
    }

    return (
        <CarPageContainer maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <CarImageCard>
                        <CardMedia
                            component="img"
                            image={
                                car.img
                                    ? (car.img.startsWith('http')
                                        ? car.img
                                        : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${car.img}`)
                                    : null
                            }
                            alt={`${car.brand?.name || ''} ${car.model}`}
                        />
                    </CarImageCard>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        {car.brand?.name} {car.model} ({car.year})
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {car.description || ''}
                    </Typography>

                    <InfoCard component="form" onSubmit={handleRent}>
                        <Typography variant="h6" gutterBottom>
                            Rent this car
                        </Typography>
                        {bookingSuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Заявка на аренду успешно отправлена!
                            </Alert>
                        )}
                        {bookingError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {bookingError}
                            </Alert>
                        )}
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                            <TextField
                                label="Start Date"
                                type="date"
                                name="startDate"
                                InputLabelProps={{ shrink: true }}
                                required
                                sx={{ flex: 1, minWidth: 160 }}
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                disabled={bookingLoading}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                name="endDate"
                                InputLabelProps={{ shrink: true }}
                                required
                                sx={{ flex: 1, minWidth: 160 }}
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                disabled={bookingLoading}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: '#000', color: '#fff' }}
                            disabled={bookingLoading}
                        >
                            {bookingLoading ? 'Отправка...' : 'Rent Now'}
                        </Button>
                    </InfoCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <InfoCard>
                        <Typography variant="h6" gutterBottom>
                            Характеристики
                        </Typography>
                        {loadingInfo && <Typography>Загрузка характеристик...</Typography>}
                        {errorInfo && <Typography color="error">{errorInfo}</Typography>}
                        {!loadingInfo && !errorInfo && (
                            <Table size="small">
                                <TableBody>
                                    {carInfo.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={2}>Нет характеристик</TableCell>
                                        </TableRow>
                                    )}
                                    {carInfo.map(info => (
                                        <TableRow key={info.id}>
                                            <TableCell component="th" sx={{ borderBottom: 'none', fontWeight: 'bold' }}>
                                                {info.attributeName}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: 'none' }}>{info.attributeValue}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </InfoCard>
                </Grid>
            </Grid>
        </CarPageContainer>
    );
}