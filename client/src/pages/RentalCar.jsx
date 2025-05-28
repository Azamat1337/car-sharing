import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button,
    Alert,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { carService } from '../infrastructure/services/cars/carService';
import {
    getCarInfoRequest,
    carInfoLoadingSelector,
    carInfoErrorSelector,
    carInfoDataSelector
} from '../infrastructure/redux/carInfo/get/slice';
import {
    createBookingRequest,
    createBookingLoadingSelector,
    createBookingErrorSelector,
    createBookingSuccessSelector,
    createBookingReset
} from '../infrastructure/redux/booking/create/slice';

import {
    createCarInfoRequest,
    createCarInfoReset,
    createCarInfoLoadingSelector,
    createCarInfoErrorSelector,
    createCarInfoSuccessSelector
} from '../infrastructure/redux/carInfo/create/slice';
import {
    deleteCarInfoRequest,
    deleteCarInfoReset,
    deleteCarInfoLoadingSelector,
    deleteCarInfoErrorSelector,
    deleteCarInfoSuccessSelector
} from '../infrastructure/redux/carInfo/delete/slice';
import {
    updateCarInfoRequest,
    updateCarInfoReset,
    updateCarInfoLoadingSelector,
    updateCarInfoErrorSelector,
    updateCarInfoSuccessSelector
} from '../infrastructure/redux/carInfo/update/slice';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CarPageContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#fff',
    color: '#000',
    padding: theme.spacing(4),
    minHeight: '100vh'
}));

const CarImageCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius
}));

const InfoCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
}));

