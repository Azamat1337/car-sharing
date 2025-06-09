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
    createCompanyRequest,
    createCompanyReset,
    createCompanyLoadingSelector,
    createCompanyErrorSelector,
    createCompanyDataSelector
} from '../../infrastructure/redux/company/create/slice';
import { getAllCompaniesRequest } from '../../infrastructure/redux/company/getAll/slice';

export default function CompanyCreateDialog({ open, onClose }) {
    const dispatch = useDispatch();
    const loading = useSelector(createCompanyLoadingSelector);
    const error = useSelector(createCompanyErrorSelector);
    const newCompany = useSelector(createCompanyDataSelector);
    const success = !!newCompany;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [foundedYear, setFoundedYear] = useState('');

    useEffect(() => {
        if (success) {
            setName('');
            setDescription('');
            setFoundedYear('');
            dispatch(getAllCompaniesRequest());
            setTimeout(() => {
                dispatch(createCompanyReset());
                onClose();
            }, 800);
        }
    }, [success, dispatch, onClose]);

    const handleCreate = () => {
        if (!name.trim()) return;
        dispatch(createCompanyRequest({
            name: name.trim(),
            description: description.trim(),
            foundedYear: foundedYear ? parseInt(foundedYear) : null
        }));
    };

    const handleClose = () => {
        setName('');
        setDescription('');
        setFoundedYear('');
        dispatch(createCompanyReset());
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Создать компанию</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Название компании"
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={!!error}
                    helperText={error}
                    disabled={loading}
                    required
                />
                <TextField
                    margin="dense"
                    label="Описание"
                    fullWidth
                    multiline
                    minRows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    margin="dense"
                    label="Год основания"
                    fullWidth
                    type="number"
                    value={foundedYear}
                    onChange={e => setFoundedYear(e.target.value)}
                    disabled={loading}
                    inputProps={{ min: 1800, max: new Date().getFullYear() }}
                />
                {success && (
                    <Typography color="success.main" sx={{ mt: 1 }}>
                        Компания успешно создана!
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
                    disabled={loading || !name.trim()}
                >
                    {loading ? <CircularProgress size={24} /> : 'Создать'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}