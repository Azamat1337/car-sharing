import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Alert,
    Chip
} from '@mui/material';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import {
    getMyBookingsDataSelector,
    getMyBookingsLoadingSelector,
    getMyBookingsErrorSelector
} from '../../infrastructure/redux/booking/getMy/slice.js';

export default function HistoryTab() {
    const bookings = useSelector(getMyBookingsDataSelector);
    const bookingsLoading = useSelector(getMyBookingsLoadingSelector);
    const bookingsError = useSelector(getMyBookingsErrorSelector);

    const historyBookings = bookings.filter(
        b => b.status === 'CANCELLED' || b.status === 'COMPLETED'
    );

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy HH:mm');
    };

    if (bookingsLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
                <CircularProgress />
            </div>
        );
    }

    if (bookingsError) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {bookingsError}
            </Alert>
        );
    }

    return (
        <List>
            {historyBookings.map(booking => (
                <ListItem key={booking.id} divider>
                    <ListItemText
                        primary={
                            <>
                                <Typography variant="subtitle1">
                                    {booking.car?.model}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatDate(booking.startTime)} - {formatDate(booking.endTime)}
                                </Typography>
                            </>
                        }
                        secondary={
                            <Chip
                                label={booking.status}
                                size="small"
                                color={
                                    booking.status === 'COMPLETED' ? 'success' :
                                        booking.status === 'CANCELLED' ? 'error' : 'default'
                                }
                            />
                        }
                    />
                </ListItem>
            ))}
            {historyBookings.length === 0 && !bookingsLoading && (
                <Typography color="text.secondary" sx={{ p: 2 }}>
                    Нет завершённых бронирований
                </Typography>
            )}
        </List>
    );
}