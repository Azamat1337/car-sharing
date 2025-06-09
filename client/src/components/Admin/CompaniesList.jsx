import React, { useEffect, useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Alert,
    IconButton,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCompaniesRequest,
    getAllCompaniesDataSelector,
    getAllCompaniesLoadingSelector,
    getAllCompaniesErrorSelector
} from '../../infrastructure/redux/company/getAll/slice';
import {
    deleteCompanyRequest,
    deleteCompanyReset,
    deleteCompanyLoadingSelector,
    deleteCompanyErrorSelector,
    deleteCompanySuccessSelector
} from '../../infrastructure/redux/company/delete/slice';
import {
    updateCompanyRequest,
    updateCompanyReset,
    updateCompanyLoadingSelector,
    updateCompanyErrorSelector,
    updateCompanyDataSelector
} from '../../infrastructure/redux/company/update/slice';

export default function CompaniesList() {
    const dispatch = useDispatch();
    const companies = useSelector(getAllCompaniesDataSelector);
    const loading = useSelector(getAllCompaniesLoadingSelector);
    const error = useSelector(getAllCompaniesErrorSelector);

    const deleteLoading = useSelector(deleteCompanyLoadingSelector);
    const deleteError = useSelector(deleteCompanyErrorSelector);
    const deleteSuccess = useSelector(deleteCompanySuccessSelector);

    const updateLoading = useSelector(updateCompanyLoadingSelector);
    const updateError = useSelector(updateCompanyErrorSelector);
    const updatedCompany = useSelector(updateCompanyDataSelector);
    const updateSuccess = !!updatedCompany;

    const [deleteDialog, setDeleteDialog] = useState({ open: false, company: null });
    const [editDialog, setEditDialog] = useState({ open: false, company: null });
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        foundedYear: ''
    });

    useEffect(() => {
        if (deleteSuccess) {
            setDeleteDialog({ open: false, company: null });
            dispatch(getAllCompaniesRequest());
            dispatch(deleteCompanyReset());
        }
    }, [deleteSuccess, dispatch]);

    useEffect(() => {
        if (updateSuccess) {
            setEditDialog({ open: false, company: null });
            setEditForm({ name: '', description: '', foundedYear: '' });
            dispatch(getAllCompaniesRequest());
            dispatch(updateCompanyReset());
        }
    }, [updateSuccess, dispatch]);

    const handleDeleteClick = (company) => {
        setDeleteDialog({ open: true, company });
    };

    const handleDeleteConfirm = () => {
        if (deleteDialog.company) {
            dispatch(deleteCompanyRequest(deleteDialog.company.id));
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialog({ open: false, company: null });
        dispatch(deleteCompanyReset());
    };

    const handleEditClick = (company) => {
        setEditForm({
            name: company.name || '',
            description: company.description || '',
            foundedYear: company.foundedYear ? company.foundedYear.toString() : ''
        });
        setEditDialog({ open: true, company });
    };

    const handleEditConfirm = () => {
        if (editDialog.company) {
            dispatch(updateCompanyRequest({
                id: editDialog.company.id,
                name: editForm.name.trim(),
                description: editForm.description.trim(),
                foundedYear: editForm.foundedYear ? parseInt(editForm.foundedYear) : null
            }));
        }
    };

    const handleEditCancel = () => {
        setEditDialog({ open: false, company: null });
        setEditForm({ name: '', description: '', foundedYear: '' });
        dispatch(updateCompanyReset());
    };

    const handleFormChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 1 }}>
                {error}
            </Alert>
        );
    }

    if (!companies || companies.length === 0) {
        return (
            <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                Компании не найдены
            </Typography>
        );
    }

    return (
        <>
            <List>
                {companies.map((company) => (
                    <ListItem
                        key={company.id}
                        divider
                        secondaryAction={
                            <Box>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    sx={{ mr: 1 }}
                                    onClick={() => handleEditClick(company)}
                                    disabled={updateLoading}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => handleDeleteClick(company)}
                                    disabled={deleteLoading}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        }
                    >
                        <ListItemText
                            primary={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="subtitle1">
                                        {company.name}
                                    </Typography>
                                    {company.cars && (
                                        <Chip
                                            label={`${company.cars.length} машин`}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                            }
                            secondary={
                                <Box>
                                    {company.description && (
                                        <Typography variant="body2" color="text.secondary">
                                            {company.description}
                                        </Typography>
                                    )}
                                    {company.foundedYear && (
                                        <Typography variant="caption" color="text.secondary">
                                            Основана: {company.foundedYear}
                                        </Typography>
                                    )}
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            {deleteError && (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {deleteError}
                </Alert>
            )}

            {updateError && (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {updateError}
                </Alert>
            )}

            <Dialog
                open={deleteDialog.open}
                onClose={handleDeleteCancel}
            >
                <DialogTitle>Удалить компанию</DialogTitle>
                <DialogContent>
                    <Typography>
                        Вы уверены, что хотите удалить компанию "{deleteDialog.company?.name}"?
                    </Typography>
                    {deleteDialog.company?.cars?.length > 0 && (
                        <Alert severity="warning" sx={{ mt: 2 }}>
                            У этой компании есть {deleteDialog.company.cars.length} машин(ы).
                            Удаление может быть невозможно.
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} disabled={deleteLoading}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? <CircularProgress size={20} /> : 'Удалить'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={editDialog.open}
                onClose={handleEditCancel}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Редактировать компанию</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Название компании"
                        fullWidth
                        value={editForm.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        error={!!updateError}
                        disabled={updateLoading}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Описание"
                        fullWidth
                        multiline
                        minRows={3}
                        value={editForm.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        disabled={updateLoading}
                    />
                    <TextField
                        margin="dense"
                        label="Год основания"
                        fullWidth
                        type="number"
                        value={editForm.foundedYear}
                        onChange={(e) => handleFormChange('foundedYear', e.target.value)}
                        disabled={updateLoading}
                        inputProps={{ min: 1800, max: new Date().getFullYear() }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditCancel} disabled={updateLoading}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleEditConfirm}
                        variant="contained"
                        disabled={updateLoading || !editForm.name.trim()}
                    >
                        {updateLoading ? <CircularProgress size={20} /> : 'Сохранить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}