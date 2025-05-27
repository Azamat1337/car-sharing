import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllChatsRequest,
    getAllChatsDataSelector,
    getAllChatsLoadingSelector,
    getAllChatsErrorSelector
} from '../../infrastructure/redux/chat/getAllChats/slice';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Alert,
    Box
} from '@mui/material';

export default function AdminChatsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chats = useSelector(getAllChatsDataSelector);
    const loading = useSelector(getAllChatsLoadingSelector);
    const error = useSelector(getAllChatsErrorSelector);

    useEffect(() => {
        dispatch(getAllChatsRequest());
    }, [dispatch]);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Все чаты пользователей
            </Typography>
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
            {!loading && !error && (
                <List>
                    {chats.length === 0 && (
                        <Typography color="text.secondary" sx={{ p: 2 }}>
                            Нет чатов
                        </Typography>
                    )}
                    {chats.map(chat => (
                        <ListItem
                            button
                            key={chat.id}
                            onClick={() => navigate(`/chat/${chat.id}`)}
                        >
                            <ListItemText
                                primary={chat.subject || `Чат #${chat.id}`}
                                secondary={chat.user?.username || 'Пользователь'}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}