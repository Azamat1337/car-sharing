import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Alert,
    CircularProgress,
    Box
} from '@mui/material';

export default function CarDeleteDialog({ open, onClose, onConfirm, car, loading, error }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete Car</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to delete this car?
                </Typography>

                {car && (
                    <Box sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        mt: 2,
                        bgcolor: 'background.paper'
                    }}>
                        <Typography variant="h6" gutterBottom>
                            {car.brand?.name} {car.model} ({car.year})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Company: {car.company?.name || 'Not specified'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rental Type: {car.rentalType}
                        </Typography>
                        {car.rentalType === 'DAILY' || car.rentalType === 'BOTH' ? (
                            <Typography variant="body2" color="text.secondary">
                                Daily Price: ₸{car.dailyPrice}
                            </Typography>
                        ) : null}
                        {car.rentalType === 'HOURLY' || car.rentalType === 'BOTH' ? (
                            <Typography variant="body2" color="text.secondary">
                                Hourly Price: ₸{car.hourlyPrice}
                            </Typography>
                        ) : null}
                    </Box>
                )}

                <Alert severity="warning" sx={{ mt: 2 }}>
                    This action cannot be undone. All car information and bookings will be permanently deleted.
                </Alert>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}