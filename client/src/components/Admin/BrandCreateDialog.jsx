import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    addBrandRequest,
    addBrandReset,
    addBrandLoadingSelector,
    addBrandErrorSelector,
    addBrandDataSelector
} from '../../infrastructure/redux/brand/add/slice';

export default function BrandCreateDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const loading = useSelector(addBrandLoadingSelector);
    const error = useSelector(addBrandErrorSelector);
    const newBrand = useSelector(addBrandDataSelector);
    const success = !!newBrand;

    const [brandName, setBrandName] = useState('');

    useEffect(() => {
        if (success) {
            setBrandName('');
            setTimeout(() => {
                dispatch(addBrandReset());
                onClose();
            }, 800);
        }
    }, [success, dispatch, onClose]);

    const handleCreate = () => {
        if (!brandName.trim()) return;
        dispatch(addBrandRequest(brandName.trim()));
    };

    const handleClose = () => {
        setBrandName('');
        dispatch(addBrandReset());
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Создать бренд</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Название"
                    fullWidth
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    error={!!error}
                    helperText={error}
                    disabled={loading}
                />
                {success && (
                    <Typography color="success.main" sx={{ mt: 1 }}>
                        Бренд успешно создан!
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
                    disabled={loading || !brandName.trim()}
                >
                    {loading ? <CircularProgress size={24} /> : 'Создать'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}