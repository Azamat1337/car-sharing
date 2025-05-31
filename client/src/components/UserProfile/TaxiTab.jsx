import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Alert,
    Chip,
    Button
} from '@mui/material';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
    getMyRidesDataSelector,
    getMyRidesLoadingSelector,
    getMyRidesErrorSelector
} from '../../infrastructure/redux/taxi/getMy/slice.js';
import { completeRideLoadingSelector } from '../../infrastructure/redux/taxi/complete/slice.js';
import { completeRideRequest } from '../../infrastructure/redux/taxi/complete/slice.js';

export default function TaxiTab() {
    const dispatch = useDispatch();
    const myRides = useSelector(getMyRidesDataSelector);
    const myRidesLoading = useSelector(getMyRidesLoadingSelector);
    const myRidesError = useSelector(getMyRidesErrorSelector);
    const completeLoading = useSelector(completeRideLoadingSelector);
    const profile = useSelector(state => state.user.profile);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy HH:mm');
    };

    const handleCompleteRide = (rideId) => {
        dispatch(completeRideRequest(rideId));
    };

    if (myRidesLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
                <CircularProgress />
            </div>
        );
    }

    if (myRidesError) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {myRidesError}
            </Alert>
        );
    }

    return (
        <List>
            {myRides.map(ride => (
                <ListItem key={ride.id} divider>
                    <ListItemText
                        primary={
                            <>
                                <Typography variant="subtitle1">
                                    {ride.fromLocation} → {ride.toLocation}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatDate(ride.startTime)}
                                </Typography>
                            </>
                        }
                        secondary={
                            <>
                                <Chip
                                    label={ride.status}
                                    size="small"
                                    color={
                                        ride.status === 'APPROVED' ? 'success' :
                                            ride.status === 'REJECTED' ? 'error' : 'warning'
                                    }
                                    sx={{ mr: 1 }}
                                />
                                <span>Цена: {Number(ride.price).toFixed(2)}₸</span>
                                <span style={{ marginLeft: 8 }}>Мест: {ride.seatsAvailable}</span>
                            </>
                        }
                    />

                    {profile?.id === ride.userId && ride.status === 'APPROVED' && (
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleCompleteRide(ride.id)}
                            disabled={completeLoading}
                            sx={{ ml: 2 }}
                        >
                            {completeLoading ? 'Завершение...' : 'Завершить'}
                        </Button>
                    )}
                </ListItem>
            ))}
            {myRides.length === 0 && !myRidesLoading && (
                <Typography color="text.secondary" sx={{ p: 2 }}>
                    Нет ваших заявок на поездки
                </Typography>
            )}
        </List>
    );
}