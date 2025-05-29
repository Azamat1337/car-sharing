import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandsDataSelector, getBrandsRequest } from "../infrastructure/redux/brand/get/slice.js";
import { addBrandRequest } from "../infrastructure/redux/brand/add/slice.js";
import { addPostRequest, addPostLoadingSelector, addPostErrorSelector } from "../infrastructure/redux/post/add/slice.js";
import { addCarRequest, addCarLoadingSelector, addCarSuccessSelector, addCarErrorSelector } from '../infrastructure/redux/car/add/slice.js';

export default function AdminPanel() {
    const dispatch = useDispatch();
    const brands = useSelector(getBrandsDataSelector);

    const [openCar, setOpenCar] = useState(false);
    const [carModel, setCarModel] = useState('');
    const [carYear, setCarYear] = useState('');
    const [carBrandId, setCarBrandId] = useState('');
    const [carImage, setCarImage] = useState(null);
    const [carError, setCarError] = useState('');
    const [carRentalType, setCarRentalType] = useState('');
    const [carDailyPrice, setCarDailyPrice] = useState('');
    const [carHourlyPrice, setCarHourlyPrice] = useState('');

    const carLoading = useSelector(addCarLoadingSelector);
    const carAddError = useSelector(addCarErrorSelector);
    const carAddSuccess = useSelector(addCarSuccessSelector);

    const [openBrand, setOpenBrand] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [brandError, setBrandError] = useState('');

    const [openPost, setOpenPost] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postExcerpt, setPostExcerpt] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postError, setPostError] = useState('');
    const postLoading = useSelector(addPostLoadingSelector);
    const postAddError = useSelector(addPostErrorSelector);

    useEffect(() => {
        dispatch(getBrandsRequest());
    }, [dispatch]);

    const handleOpenBrand = () => setOpenBrand(true);
    const handleCloseBrand = () => {
        setOpenBrand(false);
        setBrandName('');
        setBrandError('');
    };

    const handleCreateBrand = () => {
        if (!brandName.trim()) {
            setBrandError('Введите название бренда');
            return;
        }
        dispatch(addBrandRequest(brandName));
        handleCloseBrand();
    };

    const handleOpenPost = () => setOpenPost(true);
    const handleClosePost = () => {
        setOpenPost(false);
        setPostTitle('');
        setPostExcerpt('');
        setPostContent('');
        setPostImage(null);
        setPostError('');
    };

    const handleCreatePost = () => {
        if (!postTitle.trim() || !postContent.trim()) {
            setPostError('Введите заголовок и текст поста');
            return;
        }
        dispatch(addPostRequest({ title: postTitle, excerpt: postExcerpt, content: postContent, image: postImage }));
        handleClosePost();
    };

    const handleOpenCar = () => setOpenCar(true);
    const handleCloseCar = () => {
        setOpenCar(false);
        setCarModel('');
        setCarYear('');
        setCarBrandId('');
        setCarImage(null);
        setCarError('');
        setCarRentalType('');
        setCarDailyPrice('');
        setCarHourlyPrice('');
    };

    const handleCreateCar = () => {
        if (!carModel.trim() || !carYear || !carBrandId || !carRentalType) {
            setCarError('Заполните все поля');
            return;
        }
        if ((carRentalType === 'DAILY' || carRentalType === 'BOTH') && (!carDailyPrice || Number(carDailyPrice) <= 0)) {
            setCarError('Укажите корректную цену за сутки');
            return;
        }
        if ((carRentalType === 'HOURLY' || carRentalType === 'BOTH') && (!carHourlyPrice || Number(carHourlyPrice) <= 0)) {
            setCarError('Укажите корректную цену за час');
            return;
        }

        dispatch(addCarRequest({
            model: carModel,
            year: carYear,
            brandId: carBrandId,
            img: carImage,
            rentalType: carRentalType,
            dailyPrice: carDailyPrice || 0,
            hourlyPrice: carHourlyPrice || 0,
        }));

        handleCloseCar();
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Админ-панель
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box mb={2} display="flex" justifyContent="space-between">
                        <Typography variant="h6">Бренды</Typography>
                        <Button variant="contained" onClick={handleOpenBrand}>
                            Создать бренд
                        </Button>
                    </Box>
                    <Box>
                        {brands.map(b => (
                            <Box key={b.id} p={1} borderBottom="1px solid #eee">
                                {b.name}
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box mb={2} display="flex" justifyContent="space-between">
                        <Typography variant="h6">Посты</Typography>
                        <Button variant="contained" color="secondary" onClick={handleOpenPost}>
                            Создать пост
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box mb={2} display="flex" justifyContent="space-between">
                        <Typography variant="h6">Машины</Typography>
                        <Button variant="contained" color="success" onClick={handleOpenCar}>
                            Создать машину
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Dialog open={openBrand} onClose={handleCloseBrand}>
                <DialogTitle>Создать бренд</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Название"
                        fullWidth
                        value={brandName}
                        onChange={e => {
                            setBrandName(e.target.value);
                            setBrandError('');
                        }}
                        error={!!brandError}
                        helperText={brandError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBrand}>Отмена</Button>
                    <Button variant="contained" onClick={handleCreateBrand}>
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPost} onClose={handleClosePost}>
                <DialogTitle>Создать пост</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Заголовок"
                        fullWidth
                        value={postTitle}
                        onChange={e => {
                            setPostTitle(e.target.value);
                            setPostError('');
                        }}
                        error={!!postError}
                    />
                    <TextField
                        margin="dense"
                        label="Краткое описание"
                        fullWidth
                        value={postExcerpt}
                        onChange={e => setPostExcerpt(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Текст поста"
                        fullWidth
                        multiline
                        minRows={4}
                        value={postContent}
                        onChange={e => {
                            setPostContent(e.target.value);
                            setPostError('');
                        }}
                        error={!!postError}
                        helperText={postError}
                    />
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        {postImage ? `Изображение: ${postImage.name}` : 'Загрузить изображение'}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                    setPostImage(e.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                    {postAddError && (
                        <Typography color="error" variant="body2">{postAddError}</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePost}>Отмена</Button>
                    <Button variant="contained" onClick={handleCreatePost} disabled={postLoading}>
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCar} onClose={handleCloseCar}>
                <DialogTitle>Создать машину</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Модель"
                        fullWidth
                        value={carModel}
                        onChange={e => {
                            setCarModel(e.target.value);
                            setCarError('');
                        }}
                        error={!!carError}
                    />
                    <TextField
                        margin="dense"
                        label="Год"
                        type="number"
                        fullWidth
                        value={carYear}
                        onChange={e => {
                            setCarYear(e.target.value);
                            setCarError('');
                        }}
                        error={!!carError}
                    />
                    <Select
                        margin="dense"
                        fullWidth
                        value={carBrandId}
                        displayEmpty
                        onChange={e => {
                            setCarBrandId(e.target.value);
                            setCarError('');
                        }}
                        error={!!carError}
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="" disabled>Выберите бренд</MenuItem>
                        {brands.map(b => (
                            <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        margin="dense"
                        fullWidth
                        value={carRentalType}
                        displayEmpty
                        onChange={e => {
                            setCarRentalType(e.target.value);
                            setCarError('');
                        }}
                        error={!!carError}
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="" disabled>Выберите тип аренды</MenuItem>
                        <MenuItem value="DAILY">Посуточно</MenuItem>
                        <MenuItem value="HOURLY">Почасовой (каршеринг)</MenuItem>
                        <MenuItem value="BOTH">Оба варианта</MenuItem>
                    </Select>
                    {(carRentalType === 'DAILY' || carRentalType === 'BOTH') && (
                        <TextField
                            margin="dense"
                            label="Цена за сутки (Tг)"
                            type="number"
                            fullWidth
                            value={carDailyPrice}
                            onChange={e => setCarDailyPrice(e.target.value)}
                            error={!!carError && (carRentalType === 'DAILY' || carRentalType === 'BOTH')}
                            sx={{ mt: 2 }}
                        />
                    )}
                    {(carRentalType === 'HOURLY' || carRentalType === 'BOTH') && (
                        <TextField
                            margin="dense"
                            label="Цена за час (Tг)"
                            type="number"
                            fullWidth
                            value={carHourlyPrice}
                            onChange={e => setCarHourlyPrice(e.target.value)}
                            error={!!carError && (carRentalType === 'HOURLY' || carRentalType === 'BOTH')}
                            sx={{ mt: 2 }}
                        />
                    )}
                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        {carImage ? `Изображение: ${carImage.name}` : 'Загрузить изображение'}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                    setCarImage(e.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                    {carError && (
                        <Typography color="error" variant="body2">{carError}</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCar}>Отмена</Button>
                    <Button variant="contained" onClick={handleCreateCar} disabled={carLoading}>
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}
