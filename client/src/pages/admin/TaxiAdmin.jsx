import React, { useEffect } from 'react';
import {
    Container, Typography, Grid, Card, CardContent, CardActions,
    Button, Chip, CircularProgress, Box, Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllRidesRequest,
    getAllRidesDataSelector,
    getAllRidesLoadingSelector,
    getAllRidesErrorSelector
} from '../../infrastructure/redux/taxi/getAll/slice';
import {
    changeRideStatusRequest,
    changeRideStatusLoadingSelector
} from '../../infrastructure/redux/taxi/changeStatus/slice';

const statusColors = {
    PENDING: 'warning',
    APPROVED: 'success',
    REJECTED: 'error'
};

export default function TaxiAdminPage() {
    const dispatch = useDispatch();
    const rides = useSelector(getAllRidesDataSelector);
    const loading = useSelector(getAllRidesLoadingSelector);
    const error = useSelector(getAllRidesErrorSelector);
    const statusLoading = useSelector(changeRideStatusLoadingSelector);

    useEffect(() => {
        dispatch(getAllRidesRequest());
    }, [dispatch]);

    const handleStatusChange = (rideId, status) => {
        dispatch(changeRideStatusRequest({ rideId, status }));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Ride Requests Management
            </Typography>
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
                {rides.map(ride => (
                    <Grid item xs={12} sm={6} md={4} key={ride.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {ride.carModel
                                        ? ride.carModel
                                        : (ride.creator?.username || `User #${ride.userId}`)}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>From:</strong> {ride.fromLocation}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>To:</strong> {ride.toLocation}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Time:</strong> {new Date(ride.startTime).toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Price:</strong> {ride.price ? `${Number(ride.price).toFixed(2)}₸` : '—'}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Status:</strong>{' '}
                                    <Chip
                                        label={ride.status}
                                        color={statusColors[ride.status] || 'default'}
                                        size="small"
                                    />
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Creator ID:</strong> {ride.userId}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {ride.status === 'PENDING' && (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            disabled={statusLoading}
                                            onClick={() => handleStatusChange(ride.id, 'APPROVED')}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            disabled={statusLoading}
                                            onClick={() => handleStatusChange(ride.id, 'REJECTED')}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}