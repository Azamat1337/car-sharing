import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box, IconButton, Tooltip, Snackbar, Alert as MuiAlert } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import {
    deleteCarRequest,
    deleteCarReset,
    deleteCarLoadingSelector,
    deleteCarErrorSelector,
    deleteCarSuccessSelector
} from '../infrastructure/redux/car/delete/slice';
import {
    updateCarRequest,
    updateCarReset,
    updateCarLoadingSelector,
    updateCarErrorSelector,
    updateCarDataSelector
} from '../infrastructure/redux/car/update/slice';

import CarImageBlock from '../components/Car/CarImageBlock.jsx';
import CarMainInfo from '../components/Car/CarMainInfo.jsx';
import CarBookingForm from '../components/Car/CarBookingForm.jsx';
import BookingConfirmDialog from '../components/Car/BookingConfirmDialog.jsx';
import CarInfoTable from '../components/Car/CarInfoTable.jsx';
import CarInfoDialog from '../components/Car/CarInfoDialog.jsx';
import CarDeleteDialog from '../components/Admin/CarDeleteDialog.jsx';
import CarEditDialog from '../components/Admin/CarEditDialog.jsx';

const CarPageContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    padding: theme.spacing(4),
    minHeight: '100vh',
    '&.MuiContainer-root': {
        backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fff',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    }
}));

const ImageContainer = styled(Box)({
    position: 'relative',
    width: '100%',
});

const AdminControls = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(1),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(0.5),
    zIndex: 10,
}));

export default function RentalCar() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const [attributeName, setAttributeName] = useState('');
    const [attributeValue, setAttributeValue] = useState('');

    const [openDeleteCar, setOpenDeleteCar] = useState(false);
    const [openEditCar, setOpenEditCar] = useState(false);

    const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

    const loadingInfo = useSelector(carInfoLoadingSelector);
    const errorInfo = useSelector(carInfoErrorSelector);
    const carInfo = useSelector(carInfoDataSelector);

    const bookingLoading = useSelector(createBookingLoadingSelector);
    const bookingError = useSelector(createBookingErrorSelector);
    const bookingSuccess = useSelector(createBookingSuccessSelector);

    const createLoading = useSelector(createCarInfoLoadingSelector);
    const createError = useSelector(createCarInfoErrorSelector);
    const createSuccess = useSelector(createCarInfoSuccessSelector);

    const deleteLoading = useSelector(deleteCarInfoLoadingSelector);
    const deleteError = useSelector(deleteCarInfoErrorSelector);
    const deleteSuccess = useSelector(deleteCarInfoSuccessSelector);

    const updateLoading = useSelector(updateCarInfoLoadingSelector);
    const updateError = useSelector(updateCarInfoErrorSelector);
    const updateSuccess = useSelector(updateCarInfoSuccessSelector);

    const deleteCarLoading = useSelector(deleteCarLoadingSelector);
    const deleteCarError = useSelector(deleteCarErrorSelector);
    const deleteCarSuccess = useSelector(deleteCarSuccessSelector);

    const updateCarLoading = useSelector(updateCarLoadingSelector);
    const updateCarError = useSelector(updateCarErrorSelector);
    const updatedCar = useSelector(updateCarDataSelector);
    const updateCarSuccess = !!updatedCar;

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
            setShowBookingModal(false);
            setAlert({ open: true, type: 'success', message: 'Booking is successful!' });
            setTimeout(() => {
                dispatch(createBookingReset());
            }, 2000);
        }
    }, [bookingSuccess, dispatch]);

    useEffect(() => {
        if (bookingError) {
            setAlert({ open: true, type: 'error', message: bookingError });
        }
    }, [bookingError]);

    useEffect(() => {
        if (deleteCarSuccess) {
            setOpenDeleteCar(false);
            setAlert({ open: true, type: 'success', message: 'Car deleted successfully!' });
            setTimeout(() => {
                dispatch(deleteCarReset());
                navigate('/rental');
            }, 1000);
        }
    }, [deleteCarSuccess, dispatch, navigate]);

    useEffect(() => {
        if (updateCarSuccess) {
            setOpenEditCar(false);
            setCar(updatedCar);
            setAlert({ open: true, type: 'success', message: 'Car updated successfully!' });
            setTimeout(() => {
                dispatch(updateCarReset());
            }, 1000);
        }
    }, [updateCarSuccess, updatedCar, dispatch]);

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
        if (window.confirm('Delete a specification?')) {
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

    const handleOpenBookingModal = (e) => {
        if (!profile) {
            setAlert({ open: true, type: 'error', message: 'Log in to your booking account.' });
            return;
        }
        if (!startDate || !endDate) {
            setAlert({ open: true, type: 'error', message: 'Select the booking dates.' });
            return;
        }
        setShowBookingModal(true);
    };

    const handleConfirmBooking = () => {
        dispatch(createBookingRequest({
            carId: car.id,
            startTime: startDate,
            endTime: endDate
        }));
    };

    const handleDeleteCarClick = () => {
        setOpenDeleteCar(true);
    };

    const handleEditCarClick = () => {
        setOpenEditCar(true);
    };

    const handleDeleteCarConfirm = () => {
        dispatch(deleteCarRequest(car.id));
    };

    const handleDeleteCarClose = () => {
        setOpenDeleteCar(false);
        dispatch(deleteCarReset());
    };

    const handleEditCarSubmit = (formData) => {
        dispatch(updateCarRequest({ id: car.id, ...formData }));
    };

    const handleEditCarClose = () => {
        setOpenEditCar(false);
        dispatch(updateCarReset());
    };

    const handleCloseAlert = () => setAlert({ ...alert, open: false });

    if (!car) {
        return (
            <CarPageContainer maxWidth="md">
                <Typography variant="h5" align="center" sx={{ mt: 8 }}>
                    The car was not found
                </Typography>
            </CarPageContainer>
        );
    }

    return (
        <CarPageContainer maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <ImageContainer>
                        {isAdmin && (
                            <AdminControls>
                                <Tooltip title="Edit car">
                                    <IconButton
                                        size="small"
                                        onClick={handleEditCarClick}
                                        disabled={updateCarLoading || deleteCarLoading}
                                        sx={{
                                            color: 'white',
                                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete car">
                                    <IconButton
                                        size="small"
                                        onClick={handleDeleteCarClick}
                                        disabled={updateCarLoading || deleteCarLoading}
                                        sx={{
                                            color: 'white',
                                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </AdminControls>
                        )}
                        <CarImageBlock car={car} />
                    </ImageContainer>
                </Grid>
                <Grid item xs={12} md={8}>
                    <CarMainInfo car={car} />
                    <CarBookingForm
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
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

            <BookingConfirmDialog
                open={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                onConfirm={handleConfirmBooking}
                car={car}
                startDate={startDate}
                endDate={endDate}
                loading={bookingLoading}
                error={bookingError}
            />

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

            {/* Диалоги для управления машиной */}
            <CarDeleteDialog
                open={openDeleteCar}
                onClose={handleDeleteCarClose}
                onConfirm={handleDeleteCarConfirm}
                car={car}
                loading={deleteCarLoading}
                error={deleteCarError}
            />

            <CarEditDialog
                open={openEditCar}
                onClose={handleEditCarClose}
                onSubmit={handleEditCarSubmit}
                car={car}
                loading={updateCarLoading}
                error={updateCarError}
            />

            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.message}
                </MuiAlert>
            </Snackbar>
        </CarPageContainer>
    );
}