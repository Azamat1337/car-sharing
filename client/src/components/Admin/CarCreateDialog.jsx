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
    CircularProgress
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

export default function CarCreateDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const brands = useSelector(getBrandsDataSelector);
    const loading = useSelector(addCarLoadingSelector);
    const error = useSelector(addCarErrorSelector);
    const success = useSelector(addCarSuccessSelector);

    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [brandId, setBrandId] = useState('');
    const [rentalType, setRentalType] = useState('');
    const [dailyPrice, setDailyPrice] = useState('');
    const [hourlyPrice, setHourlyPrice] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(getBrandsRequest());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setModel('');
            setYear('');
            setBrandId('');
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
        if (!model.trim() || !year || !brandId || !rentalType) return;
        const formData = new FormData();
        formData.append('model', model.trim());
        formData.append('year', year);
        formData.append('brandId', brandId);
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
        setRentalType('');
        setDailyPrice('');
        setHourlyPrice('');
        setImage(null);
        dispatch(addCarReset());
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
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
                />
                <Select
                    margin="dense"
                    fullWidth
                    value={brandId}
                    displayEmpty
                    onChange={e => setBrandId(e.target.value)}
                    error={!!error}
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    <MenuItem value="" disabled>Выберите бренд</MenuItem>
                    {brands.map(b => (
                        <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                    ))}
                </Select>
                <Select
                    margin="dense"
                    fullWidth
                    value={rentalType}
                    displayEmpty
                    onChange={e => setRentalType(e.target.value)}
                    error={!!error}
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    <MenuItem value="" disabled>Выберите тип аренды</MenuItem>
                    <MenuItem value="DAILY">Посуточно</MenuItem>
                    <MenuItem value="HOURLY">Почасовой (каршеринг)</MenuItem>
                    <MenuItem value="BOTH">Оба варианта</MenuItem>
                </Select>
                {(rentalType === 'DAILY' || rentalType === 'BOTH') && (
                    <TextField
                        margin="dense"
                        label="Цена за сутки (Tг)"
                        type="number"
                        fullWidth
                        value={dailyPrice}
                        onChange={e => setDailyPrice(e.target.value)}
                        error={!!error}
                        sx={{ mt: 2 }}
                        disabled={loading}
                    />
                )}
                {(rentalType === 'HOURLY' || rentalType === 'BOTH') && (
                    <TextField
                        margin="dense"
                        label="Цена за час (Tг)"
                        type="number"
                        fullWidth
                        value={hourlyPrice}
                        onChange={e => setHourlyPrice(e.target.value)}
                        error={!!error}
                        sx={{ mt: 2 }}
                        disabled={loading}
                    />
                )}
                <Button
                    variant="outlined"
                    component="label"
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
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>
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
                    disabled={loading || !model.trim() || !year || !brandId || !rentalType}
                >
                    {loading ? <CircularProgress size={24} /> : 'Создать'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}