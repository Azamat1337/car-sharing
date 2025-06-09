import React from 'react';
import {
    Box,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function CarBookingForm({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onSubmit,
    bookingLoading,
    bookingError,
    bookingSuccess
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
                Book a car
            </Typography>
            {bookingError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {bookingError}
                </Alert>
            )}
            {bookingSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    The booking has been successfully created!
                </Alert>
            )}
            <DateTimePicker
                label="Start date and time"
                value={startDate ? dayjs(startDate) : null}
                onChange={val => setStartDate(val ? val.toISOString() : '')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                minDateTime={dayjs()}
                disabled={bookingLoading}
            />
            <DateTimePicker
                label="End date and time"
                value={endDate ? dayjs(endDate) : null}
                onChange={val => setEndDate(val ? val.toISOString() : '')}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                minDateTime={startDate ? dayjs(startDate) : dayjs()}
                disabled={bookingLoading}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={bookingLoading || !startDate || !endDate}
                fullWidth
            >
                {bookingLoading ? <CircularProgress size={24} /> : 'To book'}
            </Button>
        </Box>
    );
}