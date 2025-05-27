import React, { useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CreateRideModal from '../components/modals/CreateRideModal';
import {
    getAvailableRidesRequest,
    getAvailableRidesDataSelector,
    getAvailableRidesLoadingSelector,
    getAvailableRidesErrorSelector
} from '../infrastructure/redux/taxi/getAvailable/slice';
import {
    addRideRequest,
    addRideLoadingSelector
} from '../infrastructure/redux/taxi/add/slice';
import {
    joinRideRequest,
    joinRideLoadingSelector,
    joinRideSuccessSelector
} from '../infrastructure/redux/taxi/join/slice';

export default function TaxiListPage() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);
    const rides = useSelector(getAvailableRidesDataSelector);
    const loading = useSelector(getAvailableRidesLoadingSelector);
    const error = useSelector(getAvailableRidesErrorSelector);
    const addLoading = useSelector(addRideLoadingSelector);
    const joinLoading = useSelector(joinRideLoadingSelector);
    const joinSuccess = useSelector(joinRideSuccessSelector);

    const [searchTo, setSearchTo] = useState('');
    const [openCreateModal, setOpenCreateModal] = useState(false);

    useEffect(() => {
        dispatch(getAvailableRidesRequest());
    }, [dispatch, joinSuccess]);

    const filteredRides = rides.filter(ride =>
        ride.toLocation.toLowerCase().includes(searchTo.toLowerCase())
    );

    const handleCreateRide = (form) => {
        dispatch(addRideRequest(form));
        // Закрыть модалку после успешного создания можно через useEffect по addRideSuccess
        setOpenCreateModal(false);
    };

    const handleJoin = (rideId) => {
        dispatch(joinRideRequest(rideId));
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: 4,
                backgroundColor: 'background.default',
                color: 'text.primary'
            }}
        >
            <Button variant="contained" onClick={() => setOpenCreateModal(true)} sx={{ mb: 3 }}>
                Создать поездку
            </Button>
            <CreateRideModal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                onSubmit={handleCreateRide}
                loading={addLoading}
            />

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Поиск по пункту назначения"
                    placeholder="Введите пункт Б"
                    variant="outlined"
                    fullWidth
                    value={searchTo}
                    onChange={e => setSearchTo(e.target.value)}
                />
            </Box>

            {loading && (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Alert severity="error" sx={{ my: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {filteredRides.map(ride => (
                    <Grid item xs={12} sm={6} md={4} key={ride.id}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'background.paper'
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {ride.carModel}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Откуда:</strong> {ride.fromLocation}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Куда:</strong> {ride.toLocation}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Время:</strong>{' '}
                                    {new Date(ride.startTime).toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Цена: </strong>${Number(ride.price).toFixed(2)}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Свободно мест:</strong> {ride.seatsAvailable}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleJoin(ride.id)}
                                    disabled={joinLoading || profile?.id === ride.userId}
                                >
                                    Зарегистрироваться
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                {filteredRides.length === 0 && !loading && (
                    <Grid item xs={12}>
                        <Typography color="text.secondary" align="center">
                            Нет доступных поездок
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}