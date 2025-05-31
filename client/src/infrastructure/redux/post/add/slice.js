import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
}

export const ADD_POST = 'add_post'

const addPostSlice = createSlice({
    name: ADD_POST,
    initialState,
    reducers: {
        addPostRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        addPostSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        addPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        addPostReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        addPostLoadingSelector: (state) => state.loading,
        addPostErrorSelector: (state) => state.error,
        addPostSuccessSelector: (state) => state.success,
    }
})

export const { addPostErrorSelector, addPostLoadingSelector, addPostSuccessSelector } = addPostSlice.selectors;
export const { addPostFailure, addPostRequest, addPostSuccess, addPostReset } = addPostSlice.actions;
export default addPostSlice.reducer

