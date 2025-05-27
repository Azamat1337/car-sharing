import api from '../api';

export const chatService = {
    fetchMyChats: () => api.get('/chat').then(res => res.data),
    createChat: (payload) => api.post('/chat', payload).then(res => res.data),
    fetchMessages: (chatId) => api.get(`/chat/${chatId}`).then(res => res.data),
    sendMessage: (chatId, content) => api.post(`/chat/${chatId}`, { content }).then(res => res.data),
    fetchAllChats: () => api.get('/chat/all').then(res => res.data),
    closeConversation: (convId) => api.post(`/chat/${chatId}/close`).then(res => res.data),
};