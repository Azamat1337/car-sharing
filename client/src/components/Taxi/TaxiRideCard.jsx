import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const statusColors = {
    PENDING: 'warning',
    APPROVED: 'success',
    REJECTED: 'error'
};

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    boxShadow: theme.shadows[2],
}));

export default function TaxiRideCard({ ride, onJoin, joinLoading, profile }) {
    const theme = useTheme();
    const isCreator = profile?.id === ride.userId;

    return (
        <StyledCard>
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
                    <strong>Creator ID:</strong> {ride.userId}
                </Typography>
                <Typography variant="body2">
                    <strong>Seats available:</strong> {ride.seatsAvailable}
                </Typography>
            </CardContent>
            <CardActions>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={joinLoading || isCreator || ride.status !== 'APPROVED'}
                    onClick={() => onJoin(ride.id)}
                >
                    Join
                </Button>
            </CardActions>
        </StyledCard>
    );
}