import React, { useEffect } from 'react';
import { Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAiCarInfoRequest,
    getAiCarInfoDataSelector,
    getAiCarInfoLoadingSelector,
    getAiCarInfoErrorSelector,
    getAiCarInfoReset
} from '../../infrastructure/redux/ai/getCarInfo/slice';

export default function CarMainInfo({ car }) {
    const dispatch = useDispatch();
    const aiInfo = useSelector(getAiCarInfoDataSelector);
    const aiLoading = useSelector(getAiCarInfoLoadingSelector);
    const aiError = useSelector(getAiCarInfoErrorSelector);

    useEffect(() => {
        return () => {
            dispatch(getAiCarInfoReset());
        };
    }, [car?.id, dispatch]);

    const handleGetAiInfo = () => {
        if (car) {
            dispatch(getAiCarInfoRequest(car));
        }
    };

    if (!car) {
        return (
            <Box sx={{ my: 2 }}>
                <Typography variant="h6" color="text.secondary">
                    Car information is not available
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h4" gutterBottom>
                {car.brand?.name} {car.model} {car.year && `(${car.year})`}
            </Typography>
            {car.description && (
                <Typography variant="body1" paragraph>
                    {car.description}
                </Typography>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                The company to which the car belongs: {car.company?.name || '-'}
            </Typography>

            <Button
                variant="outlined"
                onClick={handleGetAiInfo}
                disabled={aiLoading}
                sx={{ mb: 2 }}
            >
                {aiLoading ? <CircularProgress size={20} /> : 'Get information from AI'}
            </Button>

            {aiError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {aiError}
                </Alert>
            )}

            {aiInfo && (
                <Box sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'background.paper'
                }}>
                    <Typography variant="h6" gutterBottom>
                        Information from AI:
                    </Typography>
                    <Typography variant="body1">
                        {aiInfo.response}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}