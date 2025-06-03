import React from 'react';
import { Grid, Typography } from '@mui/material';
import TaxiRideCard from './TaxiRideCard';

export default function TaxiRideList({ rides, onJoin, joinLoading, profile }) {
    if (!rides || rides.length === 0) {
        return (
            <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
                Нет доступных поездок
            </Typography>
        );
    }

    return (
        <Grid container spacing={3}>
            {rides.map(ride => (
                <Grid item xs={12} sm={6} md={4} key={ride.id}>
                    <TaxiRideCard
                        ride={ride}
                        onJoin={onJoin}
                        joinLoading={joinLoading}
                        profile={profile}
                    />
                </Grid>
            ))}
        </Grid>
    );
}