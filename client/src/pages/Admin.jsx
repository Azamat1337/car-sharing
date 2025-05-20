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
import {getBrandsDataSelector, getBrandsRequest} from "../infrastructure/redux/brand/get/slice.js";
import {addBrandRequest} from "../infrastructure/redux/brand/add/slice.js";

export default function AdminPanel() {
    const dispatch = useDispatch();
    const brands = useSelector(getBrandsDataSelector)

    const [openBrand, setOpenBrand] = useState(false);

    const [brandName, setBrandName] = useState('');
    const [brandError, setBrandError] = useState('');

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
                        {brands.map(b => {
                            console.log('brand', b)
                            return (<Box key={b.id} p={1} borderBottom="1px solid #eee">
                                {b.name}
                            </Box>)
                        })}
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

        </Container>
    );
}
