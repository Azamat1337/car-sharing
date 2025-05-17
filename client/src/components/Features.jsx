import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PaymentIcon from '@mui/icons-material/Payment';

const items = [
    {
        icon: <DirectionsCarIcon fontSize='large' />,
        title: 'Wide Vehicle Selection',
        description:
            'Choose from a diverse fleet of cars to suit every need – from compact city cars to luxury SUVs.',
        imageLight: `url("https://example.com/images/cars-light.jpg")`,
        imageDark: `url("https://example.com/images/cars-dark.jpg")`,
    },
    {
        icon: <GpsFixedIcon fontSize='large' />,
        title: 'Real-Time Tracking',
        description:
            'Monitor your vehicle’s location in real-time, ensuring a seamless rental experience.',
        imageLight: `url("https://example.com/images/tracking-light.jpg")`,
        imageDark: `url("https://example.com/images/tracking-dark.jpg")`,
    },
    {
        icon: <PaymentIcon fontSize='large' />,
        title: 'Flexible Payment Options',
        description:
            'Multiple payment methods available for your convenience, making renting simple and fast.',
        imageLight: `url("https://example.com/images/payment-light.jpg")`,
        imageDark: `url("https://example.com/images/payment-dark.jpg")`,
    },
];

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
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
                    />
                ))}
            </Box>
            <Card variant='outlined'>
                <Box
                    sx={{
                        mb: 2,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: 280,
                        backgroundImage: items[selectedItemIndex].imageLight,
                    }}
                />
                <Box sx={{ px: 2, pb: 2 }}>
                    <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                        {selectedFeature.title}
                    </Typography>
                    <Typography variant='body2'>
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

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const selectedFeature = items[selectedItemIndex];

    return (
        <Container sx={{ py: { xs: 8, sm: 16 } }}>
            <Box sx={{ width: { sm: '100%', md: '60%' } }}>
                <Typography component='h2' variant='h4' gutterBottom>
                    Car Sharing Features
                </Typography>
                <Typography variant='body1' sx={{ mb: { xs: 2, sm: 4 } }}>
                    Discover the key features of our car sharing service
                    designed to make your ride effortless and enjoyable.
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
                                        ? 'action.selected'
                                        : 'transparent',
                                '&:hover': { backgroundColor: 'action.hover' },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                {icon}
                                <Typography variant='h6'>{title}</Typography>
                                <Typography variant='body2'>
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
                        }}
                    >
                        <Box
                            sx={{
                                m: 'auto',
                                width: 420,
                                height: 500,
                                backgroundSize: 'contain',
                                backgroundImage:
                                    items[selectedItemIndex].imageLight,
                            }}
                        />
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
