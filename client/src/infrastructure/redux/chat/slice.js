import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (chatId) => {
        const { data } = await api.get(`/api/chats/${chatId}/messages`);
        return { chatId, messages: data };
    }
);

export const postMessage = createAsyncThunk(
    'chat/postMessage',
    async ({ chatId, senderId, content }) => {
        const { data } = await api.post(`/api/chats/${chatId}/messages`, { senderId, content });
        return { chatId, message: data };
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        byChat: {},
    },
    reducers: {
        addRealtimeMessage(state, action) {
            const { chatId, message } = action.payload;
            state.byChat[chatId].messages.push(message);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchMessages.fulfilled, (state, { payload }) => {
                state.byChat[payload.chatId] = { messages: payload.messages, status: 'succeeded' };
            })
            .addCase(postMessage.fulfilled, (state, { payload }) => {
                state.byChat[payload.chatId].messages.push(payload.message);
            });
    }
});

export const { addRealtimeMessage } = chatSlice.actions;
export default chatSlice.reducer;
