import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Box,
    Typography,
    Avatar,
    Grid,
    Tabs,
    Tab,
    Card,
    List,
    ListItem,
    ListItemText,
    Button,
    CircularProgress,
    Alert,
    Chip,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    getMyBookingsRequest,
    getMyBookingsDataSelector,
    getMyBookingsLoadingSelector, getMyBookingsErrorSelector
} from '../infrastructure/redux/booking/getMy/slice.js';
import {
    getMyRidesRequest,
    getMyRidesDataSelector,
    getMyRidesLoadingSelector,
    getMyRidesErrorSelector
} from '../infrastructure/redux/taxi/getMy/slice.js';
import {
    completeRideRequest,
    completeRideLoadingSelector
} from '../infrastructure/redux/taxi/complete/slice.js';
import {
    getOrCreateChatRequest,
    chatDataSelector,
    chatLoadingSelector,
    chatErrorSelector
} from '../infrastructure/redux/chat/getOrCreateChat/slice.js';
import { format } from 'date-fns';

const ProfileContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
}));

const SectionCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[1],
}));

function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ mt: 2 }}>{children}</Box> : null;
}

export default function UserProfile({ setDarkMode, darkMode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);

    const { profile, loading: userLoading } = useSelector(state => state.user);
    const bookings = useSelector(getMyBookingsDataSelector);
    const bookingsLoading = useSelector(getMyBookingsLoadingSelector);
    const bookingsError = useSelector(getMyBookingsErrorSelector);
    const chat = useSelector(chatDataSelector);
    const chatLoading = useSelector(chatLoadingSelector);
    const chatError = useSelector(chatErrorSelector);

    // Для вкладки Taxi
    const myRides = useSelector(getMyRidesDataSelector);
    const myRidesLoading = useSelector(getMyRidesLoadingSelector);
    const myRidesError = useSelector(getMyRidesErrorSelector);
    const completeLoading = useSelector(completeRideLoadingSelector);

    const handleContactAdmin = () => {
        dispatch(getOrCreateChatRequest({ subject: 'Support' }));
    };

    useEffect(() => {
        if (tab === 1 && !bookings.length) {
            dispatch(getMyBookingsRequest());
        } else if (tab === 2 && !myRides.length) {
            dispatch(getMyRidesRequest());
        }
    }, [tab, dispatch]);

    useEffect(() => {
        if (chat && chat.id) {
            navigate(`/chat/${chat.id}`);
        }
    }, [chat, navigate]);

    const handleChange = (_, newVal) => setTab(newVal);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy HH:mm');
    };

    const handleCompleteRide = (rideId) => {
        dispatch(completeRideRequest(rideId));
    };

    return (
        <ProfileContainer maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 80, height: 80 }}>
                            {profile?.username?.charAt(0) || 'U'}
                        </Avatar>
                        <Box>
                            <Typography variant="h5">{profile?.username}</Typography>
                            <Typography color="text.secondary">{profile?.email}</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            variant="outlined"
                            onClick={handleContactAdmin}
                            disabled={chatLoading}
                        >
                            {chatLoading ? 'Loading...' : 'Contact Admin'}
                        </Button>
                        {chatError && (
                            <Typography color="error" variant="body2">{chatError}</Typography>
                        )}
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Tabs value={tab} onChange={handleChange}>
                        <Tab label="Bookings" />
                        <Tab label="History" />
                        <Tab label="Taxi" />
                        <Tab label="Settings" />
                    </Tabs>

                    {/* Вкладка с автомобилями */}
                    <TabPanel value={tab} index={0}>
                        <Grid container spacing={2}>
                            {/* ... существующая логика для автомобилей ... */}
                        </Grid>
                    </TabPanel>

                    {/* Вкладка с бронированиями */}
                    <TabPanel value={tab} index={1}>
                        {bookingsLoading ? (
                            <Box display="flex" justifyContent="center" py={4}>
                                <CircularProgress />
                            </Box>
                        ) : bookingsError ? (
                            <Alert severity="error" sx={{ my: 2 }}>
                                {bookingsError}
                            </Alert>
                        ) : (
                            <List>
                                {bookings.map(booking => (
                                    <ListItem key={booking.id} divider>
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography variant="subtitle1">
                                                        {booking.car.model}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {formatDate(booking.startTime)} - {formatDate(booking.endTime)}
                                                    </Typography>
                                                </>
                                            }
                                            secondary={
                                                <Chip
                                                    label={booking.status}
                                                    size="small"
                                                    color={
                                                        booking.status === 'CONFIRMED' ? 'success' :
                                                            booking.status === 'CANCELLED' ? 'error' : 'default'
                                                    }
                                                />
                                            }
                                        />
                                    </ListItem>
                                ))}
                                {bookings.length === 0 && !bookingsLoading && (
                                    <Typography color="text.secondary" sx={{ p: 2 }}>
                                        No bookings found
                                    </Typography>
                                )}
                            </List>
                        )}
                    </TabPanel>

                    {/* Вкладка с заявками на поездки (Taxi) */}
                    <TabPanel value={tab} index={2}>
                        {myRidesLoading ? (
                            <Box display="flex" justifyContent="center" py={4}>
                                <CircularProgress />
                            </Box>
                        ) : myRidesError ? (
                            <Alert severity="error" sx={{ my: 2 }}>
                                {myRidesError}
                            </Alert>
                        ) : (
                            <List>
                                {myRides.map(ride => (
                                    <ListItem key={ride.id} divider>
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography variant="subtitle1">
                                                        {ride.fromLocation} → {ride.toLocation}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {formatDate(ride.startTime)}
                                                    </Typography>
                                                </>
                                            }
                                            secondary={
                                                <>
                                                    <Chip
                                                        label={ride.status}
                                                        size="small"
                                                        color={
                                                            ride.status === 'APPROVED' ? 'success' :
                                                                ride.status === 'REJECTED' ? 'error' : 'warning'
                                                        }
                                                        sx={{ mr: 1 }}
                                                    />
                                                    <span>Цена: {Number(ride.price).toFixed(2)}₸</span>
                                                    <span style={{ marginLeft: 8 }}>Мест: {ride.seatsAvailable}</span>
                                                </>
                                            }
                                        />
                                        {/* Кнопка завершить поездку только для создателя и только если статус APPROVED */}
                                        {profile?.id === ride.userId && ride.status === 'APPROVED' && (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                onClick={() => handleCompleteRide(ride.id)}
                                                disabled={completeLoading}
                                                sx={{ ml: 2 }}
                                            >
                                                {completeLoading ? 'Завершение...' : 'Завершить'}
                                            </Button>
                                        )}
                                    </ListItem>
                                ))}
                                {myRides.length === 0 && !myRidesLoading && (
                                    <Typography color="text.secondary" sx={{ p: 2 }}>
                                        Нет ваших заявок на поездки
                                    </Typography>
                                )}
                            </List>
                        )}
                    </TabPanel>

                    {/* Вкладка с настройками */}
                    <TabPanel value={tab} index={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={darkMode}
                                    onChange={e => setDarkMode(e.target.checked)}
                                />
                            }
                            label="Тёмная тема"
                        />
                    </TabPanel>
                </Grid>
            </Grid>
        </ProfileContainer>
    );
}