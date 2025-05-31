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

export default function BookingTab() {
    const bookings = useSelector(getMyBookingsDataSelector);
    const bookingsLoading = useSelector(getMyBookingsLoadingSelector);
    const bookingsError = useSelector(getMyBookingsErrorSelector);

    const activeBookings = bookings.filter(
        b => b.status === 'PENDING' || b.status === 'CONFIRMED'
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
            {activeBookings.map(booking => (
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
                                    booking.status === 'CONFIRMED' ? 'success' :
                                        booking.status === 'PENDING' ? 'warning' : 'default'
                                }
                            />
                        }
                    />
                </ListItem>
            ))}
            {activeBookings.length === 0 && !bookingsLoading && (
                <Typography color="text.secondary" sx={{ p: 2 }}>
                    Нет активных бронирований
                </Typography>
            )}
        </List>
    );
}