export default function CarPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Для модалок характеристик
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const [attributeName, setAttributeName] = useState('');
    const [attributeValue, setAttributeValue] = useState('');

    const loadingInfo = useSelector(carInfoLoadingSelector);
    const errorInfo = useSelector(carInfoErrorSelector);
    const carInfo = useSelector(carInfoDataSelector);

    const bookingLoading = useSelector(createBookingLoadingSelector);
    const bookingError = useSelector(createBookingErrorSelector);
    const bookingSuccess = useSelector(createBookingSuccessSelector);

    // carInfo create
    const createLoading = useSelector(createCarInfoLoadingSelector);
    const createError = useSelector(createCarInfoErrorSelector);
    const createSuccess = useSelector(createCarInfoSuccessSelector);

    // carInfo delete
    const deleteLoading = useSelector(deleteCarInfoLoadingSelector);
    const deleteError = useSelector(deleteCarInfoErrorSelector);
    const deleteSuccess = useSelector(deleteCarInfoSuccessSelector);

    // carInfo update
    const updateLoading = useSelector(updateCarInfoLoadingSelector);
    const updateError = useSelector(updateCarInfoErrorSelector);
    const updateSuccess = useSelector(updateCarInfoSuccessSelector);

    // Получаем профиль пользователя для проверки роли
    const profile = useSelector(state => state.user.profile);
    const isAdmin = profile?.role === 'ADMIN';


    useEffect(() => {
        async function fetchCar() {
            try {
                const data = await carService.fetchById(id);
                setCar(data);
            } catch (e) {
                setCar(null);
            }
        }
        fetchCar();
        dispatch(getCarInfoRequest(id));
    }, [id, dispatch]);

    // После успешного добавления/удаления/апдейта обновляем список характеристик
    useEffect(() => {
        if (createSuccess || deleteSuccess || updateSuccess) {
            dispatch(getCarInfoRequest(id));
        }
        if (createSuccess) {
            setOpenAdd(false);
            setAttributeName('');
            setAttributeValue('');
            setTimeout(() => dispatch(createCarInfoReset()), 1000);
        }
        if (deleteSuccess) {
            setTimeout(() => dispatch(deleteCarInfoReset()), 1000);
        }
        if (updateSuccess) {
            setOpenEdit(false);
            setEditInfo(null);
            setAttributeName('');
            setAttributeValue('');
            setTimeout(() => dispatch(updateCarInfoReset()), 1000);
        }
    }, [createSuccess, deleteSuccess, updateSuccess, dispatch, id]);

    useEffect(() => {
        if (bookingSuccess) {
            setStartDate('');
            setEndDate('');
            setTimeout(() => {
                dispatch(createBookingReset());
            }, 2000);
        }
    }, [bookingSuccess, dispatch]);

    const handleRent = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) return;
        dispatch(createBookingRequest({
            carId: car.id,
            startTime: startDate,
            endTime: endDate
        }));
    };

    // --- carInfo handlers ---
    const handleOpenAdd = () => {
        setAttributeName('');
        setAttributeValue('');
        setOpenAdd(true);
    };

    const handleAddInfo = (e) => {
        e.preventDefault();
        if (!attributeName.trim() || !attributeValue.trim()) return;
        dispatch(createCarInfoRequest({
            carId: car.id,
            attributeName: attributeName.trim(),
            attributeValue: attributeValue.trim()
        }));
    };

    const handleDeleteInfo = (infoId) => {
        if (window.confirm('Удалить характеристику?')) {
            dispatch(deleteCarInfoRequest({ carId: car.id, infoId }));
        }
    };

    const handleOpenEdit = (info) => {
        setEditInfo(info);
        setAttributeName(info.attributeName);
        setAttributeValue(info.attributeValue);
        setOpenEdit(true);
    };

    const handleEditInfo = (e) => {
        e.preventDefault();
        if (!attributeName.trim() || !attributeValue.trim()) return;
        dispatch(updateCarInfoRequest({
            carId: car.id,
            infoId: editInfo.id,
            attributeName: attributeName.trim(),
            attributeValue: attributeValue.trim()
        }));
    };

    if (!car) {
        return (
            <CarPageContainer maxWidth="md">
                <Typography variant="h5" align="center" sx={{ mt: 8 }}>
                    Машина не найдена
                </Typography>
            </CarPageContainer>
        );
    }

    return (
        <CarPageContainer maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <CarImageCard>
                        <CardMedia
                            component="img"
                            image={
                                car.img
                                    ? (car.img.startsWith('http')
                                        ? car.img
                                        : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/static/${car.img}`)
                                    : null
                            }
                            alt={`${car.brand?.name || ''} ${car.model}`}
                        />
                    </CarImageCard>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        {car.brand?.name} {car.model} ({car.year})
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {car.description || ''}
                    </Typography>

                    <InfoCard component="form" onSubmit={handleRent}>
                        <Typography variant="h6" gutterBottom>
                            Rent this car
                        </Typography>
                        {bookingSuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Заявка на аренду успешно отправлена!
                            </Alert>
                        )}
                        {bookingError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {bookingError}
                            </Alert>
                        )}
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                            <TextField
                                label="Start Date"
                                type="date"
                                name="startDate"
                                InputLabelProps={{ shrink: true }}
                                required
                                sx={{ flex: 1, minWidth: 160 }}
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                disabled={bookingLoading}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                name="endDate"
                                InputLabelProps={{ shrink: true }}
                                required
                                sx={{ flex: 1, minWidth: 160 }}
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                disabled={bookingLoading}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: '#000', color: '#fff' }}
                            disabled={bookingLoading}
                        >
                            {bookingLoading ? 'Отправка...' : 'Rent Now'}
                        </Button>
                    </InfoCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <InfoCard>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h6" gutterBottom>
                                Характеристики
                            </Typography>
                            {isAdmin && (
                                <Button size="small" variant="outlined" onClick={handleOpenAdd}>
                                    Добавить
                                </Button>
                            )}
                        </Box>
                        {createError && <Alert severity="error" sx={{ mb: 1 }}>{createError}</Alert>}
                        {deleteError && <Alert severity="error" sx={{ mb: 1 }}>{deleteError}</Alert>}
                        {updateError && <Alert severity="error" sx={{ mb: 1 }}>{updateError}</Alert>}
                        {loadingInfo && <Typography>Загрузка характеристик...</Typography>}
                        {errorInfo && <Typography color="error">{errorInfo}</Typography>}
                        {!loadingInfo && !errorInfo && (
                            <Table size="small">
                                <TableBody>
                                    {carInfo.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={isAdmin ? 3 : 2}>Нет характеристик</TableCell>
                                        </TableRow>
                                    )}
                                    {carInfo.map(info => (
                                        <TableRow key={info.id}>
                                            <TableCell component="th" sx={{ borderBottom: 'none', fontWeight: 'bold' }}>
                                                {info.attributeName}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: 'none' }}>{info.attributeValue}</TableCell>
                                            {isAdmin && (
                                                <TableCell sx={{ borderBottom: 'none', whiteSpace: 'nowrap' }}>
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => handleOpenEdit(info)}
                                                        disabled={updateLoading}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDeleteInfo(info.id)}
                                                        disabled={deleteLoading}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </InfoCard>
                </Grid>
            </Grid>

            {/* Модалка для добавления характеристики */}
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
                <DialogTitle>Добавить характеристику</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleAddInfo} sx={{ mt: 1 }}>
                        <TextField
                            label="Название"
                            value={attributeName}
                            onChange={e => setAttributeName(e.target.value)}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Значение"
                            value={attributeValue}
                            onChange={e => setAttributeValue(e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    {createLoading && <Typography sx={{ mt: 1 }}>Добавление...</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAdd(false)} disabled={createLoading}>Отмена</Button>
                    <Button onClick={handleAddInfo} variant="contained" disabled={createLoading}>
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Модалка для редактирования характеристики */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>Редактировать характеристику</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleEditInfo} sx={{ mt: 1 }}>
                        <TextField
                            label="Название"
                            value={attributeName}
                            onChange={e => setAttributeName(e.target.value)}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Значение"
                            value={attributeValue}
                            onChange={e => setAttributeValue(e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                    {updateLoading && <Typography sx={{ mt: 1 }}>Сохранение...</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)} disabled={updateLoading}>Отмена</Button>
                    <Button onClick={handleEditInfo} variant="contained" disabled={updateLoading}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </CarPageContainer>
    );
}