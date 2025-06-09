import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Alert,
    Chip,
    IconButton,
    Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
    getMyBookingsDataSelector,
    getMyBookingsLoadingSelector,
    getMyBookingsErrorSelector,
    getMyBookingsRequest
} from '../../infrastructure/redux/booking/getMy/slice.js';
import {
    deleteBookingRequest,
    deleteBookingLoadingSelector,
    deleteBookingSuccessSelector,
    deleteBookingErrorSelector,
    deleteBookingReset
} from '../../infrastructure/redux/booking/delete/slice.js';

export default function BookingTab() {
    const dispatch = useDispatch();
    const bookings = useSelector(getMyBookingsDataSelector);
    const bookingsLoading = useSelector(getMyBookingsLoadingSelector);
    const bookingsError = useSelector(getMyBookingsErrorSelector);

    const deleteLoading = useSelector(deleteBookingLoadingSelector);
    const deleteSuccess = useSelector(deleteBookingSuccessSelector);
    const deleteError = useSelector(deleteBookingErrorSelector);

    const [deleteId, setDeleteId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const activeBookings = bookings.filter(
        b => b.status === 'PENDING' || b.status === 'CONFIRMED'
    );

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy HH:mm');
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        dispatch(deleteBookingRequest(id));
    };

    React.useEffect(() => {
        if (deleteSuccess) {
            setSnackbar({ open: true, message: 'Бронирование удалено', severity: 'success' });
            dispatch(deleteBookingReset());
            dispatch(getMyBookingsRequest());
        }
        if (deleteError) {
            setSnackbar({ open: true, message: deleteError, severity: 'error' });
            dispatch(deleteBookingReset());
        }
    }, [deleteSuccess, deleteError, dispatch]);

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
        <>
            <List>
                {activeBookings.map(booking => (
                    <ListItem key={booking.id} divider
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                color="error"
                                disabled={deleteLoading && deleteId === booking.id}
                                onClick={() => handleDelete(booking.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
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
            <Snackbar
                open={snackbar.open}
                autoHideDuration={2500}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}