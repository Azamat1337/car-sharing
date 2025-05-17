import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

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
    const car = {
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        image: 'https://via.placeholder.com/800x500?text=Toyota+Camry',
        description:
            'The Toyota Camry is a comfortable and reliable mid-size sedan with excellent fuel economy, smooth ride, and a spacious interior.',
        features: {
            'Engine': '2.5L 4-Cylinder',
            'Power': '203 hp',
            'Transmission': '8-speed automatic',
            'Seats': '5',
            'Fuel Type': 'Gasoline',
            'Mileage': '≤ 15,000 miles',
            'Color': 'White'
        }
    };

    const handleRent = (e) => {
        e.preventDefault();
    };

    return (
        <CarPageContainer maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <CarImageCard>
                        <CardMedia
                            component="img"
                            image={car.image}
                            alt={`${car.brand} ${car.model}`}
                            sx={{ height: 0, paddingTop: '56.25%' }} // 16:9
                        />
                    </CarImageCard>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        {car.brand} {car.model} ({car.year})
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {car.description}
                    </Typography>

                    <InfoCard component="form" onSubmit={handleRent}>
                        <Typography variant="h6" gutterBottom>
                            Rent this car
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                            <TextField
                                label="Start Date"
                                type="date"
                                name="startDate"
                                InputLabelProps={{ shrink: true }}
                                required
                                sx={{ flex: 1, minWidth: 160 }}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                name="endDate"
                                InputLabelProps={{ shrink: true }}
                                required
                                sx={{ flex: 1, minWidth: 160 }}
                            />
                        </Box>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#000', color: '#fff' }}>
                            Rent Now
                        </Button>
                    </InfoCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <InfoCard>
                        <Typography variant="h6" gutterBottom>
                            Specifications
                        </Typography>
                        <Table size="small">
                            <TableBody>
                                {Object.entries(car.features).map(([key, value]) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" sx={{ borderBottom: 'none', fontWeight: 'bold' }}>
                                            {key}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: 'none' }}>{value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </InfoCard>
                </Grid>
            </Grid>
        </CarPageContainer>
    );
}
