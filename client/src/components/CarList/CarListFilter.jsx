import React from 'react';
import { Box, TextField, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" gutterBottom>
                    Brand Filter
                </Typography>
                {selectedBrand && (
                    <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={() => onBrandChange(null)}
                        sx={{
                            ml: 1,
                            minWidth: 0,
                            px: 1.5,
                            fontSize: 12,
                            borderColor: 'grey.400',
                            color: 'grey.700',
                        }}
                    >
                        Clear
                    </Button>
                )}
            </Box>
            <List>
                {brands.map((brand) => (
                    <ListItem
                        button
                        key={brand.id}
                        selected={selectedBrand === brand.id}
                        onClick={() => onBrandChange(brand.id)}
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 1,
                            mb: 0.5,
                            backgroundColor: selectedBrand === brand.id
                                ? (theme) => theme.palette.mode === 'light' ? '#111' : '#fff'
                                : 'transparent',
                            color: selectedBrand === brand.id
                                ? (theme) => theme.palette.mode === 'light' ? '#fff' : '#111'
                                : 'inherit',
                            fontWeight: selectedBrand === brand.id ? 700 : 400,
                            '&:hover': {
                                backgroundColor: (theme) =>
                                    selectedBrand === brand.id
                                        ? (theme.palette.mode === 'light' ? '#111' : '#fff')
                                        : (theme.palette.mode === 'light' ? '#f5f5f5' : '#222'),
                            },
                        }}
                    >
                        <ListItemText
                            primary={brand.name}
                            primaryTypographyProps={{
                                fontWeight: selectedBrand === brand.id ? 700 : 400,
                                color: selectedBrand === brand.id
                                    ? (theme) => theme.palette.mode === 'light' ? '#fff' : '#111'
                                    : 'inherit',
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <TextField
                label="Model search"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
                value={search}
                onChange={e => onSearchChange(e.target.value)}
            />
            <TextField
                label="Year from"
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
                label="Year to"
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