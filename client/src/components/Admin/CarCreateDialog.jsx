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
    Typography,
    CircularProgress,
    FormControl,
    InputLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCarRequest,
    addCarReset,
    addCarLoadingSelector,
    addCarErrorSelector,
    addCarSuccessSelector
} from '../../infrastructure/redux/car/add/slice.js';
import { getBrandsDataSelector, getBrandsRequest } from '../../infrastructure/redux/brand/get/slice.js';
import { getAllCompaniesDataSelector, getAllCompaniesRequest } from '../../infrastructure/redux/company/getAll/slice.js';

export default function CarCreateDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const brands = useSelector(getBrandsDataSelector);
    const companies = useSelector(getAllCompaniesDataSelector);
    const loading = useSelector(addCarLoadingSelector);
    const error = useSelector(addCarErrorSelector);
    const success = useSelector(addCarSuccessSelector);

    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [brandId, setBrandId] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [rentalType, setRentalType] = useState('');
    const [dailyPrice, setDailyPrice] = useState('');
    const [hourlyPrice, setHourlyPrice] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(getBrandsRequest());
        dispatch(getAllCompaniesRequest());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setModel('');
            setYear('');
            setBrandId('');
            setCompanyId('');
            setRentalType('');
            setDailyPrice('');
            setHourlyPrice('');
            setImage(null);
            setTimeout(() => {
                dispatch(addCarReset());
                onClose();
            }, 800);
        }
    }, [success, dispatch, onClose]);

    const handleCreate = () => {
        if (!model.trim() || !year || !brandId || !companyId || !rentalType) return;
        const formData = new FormData();
        formData.append('model', model.trim());
        formData.append('year', year);
        formData.append('brandId', brandId);
        formData.append('companyId', companyId);
        formData.append('rentalType', rentalType);
        if (rentalType === 'DAILY' || rentalType === 'BOTH') {
            formData.append('dailyPrice', dailyPrice);
        }
        if (rentalType === 'HOURLY' || rentalType === 'BOTH') {
            formData.append('hourlyPrice', hourlyPrice);
        }
        if (image) {
            formData.append('img', image);
        }
        dispatch(addCarRequest(formData));
    };

    const handleClose = () => {
        setModel('');
        setYear('');
        setBrandId('');
        setCompanyId('');
        setRentalType('');
        setDailyPrice('');
        setHourlyPrice('');
        setImage(null);
        dispatch(addCarReset());
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Создать машину</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Модель"
                    fullWidth
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    error={!!error}
                    disabled={loading}
                />
                <TextField
                    margin="dense"
                    label="Год"
                    type="number"
                    fullWidth
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    error={!!error}
                    disabled={loading}
                    inputProps={{ min: 1990, max: new Date().getFullYear() + 1 }}
                />

                <FormControl fullWidth margin="dense" error={!!error} disabled={loading}>
                    <InputLabel>Бренд</InputLabel>
                    <Select
                        value={brandId}
                        label="Бренд"
                        onChange={e => setBrandId(e.target.value)}
                    >
                        {brands?.map(brand => (
                            <MenuItem key={brand.id} value={brand.id}>
                                {brand.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense" error={!!error} disabled={loading}>
                    <InputLabel>Компания</InputLabel>
                    <Select
                        value={companyId}
                        label="Компания"
                        onChange={e => setCompanyId(e.target.value)}
                    >
                        {companies?.map(company => (
                            <MenuItem key={company.id} value={company.id}>
                                {company.name}
                                {company.foundedYear && ` (${company.foundedYear})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense" error={!!error} disabled={loading}>
                    <InputLabel>Тип аренды</InputLabel>
                    <Select
                        value={rentalType}
                        label="Тип аренды"
                        onChange={e => setRentalType(e.target.value)}
                    >
                        <MenuItem value="DAILY">Посуточно</MenuItem>
                        <MenuItem value="HOURLY">Почасовой (каршеринг)</MenuItem>
                        <MenuItem value="BOTH">Оба варианта</MenuItem>
                    </Select>
                </FormControl>

                {(rentalType === 'DAILY' || rentalType === 'BOTH') && (
                    <TextField
                        margin="dense"
                        label="Цена за сутки (₸)"
                        type="number"
                        fullWidth
                        value={dailyPrice}
                        onChange={e => setDailyPrice(e.target.value)}
                        error={!!error}
                        disabled={loading}
                        inputProps={{ min: 0, step: "0.01" }}
                    />
                )}

                {(rentalType === 'HOURLY' || rentalType === 'BOTH') && (
                    <TextField
                        margin="dense"
                        label="Цена за час (₸)"
                        type="number"
                        fullWidth
                        value={hourlyPrice}
                        onChange={e => setHourlyPrice(e.target.value)}
                        error={!!error}
                        disabled={loading}
                        inputProps={{ min: 0, step: "0.01" }}
                    />
                )}

                <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {image ? `Изображение: ${image.name}` : 'Загрузить изображение'}
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={e => setImage(e.target.files[0])}
                    />
                </Button>

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography color="success.main" sx={{ mt: 1 }}>
                        Машина успешно создана!
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    Отмена
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={loading || !model.trim() || !year || !brandId || !companyId || !rentalType}
                >
                    {loading ? <CircularProgress size={24} /> : 'Создать'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}