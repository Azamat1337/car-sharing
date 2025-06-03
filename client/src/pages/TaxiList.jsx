import React, { useEffect, useState, useRef } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    CircularProgress,
    Alert,
    useTheme
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CreateRideModal from '../components/modals/CreateRideModal';
import TaxiSearchBar from '../components/Taxi/TaxiSearchBar';
import TaxiRideList from '../components/Taxi/TaxiRideList';
import {
    getAvailableRidesRequest,
    getAvailableRidesDataSelector,
    getAvailableRidesLoadingSelector,
    getAvailableRidesErrorSelector
} from '../infrastructure/redux/taxi/getAvailable/slice';
import {
    addRideRequest,
    addRideLoadingSelector,
    addRideErrorSelector,
    addRideDataSelector,
    addRideReset
} from '../infrastructure/redux/taxi/add/slice';
import {
    joinRideRequest,
    joinRideLoadingSelector,
    joinRideSuccessSelector,
    joinRideErrorSelector,
    joinRideReset
} from '../infrastructure/redux/taxi/join/slice';
import {
    leaveRideRequest,
    leaveRideLoadingSelector,
    leaveRideSuccessSelector,
    leaveRideErrorSelector,
    leaveRideReset
} from '../infrastructure/redux/taxi/leave/slice';

export default function TaxiListPage() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const profile = useSelector(state => state.user.profile);
    const rides = useSelector(getAvailableRidesDataSelector);
    const loading = useSelector(getAvailableRidesLoadingSelector);
    const error = useSelector(getAvailableRidesErrorSelector);
    const addLoading = useSelector(addRideLoadingSelector);
    const addError = useSelector(addRideErrorSelector);
    const addSuccess = useSelector(addRideDataSelector);
    const joinLoading = useSelector(joinRideLoadingSelector);
    const joinSuccess = useSelector(joinRideSuccessSelector);
    const joinError = useSelector(joinRideErrorSelector);

    const leaveLoading = useSelector(leaveRideLoadingSelector);
    const leaveSuccess = useSelector(leaveRideSuccessSelector);
    const leaveError = useSelector(leaveRideErrorSelector);

    const [searchTo, setSearchTo] = useState('');
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const alertTimeout = useRef();
    useEffect(() => {
        if (addSuccess || addError) {
            alertTimeout.current = setTimeout(() => {
                dispatch(addRideReset());
            }, 2000);
        }
        return () => clearTimeout(alertTimeout.current);
    }, [addSuccess, addError, dispatch]);

    useEffect(() => {
        if (leaveSuccess || leaveError) {
            alertTimeout.current = setTimeout(() => {
                dispatch(leaveRideReset());
            }, 2000);
        }
        return () => clearTimeout(alertTimeout.current);
    }, [leaveSuccess, leaveError, dispatch]);

    useEffect(() => {
        if (joinSuccess || joinError) {
            alertTimeout.current = setTimeout(() => {
                dispatch(joinRideReset());
            }, 2000);
        }
        return () => clearTimeout(alertTimeout.current);
    }, [joinSuccess, joinError, dispatch]);

    useEffect(() => {
        dispatch(getAvailableRidesRequest());
    }, [dispatch, joinSuccess, leaveSuccess]);

    const filteredRides = rides.filter(ride =>
        ride.toLocation.toLowerCase().includes(searchTo.toLowerCase())
    );

    const handleCreateRide = (form) => {
        dispatch(addRideRequest(form));
        setOpenCreateModal(false);
    };

    const handleJoin = (rideId) => {
        dispatch(joinRideRequest(rideId));
    };

    const handleLeave = (rideId) => {
        dispatch(leaveRideRequest(rideId));
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: 4,
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        letterSpacing: 1,
                    }}
                >
                    Taxi Rides
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreateModal(true)}
                        sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            letterSpacing: 1,
                            textTransform: 'none'
                        }}
                    >
                        Create Ride
                    </Button>
                </Box>
            </Box>
            <CreateRideModal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                onSubmit={handleCreateRide}
                loading={addLoading}
            />

            {/* Success Alert */}
            {addSuccess && (
                <Alert severity="success" sx={{ my: 2 }}>
                    Ride created successfully!
                </Alert>
            )}
            {/* Error Alert */}
            {addError && (
                <Alert severity="error" sx={{ my: 2 }}>
                    Failed to create ride. Please try again.
                </Alert>
            )}

            {/* Join ride error alert */}
            {joinError && (
                <Alert severity="error" sx={{ my: 2 }}>
                    {joinError}
                </Alert>
            )}

            {/* Leave ride alerts */}
            {leaveSuccess && (
                <Alert severity="success" sx={{ my: 2 }}>
                    You have left the ride.
                </Alert>
            )}
            {leaveError && (
                <Alert severity="error" sx={{ my: 2 }}>
                    {leaveError}
                </Alert>
            )}

            <TaxiSearchBar value={searchTo} onChange={setSearchTo} />

            {loading && (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Alert severity="error" sx={{ my: 2 }}>
                    {error}
                </Alert>
            )}

            <TaxiRideList
                rides={filteredRides}
                onJoin={handleJoin}
                onLeave={handleLeave}
                joinLoading={joinLoading}
                leaveLoading={leaveLoading}
                profile={profile}
            />
        </Container>
    );
}