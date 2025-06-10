import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    CircularProgress,
    Alert,
    Switch,
    FormControlLabel
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getBrandsRequest, getBrandsDataSelector } from '../../infrastructure/redux/brand/get/slice';
import { getAllCompaniesRequest, getAllCompaniesDataSelector } from '../../infrastructure/redux/company/getAll/slice';

export default function CarEditDialog({ open, onClose, onSubmit, car, loading, error }) {
    const dispatch = useDispatch();
    const brands = useSelector(getBrandsDataSelector);
    const companies = useSelector(getAllCompaniesDataSelector);

    const [formData, setFormData] = useState({
        model: '',
        year: '',
        brandId: '',
        companyId: '',
        available: true,
        rentalType: '',
        dailyPrice: '',
        hourlyPrice: ''
    });

    useEffect(() => {
        dispatch(getBrandsRequest());
        dispatch(getAllCompaniesRequest());
    }, [dispatch]);

    useEffect(() => {
        if (car && open) {
            setFormData({
                model: car.model || '',
                year: car.year || '',
                brandId: car.brandId || '',
                companyId: car.companyId || '',
                available: car.available !== undefined ? car.available : true,
                rentalType: car.rentalType || '',
                dailyPrice: car.dailyPrice || '',
                hourlyPrice: car.hourlyPrice || ''
            });
        }
    }, [car, open]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        const updateData = {};

        if (formData.model !== car.model) updateData.model = formData.model;
        if (Number(formData.year) !== car.year) updateData.year = Number(formData.year);
        if (Number(formData.brandId) !== car.brandId) updateData.brandId = Number(formData.brandId);
        if (Number(formData.companyId) !== car.companyId) updateData.companyId = Number(formData.companyId) || null;
        if (formData.available !== car.available) updateData.available = formData.available;
        if (formData.rentalType !== car.rentalType) updateData.rentalType = formData.rentalType;
        if (Number(formData.dailyPrice) !== Number(car.dailyPrice)) updateData.dailyPrice = Number(formData.dailyPrice);
        if (Number(formData.hourlyPrice) !== Number(car.hourlyPrice)) updateData.hourlyPrice = Number(formData.hourlyPrice);

        onSubmit(updateData);
    };

    const isFormValid = () => {
        return formData.model.trim() &&
            formData.year &&
            formData.brandId &&
            formData.rentalType &&
            ((formData.rentalType === 'DAILY' || formData.rentalType === 'BOTH') ? formData.dailyPrice > 0 : true) &&
            ((formData.rentalType === 'HOURLY' || formData.rentalType === 'BOTH') ? formData.hourlyPrice > 0 : true);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Car</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Model"
                    fullWidth
                    value={formData.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                    disabled={loading}
                    required
                />

                <TextField
                    margin="dense"
                    label="Year"
                    type="number"
                    fullWidth
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    disabled={loading}
                    required
                    inputProps={{ min: 1990, max: new Date().getFullYear() + 1 }}
                />

                <FormControl fullWidth margin="dense" disabled={loading}>
                    <InputLabel>Brand</InputLabel>
                    <Select
                        value={formData.brandId}
                        label="Brand"
                        onChange={(e) => handleChange('brandId', e.target.value)}
                    >
                        {brands?.map(brand => (
                            <MenuItem key={brand.id} value={brand.id}>
                                {brand.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense" disabled={loading}>
                    <InputLabel>Company</InputLabel>
                    <Select
                        value={formData.companyId}
                        label="Company"
                        onChange={(e) => handleChange('companyId', e.target.value)}
                    >
                        <MenuItem value="">Not specified</MenuItem>
                        {companies?.map(company => (
                            <MenuItem key={company.id} value={company.id}>
                                {company.name}
                                {company.foundedYear && ` (${company.foundedYear})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense" disabled={loading}>
                    <InputLabel>Rental Type</InputLabel>
                    <Select
                        value={formData.rentalType}
                        label="Rental Type"
                        onChange={(e) => handleChange('rentalType', e.target.value)}
                    >
                        <MenuItem value="DAILY">Daily</MenuItem>
                        <MenuItem value="HOURLY">Hourly (Car Sharing)</MenuItem>
                        <MenuItem value="BOTH">Both</MenuItem>
                    </Select>
                </FormControl>

                {(formData.rentalType === 'DAILY' || formData.rentalType === 'BOTH') && (
                    <TextField
                        margin="dense"
                        label="Daily Price (₸)"
                        type="number"
                        fullWidth
                        value={formData.dailyPrice}
                        onChange={(e) => handleChange('dailyPrice', e.target.value)}
                        disabled={loading}
                        required
                        inputProps={{ min: 0, step: "0.01" }}
                    />
                )}

                {(formData.rentalType === 'HOURLY' || formData.rentalType === 'BOTH') && (
                    <TextField
                        margin="dense"
                        label="Hourly Price (₸)"
                        type="number"
                        fullWidth
                        value={formData.hourlyPrice}
                        onChange={(e) => handleChange('hourlyPrice', e.target.value)}
                        disabled={loading}
                        required
                        inputProps={{ min: 0, step: "0.01" }}
                    />
                )}

                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.available}
                            onChange={(e) => handleChange('available', e.target.checked)}
                            disabled={loading}
                        />
                    }
                    label="Available for booking"
                    sx={{ mt: 1 }}
                />

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
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading || !isFormValid()}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}