import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { carService } from '../infrastructure/services/cars/carService';

// Redux selectors & actions
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

import CarImageBlock from '../components/Car/CarImageBlock.jsx';
import CarMainInfo from '../components/Car/CarMainInfo.jsx';
import CarBookingForm from '../components/Car/CarBookingForm.jsx';
import BookingConfirmDialog from '../components/Car/BookingConfirmDialog.jsx';
import CarInfoTable from '../components/Car/CarInfoTable.jsx';
import CarInfoDialog from '../components/Car/CarInfoDialog.jsx';

const CarPageContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    padding: theme.spacing(4),
    minHeight: '100vh'
}));

export default function CarSharingCar() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [car, setCar] = useState(null);
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Для модалок характеристик
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const [attributeName, setAttributeName] = useState('');
    const [attributeValue, setAttributeValue] = useState('');

    // Redux selectors
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

    // Получение данных о машине и характеристиках
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

    // --- carInfo handlers ---
    const handleOpenAdd = () => {
        setAttributeName('');
        setAttributeValue('');
        setOpenAdd(true);
    };

    const handleAddInfo = () => {
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

    const handleEditInfo = () => {
        if (!attributeName.trim() || !attributeValue.trim()) return;
        dispatch(updateCarInfoRequest({
            carId: car.id,
            infoId: editInfo.id,
            attributeName: attributeName.trim(),
            attributeValue: attributeValue.trim()
        }));
    };

    // --- booking handlers ---
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
                    <CarImageBlock car={car} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <CarMainInfo car={car} />
                    <CarBookingForm
                        startDate={startDateTime}
                        endDate={endDateTime}
                        setStartDate={setStartDateTime}
                        setEndDate={setEndDateTime}
                        onSubmit={handleOpenBookingModal}
                        bookingLoading={bookingLoading}
                        bookingError={bookingError}
                        bookingSuccess={bookingSuccess}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <CarInfoTable
                        carInfo={carInfo}
                        isAdmin={isAdmin}
                        onAdd={handleOpenAdd}
                        onEdit={handleOpenEdit}
                        onDelete={handleDeleteInfo}
                        loading={loadingInfo}
                        error={errorInfo}
                        createError={createError}
                        deleteError={deleteError}
                        updateError={updateError}
                        createLoading={createLoading}
                        deleteLoading={deleteLoading}
                        updateLoading={updateLoading}
                    />
                </Grid>
            </Grid>

            {/* Модалка подтверждения бронирования */}
            <BookingConfirmDialog
                open={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                onConfirm={handleConfirmBooking}
                car={car}
                startDate={startDateTime}
                endDate={endDateTime}
                loading={bookingLoading}
                error={bookingError}
            />

            {/* Модалка для добавления характеристики */}
            <CarInfoDialog
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onSubmit={handleAddInfo}
                attributeName={attributeName}
                attributeValue={attributeValue}
                setAttributeName={setAttributeName}
                setAttributeValue={setAttributeValue}
                loading={createLoading}
                error={createError}
                isEdit={false}
            />

            {/* Модалка для редактирования характеристики */}
            <CarInfoDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                onSubmit={handleEditInfo}
                attributeName={attributeName}
                attributeValue={attributeValue}
                setAttributeName={setAttributeName}
                setAttributeValue={setAttributeValue}
                loading={updateLoading}
                error={updateError}
                isEdit={true}
            />
        </CarPageContainer>
    );
}