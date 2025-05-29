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
    backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    padding: theme.spacing(4),
    minHeight: '100vh'
}));

const CarImageCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #333',
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.mode === 'dark' ? '#111' : '#fff'
}));

const InfoCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #333',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.mode === 'dark' ? '#222' : '#fafafa'
}));

export default function CarSharingCar() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [car, setCar] = useState(null);
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [duration, setDuration] = useState(0);

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
            setStartDateTime('');
            setEndDateTime('');
            setShowBookingModal(false);
            setTimeout(() => {
                dispatch(createBookingReset());
            }, 2000);
        }
    }, [bookingSuccess, dispatch]);

    // Расчет стоимости и длительности бронирования
    useEffect(() => {
        if (car && startDateTime && endDateTime) {
            const start = new Date(startDateTime);
            const end = new Date(endDateTime);
            let hours = (end - start) / (1000 * 60 * 60);
            if (hours > 0) {
                hours = Math.ceil(hours);
                setDuration(hours);
                setTotalPrice(hours * Number(car.hourlyPrice || 0));
            } else {
                setDuration(0);
                setTotalPrice(0);
            }
        } else {
            setDuration(0);
            setTotalPrice(0);
        }
    }, [car, startDateTime, endDateTime]);

    const handleOpenBookingModal = (e) => {
        e.preventDefault();
        if (!startDateTime || !endDateTime) return;
        setShowBookingModal(true);
    };

    const handleConfirmBooking = () => {
        setShowBookingModal(false);
        dispatch(createBookingRequest({
            carId: car.id,
            startTime: startDateTime,
            endTime: endDateTime
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
                                    : 'https://via.placeholder.com/600x300?text=Car'
                            }
                            alt={`${car.brand?.name || ''} ${car.model}`}
                            sx={{
                                filter: 'grayscale(1)',
                                background: '#222'
                            }}
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
                    <InfoCard component="form" onSubmit={handleOpenBookingModal}>
                        <Typography variant="h6" gutterBottom>
                            Почасовая аренда
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            Цена за час: <b>{car.hourlyPrice} ₽</b>
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
                                label="Начало"
                                type="datetime-local"
                                name="startDateTime"
                                InputLabelProps={{ shrink: true }}
                                required
                                sx={{ flex: 1, minWidth: 180 }}
                                value={startDateTime}
                                onChange={e => setStartDateTime(e.target.value)}
                                disabled={bookingLoading}
                            />
                            <TextField
                                label="Окончание"
                                type="datetime-local"
                                name="endDateTime"
                                InputLabelProps={{ shrink: true }}
                                required
                                sx={{ flex: 1, minWidth: 180 }}
                                value={endDateTime}
                                onChange={e => setEndDateTime(e.target.value)}
                                disabled={bookingLoading}
                            />
                        </Box>
                        <Typography sx={{ mb: 2 }}>
                            {duration > 0 && (
                                <>
                                    Длительность: <b>{duration} ч.</b><br />
                                    Итоговая стоимость: <b>{totalPrice} ₽</b>
                                </>
                            )}
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: '#000', color: '#fff' }}
                            disabled={bookingLoading || !startDateTime || !endDateTime || duration <= 0}
                        >
                            {bookingLoading ? 'Отправка...' : 'Забронировать'}
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
                                            <TableCell
                                                component="th"
                                                sx={{ borderBottom: 'none', fontWeight: 'bold', color: 'inherit' }}
                                            >
                                                {info.attributeName}
                                            </TableCell>
                                            <TableCell sx={{ borderBottom: 'none', color: 'inherit' }}>
                                                {info.attributeValue}
                                            </TableCell>
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

            {/* Модалка подтверждения бронирования */}
            <Dialog open={showBookingModal} onClose={() => setShowBookingModal(false)}>
                <DialogTitle>Подтвердить бронирование</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 1 }}>
                        <b>Машина:</b> {car.brand?.name} {car.model}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <b>С:</b> {startDateTime.replace('T', ' ')}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <b>По:</b> {endDateTime.replace('T', ' ')}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <b>Длительность:</b> {duration} ч.
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <b>Цена за час:</b> {car.hourlyPrice} ₽
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <b>Итого:</b> {totalPrice} ₽
                    </Typography>
                    {bookingError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {bookingError}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowBookingModal(false)} disabled={bookingLoading}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleConfirmBooking}
                        variant="contained"
                        disabled={bookingLoading}
                    >
                        {bookingLoading ? 'Бронирование...' : 'Подтвердить'}
                    </Button>
                </DialogActions>
            </Dialog>

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