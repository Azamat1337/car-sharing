import React, { useState } from 'react';
import {
    Modal, Box, TextField, Button, Typography
} from '@mui/material';

function CreateRideModal({ open, onClose, onSubmit, loading }) {
    const [form, setForm] = useState({
        carModel: '',
        fromLocation: '',
        toLocation: '',
        startTime: '',
        price: '',
        seatsAvailable: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                p: 4, bgcolor: 'background.paper', borderRadius: 2, maxWidth: 400, mx: 'auto', mt: 10
            }}>
                <Typography variant="h6" gutterBottom>Создать поездку</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Модель авто"
                        name="carModel"
                        value={form.carModel}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Откуда"
                        name="fromLocation"
                        value={form.fromLocation}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Куда"
                        name="toLocation"
                        value={form.toLocation}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Время"
                        name="startTime"
                        type="datetime-local"
                        value={form.startTime}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Цена"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Свободно мест"
                        name="seatsAvailable"
                        type="number"
                        value={form.seatsAvailable}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Создание...' : 'Создать'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default CreateRideModal;