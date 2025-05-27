import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    chat: null,
};

export const GET_OR_CREATE_CHAT = 'get_or_create_chat';

const chatSlice = createSlice({
    name: GET_OR_CREATE_CHAT,
    initialState,
    reducers: {
        getOrCreateChatRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getOrCreateChatSuccess: (state, action) => {
            state.loading = false;
            state.chat = action.payload;
        },
        getOrCreateChatFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        chatReset: (state) => {
            state.loading = false;
            state.error = null;
            state.chat = null;
        }
    },
    selectors: {
        chatLoadingSelector: (state) => state.loading,
        chatErrorSelector: (state) => state.error,
        chatDataSelector: (state) => state.chat,
    }
});

export const {
    chatLoadingSelector,
    chatErrorSelector,
    chatDataSelector
} = chatSlice.selectors;

export const {
    getOrCreateChatRequest,
    getOrCreateChatSuccess,
    getOrCreateChatFailure,
    chatReset
} = chatSlice.actions;

export default chatSlice.reducer;