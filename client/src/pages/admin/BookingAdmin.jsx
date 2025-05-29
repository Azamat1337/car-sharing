import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllBookingsRequest,
    getAllBookingsDataSelector,
    getAllBookingsLoadingSelector,
    getAllBookingsErrorSelector
} from '../../infrastructure/redux/booking/getAll/slice';
import {
    updateBookingRequest,
    updateBookingLoadingSelector,
    updateBookingErrorSelector,
    updateBookingSuccessSelector,
    updateBookingReset
} from '../../infrastructure/redux/booking/update/slice';

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

export default function BookingAdmin() {
    const dispatch = useDispatch();
    const bookings = useSelector(getAllBookingsDataSelector);
    const loading = useSelector(getAllBookingsLoadingSelector);
    const error = useSelector(getAllBookingsErrorSelector);

    const updateLoading = useSelector(updateBookingLoadingSelector);
    const updateError = useSelector(updateBookingErrorSelector);
    const updateSuccess = useSelector(updateBookingSuccessSelector);

    const [editStatus, setEditStatus] = useState({}); // { [bookingId]: status }

    useEffect(() => {
        dispatch(getAllBookingsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (updateSuccess) {
            dispatch(getAllBookingsRequest());
            dispatch(updateBookingReset());
        }
    }, [updateSuccess, dispatch]);

    const handleStatusChange = (bookingId, status) => {
        setEditStatus(prev => ({ ...prev, [bookingId]: status }));
    };

    const handleStatusSave = (bookingId) => {
        dispatch(updateBookingRequest({
            id: bookingId,
            data: { status: editStatus[bookingId] }
        }));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Все бронирования
            </Typography>
            {loading && <CircularProgress sx={{ my: 4 }} />}
            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
            {updateError && <Alert severity="error" sx={{ my: 2 }}>{updateError}</Alert>}
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Пользователь</TableCell>
                            <TableCell>Машина</TableCell>
                            <TableCell>С</TableCell>
                            <TableCell>По</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    Нет бронирований
                                </TableCell>
                            </TableRow>
                        )}
                        {bookings.map(booking => (
                            <TableRow key={booking.id}>
                                <TableCell>{booking.id}</TableCell>
                                <TableCell>
                                    {booking.user?.email || booking.userId}
                                </TableCell>
                                <TableCell>
                                    {booking.car
                                        ? `${booking.car.brand?.name || ''} ${booking.car.model || ''}`
                                        : booking.carId}
                                </TableCell>
                                <TableCell>
                                    {new Date(booking.startTime).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(booking.endTime).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Select
                                        size="small"
                                        value={editStatus[booking.id] ?? booking.status}
                                        onChange={e => handleStatusChange(booking.id, e.target.value)}
                                        disabled={updateLoading}
                                    >
                                        {STATUS_OPTIONS.map(status => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleStatusSave(booking.id)}
                                        disabled={updateLoading || (editStatus[booking.id] ?? booking.status) === booking.status}
                                    >
                                        Сохранить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}