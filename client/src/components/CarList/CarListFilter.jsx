import React from 'react';
import { Box, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function CarListFilter({
    brands,
    selectedBrand,
    onBrandChange,
    search,
    onSearchChange,
    yearFrom,
    onYearFromChange,
    yearTo,
    onYearToChange
}) {
    return (
        <Box sx={{ width: 240, mr: 2 }}>
            <Typography variant="h6" gutterBottom>
                Фильтр по бренду
            </Typography>
            <List>
                {brands.map((brand) => (
                    <ListItem
                        button
                        key={brand.id}
                        selected={selectedBrand === brand.id}
                        onClick={() => onBrandChange(brand.id)}
                    >
                        <ListItemText primary={brand.name} />
                    </ListItem>
                ))}
            </List>
            <TextField
                label="Поиск по модели"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
                value={search}
                onChange={e => onSearchChange(e.target.value)}
            />
            <TextField
                label="Год от"
                variant="outlined"
                size="small"
                type="number"
                value={yearFrom}
                onChange={e => onYearFromChange(e.target.value)}
                InputProps={{ inputProps: { min: 2000, max: new Date().getFullYear() } }}
                sx={{ mt: 2 }}
                fullWidth
            />
            <TextField
                label="Год до"
                variant="outlined"
                size="small"
                type="number"
                value={yearTo}
                onChange={e => onYearToChange(e.target.value)}
                InputProps={{ inputProps: { min: 2000, max: new Date().getFullYear() } }}
                sx={{ mt: 2 }}
                fullWidth
            />
        </Box>
    );
}