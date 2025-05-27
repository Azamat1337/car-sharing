import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    messages: [],
};

export const GET_CHAT_MESSAGES = 'get_chat_messages';

const messagesSlice = createSlice({
    name: GET_CHAT_MESSAGES,
    initialState,
    reducers: {
        getChatMessagesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getChatMessagesSuccess: (state, action) => {
            state.loading = false;
            state.messages = action.payload;
        },
        getChatMessagesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        messagesReset: (state) => {
            state.loading = false;
            state.error = null;
            state.messages = [];
        }
    },
    selectors: {
        chatMessagesLoadingSelector: (state) => state.loading,
        chatMessagesErrorSelector: (state) => state.error,
        chatMessagesDataSelector: (state) => state.messages,
    }
});

export const {
    chatMessagesLoadingSelector,
    chatMessagesErrorSelector,
    chatMessagesDataSelector
} = messagesSlice.selectors;

export const {
    getChatMessagesRequest,
    getChatMessagesSuccess,
    getChatMessagesFailure,
    messagesReset
} = messagesSlice.actions;

export default messagesSlice.reducer;