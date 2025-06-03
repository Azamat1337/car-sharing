import React, { useEffect, useRef, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Paper,
    Alert
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getChatMessagesRequest, chatMessagesDataSelector, chatMessagesLoadingSelector, chatMessagesErrorSelector } from '../infrastructure/redux/chat/getChatMessages/slice';
import { chatService } from '../infrastructure/services/chat/chatService';
import {
    closeConversationRequest,
    closeConversationLoadingSelector,
    closeConversationSuccessSelector,
    closeConversationErrorSelector
} from '../infrastructure/redux/chat/close/slice';

const ChatContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fafafa',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    '&.MuiContainer-root': {
        backgroundColor: theme.palette.mode === 'dark' ? '#181818' : '#fafafa',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    }
}));

const MessagesBox = styled(Paper)(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
}));

const InputBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
}));

export default function ChatPage() {
    const dispatch = useDispatch();
    const messages = useSelector(chatMessagesDataSelector);
    const loading = useSelector(chatMessagesLoadingSelector);
    const error = useSelector(chatMessagesErrorSelector);
    const profile = useSelector(state => state.user.profile);

    const closeLoading = useSelector(closeConversationLoadingSelector);
    const closeSuccess = useSelector(closeConversationSuccessSelector);
    const closeError = useSelector(closeConversationErrorSelector);

    const { chatId } = useParams();
    const [text, setText] = useState('');
    const messagesEndRef = useRef(null);

    const [chatStatus, setChatStatus] = useState('ACTIVE');

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (chatId) {
            dispatch(getChatMessagesRequest(chatId));
        }
    }, [dispatch, chatId]);

    useEffect(() => {
        if (messages.length > 0 && messages[0].conversation?.status) {
            setChatStatus(messages[0].conversation.status);
        }
    }, [messages]);

    const handleSend = async () => {
        if (!text.trim() || chatStatus !== 'ACTIVE') return;
        await chatService.sendMessage(chatId, text.trim());
        setText('');
        dispatch(getChatMessagesRequest(chatId));
    };

    const isAdmin = profile?.role === 'ADMIN';

    const handleCloseChat = () => {
        dispatch(closeConversationRequest(chatId));
    };

    return (
        <ChatContainer maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                Chat with Admin
            </Typography>
            {closeError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {closeError}
                </Alert>
            )}
            {isAdmin && chatStatus === 'ACTIVE' && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseChat}
                    disabled={closeLoading}
                    sx={{ mb: 2 }}
                >
                    {closeLoading ? 'Завершение...' : 'Завершить чат'}
                </Button>
            )}
            {chatStatus === 'CLOSED' && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    Чат завершён
                </Alert>
            )}
            <MessagesBox elevation={1}>
                <List>
                    {messages.map(msg => (
                        <ListItem
                            key={msg.id}
                            sx={{
                                justifyContent: msg.senderId === profile.id ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: msg.senderId === profile.id
                                        ? (theme) => theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main'
                                        : (theme) => theme.palette.mode === 'dark' ? '#333' : 'grey.300',
                                    color: msg.senderId === profile.id
                                        ? '#fff'
                                        : (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                                    borderRadius: 1,
                                    p: 1.5,
                                    maxWidth: '70%',
                                }}
                            >
                                <ListItemText
                                    primary={msg.content}
                                    secondary={msg.sender?.username || ''}
                                    primaryTypographyProps={{ component: 'span' }}
                                    secondaryTypographyProps={{ component: 'span', sx: { fontSize: '0.75rem' } }}
                                />
                            </Box>
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </MessagesBox>
            <InputBox>
                <TextField
                    fullWidth
                    placeholder={chatStatus === 'CLOSED' ? 'Чат завершён' : 'Type your message…'}
                    variant="outlined"
                    size="small"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                    disabled={chatStatus === 'CLOSED'}
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#222' : '#fff',
                        color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSend}
                    disabled={chatStatus === 'CLOSED'}
                >
                    Send
                </Button>
            </InputBox>
        </ChatContainer>
    );
}