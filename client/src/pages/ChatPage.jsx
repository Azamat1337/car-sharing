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
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

const ChatContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
}));

const MessagesBox = styled(Paper)(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const InputBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
}));

export default function AdminChatPage() {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'admin', content: 'Здравствуйте! Чем могу помочь?', ts: '10:00 AM' },
        { id: 2, sender: 'user', content: 'Привет. Хочу узнать о статусе моей брони.', ts: '10:01 AM' },
    ]);
    const [text, setText] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!text.trim()) return;
        const newMsg = {
            id: messages.length + 1,
            sender: 'user',
            content: text.trim(),
            ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMsg]);
        setText('');
        // здесь можно отправить через WebSocket / API
    };

    return (
        <ChatContainer maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                Chat with Admin
            </Typography>
            <MessagesBox elevation={1}>
                <List>
                    {messages.map(msg => (
                        <ListItem
                            key={msg.id}
                            sx={{
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.300',
                                    color: msg.sender === 'user' ? '#fff' : '#000',
                                    borderRadius: 1,
                                    p: 1.5,
                                    maxWidth: '70%',
                                }}
                            >
                                <ListItemText
                                    primary={msg.content}
                                    secondary={msg.ts}
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
                    placeholder="Type your message…"
                    variant="outlined"
                    size="small"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                />
                <Button variant="contained" onClick={handleSend}>
                    Send
                </Button>
            </InputBox>
        </ChatContainer>
    );
}
