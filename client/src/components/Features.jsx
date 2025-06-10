import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import taxiServiceLight from '../assets/taxiservice_light.png';
import taxiServiceDark from '../assets/taxiservice_black.png';
import carsharingLight from '../assets/white_carsharing.png';
import carsharingDark from '../assets/black_carsharing.png';
import rentalLight from '../assets/rental_light.png';
import rentalDark from '../assets/rental_dark.png';

import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const items = [
    {
        icon: <LocalTaxiIcon fontSize='large' />,
        title: 'TAXI SERVICE',
        description:
            'Fast and convenient taxi — get a ride in a few clicks, anytime. Transparent fares and professional drivers.',
        imageLight: taxiServiceLight,
        imageDark: taxiServiceDark,
    },
    {
        icon: <DirectionsCarIcon fontSize='large' />,
        title: 'CARSHARING',
        description:
            'City carsharing — rent a car by the minute or hour. Perfect for business meetings, errands, or spontaneous trips.',
        imageLight: carsharingLight,
        imageDark: carsharingDark,
    },
    {
        icon: <EventAvailableIcon fontSize='large' />,
        title: 'RENTAL',
        description:
            'Long-term rental — flexible terms for those who value freedom. Choose a car for days, weeks, or months at a fixed price.',
        imageLight: rentalLight,
        imageDark: rentalDark,
    },
];

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
    const theme = useTheme();
    if (!items[selectedItemIndex]) {
        return null;
    }
    return (
        <Box
            sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
                {items.map(({ title }, index) => (
                    <Chip
                        key={index}
                        label={title}
                        onClick={() => handleItemClick(index)}
                        color={
                            selectedItemIndex === index ? 'primary' : 'default'
                        }
                        sx={{
                            color: theme.palette.mode === 'light' ? '#111' : '#fff',
                            fontWeight: 500,
                            background: theme.palette.mode === 'light' ? '#fff' : '#222',
                            border: `1px solid ${theme.palette.mode === 'light' ? '#111' : '#fff'}`,
                        }}
                    />
                ))}
            </Box>
            <Card variant='outlined'
                sx={{
                    background: theme.palette.mode === 'light' ? '#fff' : '#111',
                    borderColor: theme.palette.mode === 'light' ? '#111' : '#fff',
                    color: theme.palette.mode === 'light' ? '#111' : '#fff',
                }}
            >
                <Box
                    sx={{
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 180,
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={theme.palette.mode === 'light'
                            ? items[selectedItemIndex].imageLight
                            : items[selectedItemIndex].imageDark}
                        alt={selectedFeature.title}
                        style={{
                            width: '100%',
                            height: 180,
                            objectFit: 'cover',
                            borderRadius: 8,
                        }}
                    />
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                    <Typography gutterBottom sx={{ fontWeight: 'medium', color: theme.palette.mode === 'light' ? '#111' : '#fff', textTransform: 'uppercase' }}>
                        {selectedFeature.title}
                    </Typography>
                    <Typography variant='body2' sx={{ color: theme.palette.mode === 'light' ? '#111' : '#fff' }}>
                        {selectedFeature.description}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}

MobileLayout.propTypes = {
    handleItemClick: PropTypes.func.isRequired,
    selectedFeature: PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.element,
        imageDark: PropTypes.string.isRequired,
        imageLight: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    selectedItemIndex: PropTypes.number.isRequired,
};

export function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const theme = useTheme();

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const selectedFeature = items[selectedItemIndex];

    return (
        <Container sx={{ py: { xs: 8, sm: 16 } }}>
            <Box sx={{ width: { sm: '100%', md: '60%' } }}>
                <Typography component='h2' variant='h4' gutterBottom sx={{ color: theme.palette.mode === 'light' ? '#111' : '#fff', textTransform: 'uppercase' }}>
                    Our Features
                </Typography>
                <Typography variant='body1' sx={{ mb: { xs: 2, sm: 4 }, color: theme.palette.mode === 'light' ? '#111' : '#fff' }}>
                    We offer modern solutions for urban mobility: taxi, minute-based carsharing, and long-term car rental — all in one app.
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row-reverse' },
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    {items.map(({ icon, title, description }, index) => (
                        <Button
                            key={index}
                            onClick={() => handleItemClick(index)}
                            sx={{
                                p: 2,
                                width: '100%',
                                textAlign: 'left',
                                textTransform: 'none',
                                backgroundColor:
                                    selectedItemIndex === index
                                        ? (theme.palette.mode === 'light' ? '#f5f5f5' : '#222')
                                        : 'transparent',
                                '&:hover': { backgroundColor: theme.palette.mode === 'light' ? '#eee' : '#222' },
                                color: theme.palette.mode === 'light' ? '#111' : '#fff',
                                alignItems: 'flex-start',
                                borderRadius: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <Box sx={{ color: theme.palette.mode === 'light' ? '#111' : '#fff', fontSize: 48 }}>
                                    {icon}
                                </Box>
                                <Typography variant='h6' sx={{ color: theme.palette.mode === 'light' ? '#111' : '#fff', textTransform: 'uppercase' }}>{title}</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.mode === 'light' ? '#111' : '#fff' }}>
                                    {description}
                                </Typography>
                            </Box>
                        </Button>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        width: { md: '70%' },
                    }}
                >
                    <Card
                        variant='outlined'
                        sx={{
                            height: '100%',
                            width: '100%',
                            pointerEvents: 'none',
                            background: theme.palette.mode === 'light' ? '#fff' : '#111',
                            borderColor: theme.palette.mode === 'light' ? '#111' : '#fff',
                            color: theme.palette.mode === 'light' ? '#111' : '#fff',
                        }}
                    >
                        <Box
                            sx={{
                                m: 'auto',
                                width: 600,
                                height: 600,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 2,
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={theme.palette.mode === 'light'
                                    ? items[selectedItemIndex].imageLight
                                    : items[selectedItemIndex].imageDark}
                                alt={selectedFeature.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Card>
                </Box>
                <MobileLayout
                    selectedItemIndex={selectedItemIndex}
                    handleItemClick={handleItemClick}
                    selectedFeature={selectedFeature}
                />
            </Box>
        </Container>
    );
}

export default Features;