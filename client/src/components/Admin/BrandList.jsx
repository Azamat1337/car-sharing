import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandsDataSelector, getBrandsRequest } from '../../infrastructure/redux/brand/get/slice.js';
import {
    updateBrandRequest,
    updateBrandReset,
    updateBrandLoadingSelector,
    updateBrandErrorSelector,
    updateBrandSuccessSelector
} from '../../infrastructure/redux/brand/update/slice.js';
import {
    deleteBrandRequest,
    deleteBrandFailure,
} from '../../infrastructure/redux/brand/delete/slice.js';

export default function BrandList({ onCreate }) {
    const dispatch = useDispatch();
    const brands = useSelector(getBrandsDataSelector);

    const [editOpen, setEditOpen] = useState(false);
    const [editBrand, setEditBrand] = useState(null);
    const [editName, setEditName] = useState('');

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteBrand, setDeleteBrand] = useState(null);

    const loading = useSelector(updateBrandLoadingSelector);
    const error = useSelector(updateBrandErrorSelector);
    const success = useSelector(updateBrandSuccessSelector);

    const handleEditOpen = (brand) => {
        setEditBrand(brand);
        setEditName(brand.name);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setEditBrand(null);
        setEditName('');
        dispatch(updateBrandReset());
    };

    const handleEditSave = () => {
        if (!editName.trim() || !editBrand) return;
        dispatch(updateBrandRequest({ id: editBrand.id, name: editName.trim() }));
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                handleEditClose();
                dispatch(getBrandsRequest());
            }, 600);
        }
    }, [success, dispatch]);

    const handleDeleteOpen = (brand) => {
        setDeleteBrand(brand);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setDeleteBrand(null);
        dispatch(deleteBrandFailure(null));
    };

    const handleDeleteConfirm = () => {
        if (!deleteBrand) return;
        dispatch(deleteBrandRequest(deleteBrand.id));
        setTimeout(() => {
            setDeleteOpen(false);
            setDeleteBrand(null);
            dispatch(getBrandsRequest());
        }, 600);
    };

    return (
        <Box>
            <Box mb={2} display="flex" justifyContent="space-between">
                <Typography variant="h6">Бренды</Typography>
                <Button variant="contained" onClick={onCreate}>
                    Создать бренд
                </Button>
            </Box>
            <Box>
                {brands.map(b => (
                    <Box
                        key={b.id}
                        p={1}
                        borderBottom="1px solid #eee"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <span>{b.name}</span>
                        <Box>
                            <IconButton size="small" onClick={() => handleEditOpen(b)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDeleteOpen(b)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Редактировать бренд</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Название"
                        fullWidth
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        error={!!error}
                        helperText={error}
                        disabled={loading}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} disabled={loading}>
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleEditSave}
                        disabled={loading || !editName.trim()}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                <DialogTitle>Удалить бренд</DialogTitle>
                <DialogContent>
                    <Typography>
                        Вы действительно хотите удалить бренд <b>{deleteBrand?.name}</b>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteConfirm}
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}