import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    chats: [],
};

export const GET_ALL_CHATS = 'get_all_chats';

const getAllChatsSlice = createSlice({
    name: GET_ALL_CHATS,
    initialState,
    reducers: {
        getAllChatsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllChatsSuccess: (state, action) => {
            state.loading = false;
            state.chats = action.payload;
        },
        getAllChatsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getAllChatsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.chats = [];
        }
    },
    selectors: {
        getAllChatsLoadingSelector: (state) => state.loading,
        getAllChatsErrorSelector: (state) => state.error,
        getAllChatsDataSelector: (state) => state.chats,
    }
});

export const {
    getAllChatsLoadingSelector,
    getAllChatsErrorSelector,
    getAllChatsDataSelector
} = getAllChatsSlice.selectors;

export const {
    getAllChatsRequest,
    getAllChatsSuccess,
    getAllChatsFailure,
    getAllChatsReset
} = getAllChatsSlice.actions;

export default getAllChatsSlice.reducer;