import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';
import dayjs from 'dayjs';


export default function BookingConfirmDialog({
    open,
    onClose,
    onConfirm,
    car,
    startDate,
    endDate,
    loading,
    error
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Confirm your booking</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Typography variant="subtitle1" gutterBottom>
                    Are you sure you want to book a car:
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {car?.brand?.name} {car?.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    From: {startDate ? dayjs(startDate).format('DD.MM.YYYY HH:mm') : '-'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    To: {endDate ? dayjs(endDate).format('DD.MM.YYYY HH:mm') : '-'}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Confirm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}