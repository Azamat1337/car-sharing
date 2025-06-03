import React from 'react';
import { TextField, Box } from '@mui/material';

export default function TaxiSearchBar({ value, onChange }) {
    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                label="Search by destination"
                variant="outlined"
                fullWidth
                value={value}
                onChange={e => onChange(e.target.value)}
                size="small"
            />
        </Box>
    );
}