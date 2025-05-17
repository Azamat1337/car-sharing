import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Avatar,
    Grid,
    Tabs,
    Tab,
    Card,
    CardMedia,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {CHAT_ROUTE} from "../infrastructure/routes/index.js";

const ProfileContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#fafafa',
    minHeight: '100vh',
}));

const SectionCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[1],
}));

function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ mt: 2 }}>{children}</Box> : null;
}

export default function UserProfile() {
    const navigate = useNavigate();
    const [tab, setTab] = React.useState(0);

    const user = {
        id: '123123123',
        name: 'Jon Snow',
        email: 'jon@winterfell.com',
        avatar: '',
    };
    const userCars = [
        { id:1, brand:'Toyota', model:'Camry', year:2020, image:'https://via.placeholder.com/150?text=Camry' },
        { id:2, brand:'BMW', model:'X5', year:2022, image:'https://via.placeholder.com/150?text=X5' },
    ];
    const userBookings = [
        { id:101, car:'Civic', date:'2025-05-10', status:'Completed' },
        { id:102, car:'Focus', date:'2025-05-15', status:'Upcoming' },
    ];

    const goToChatPage = (id) => {
        const path = CHAT_ROUTE.replace(':id', id)
        navigate(path)
    }

    const handleChange = (_, newVal) => setTab(newVal);

    return (
        <ProfileContainer maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
                        <Avatar sx={{ width:80, height:80 }}>{user.name.charAt(0)}</Avatar>
                        <Box>
                            <Typography variant="h5">{user.name}</Typography>
                            <Typography color="text.secondary">{user.email}</Typography>
                        </Box>
                        <Box sx={{ flexGrow:1 }} />
                        <Button variant="outlined" onClick={() => goToChatPage(user.id)}>
                            Contact Admin
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Tabs value={tab} onChange={handleChange}>
                        <Tab label="My Cars" />
                        <Tab label="Bookings" />
                        <Tab label="Settings" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Grid container spacing={2}>
                            {userCars.map(car => (
                                <Grid item xs={12} sm={6} key={car.id}>
                                    <SectionCard>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={car.image}
                                            alt={`${car.brand} ${car.model}`}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{car.brand} {car.model}</Typography>
                                            <Typography variant="body2" color="text.secondary">{car.year}</Typography>
                                        </CardContent>
                                    </SectionCard>
                                </Grid>
                            ))}
                            {userCars.length === 0 && (
                                <Typography color="text.secondary">You have no cars listed.</Typography>
                            )}
                        </Grid>
                    </TabPanel>

                    {/* Bookings */}
                    <TabPanel value={tab} index={1}>
                        <List>
                            {userBookings.map(bk => (
                                <ListItem key={bk.id} divider>
                                    <ListItemText
                                        primary={`${bk.car} on ${bk.date}`}
                                        secondary={`Status: ${bk.status}`}
                                    />
                                </ListItem>
                            ))}
                            {userBookings.length === 0 && (
                                <Typography color="text.secondary">No bookings yet.</Typography>
                            )}
                        </List>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography variant="body1">Account settings coming soon.</Typography>
                    </TabPanel>
                </Grid>
            </Grid>
        </ProfileContainer>
    );
}
