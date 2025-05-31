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
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    getMyBookingsRequest,
} from '../infrastructure/redux/booking/getMy/slice.js';
import {
    getMyRidesRequest,
} from '../infrastructure/redux/taxi/getMy/slice.js';
import {
    getOrCreateChatRequest,
    chatDataSelector,
    chatLoadingSelector,
    chatErrorSelector
} from '../infrastructure/redux/chat/getOrCreateChat/slice.js';

import BookingTab from '../components/UserProfile/BookingTab.jsx';
import HistoryTab from '../components/UserProfile/HistoryTab.jsx';
import TaxiTab from '../components/UserProfile/TaxiTab.jsx';
import SettingsTab from '../components/UserProfile/SettingsTab.jsx';

const ProfileContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
}));

function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ mt: 2 }}>{children}</Box> : null;
}

export default function UserProfile({ setDarkMode, darkMode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);

    const { profile } = useSelector(state => state.user);
    const chat = useSelector(chatDataSelector);
    const chatLoading = useSelector(chatLoadingSelector);
    const chatError = useSelector(chatErrorSelector);

    const handleContactAdmin = () => {
        dispatch(getOrCreateChatRequest({ subject: 'Support' }));
    };

    useEffect(() => {
        if (tab === 0 || tab === 1) {
            dispatch(getMyBookingsRequest());
        }
        if (tab === 2) {
            dispatch(getMyRidesRequest());
        }
    }, [tab, dispatch]);

    useEffect(() => {
        if (chat && chat.id) {
            navigate(`/chat/${chat.id}`);
        }
    }, [chat, navigate]);

    const handleChange = (_, newVal) => setTab(newVal);

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

                    <TabPanel value={tab} index={0}>
                        <BookingTab />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <HistoryTab />
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <TaxiTab />
                    </TabPanel>
                    <TabPanel value={tab} index={3}>
                        <SettingsTab darkMode={darkMode} setDarkMode={setDarkMode} />
                    </TabPanel>
                </Grid>
            </Grid>
        </ProfileContainer>
    );
}