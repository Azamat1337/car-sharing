import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const UPDATE_POST = 'update_post';

const updatePostSlice = createSlice({
    name: UPDATE_POST,
    initialState,
    reducers: {
        updatePostRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        updatePostSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        updatePostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        updatePostReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        updatePostLoadingSelector: (state) => state.loading,
        updatePostErrorSelector: (state) => state.error,
        updatePostSuccessSelector: (state) => state.success,
    }
});


export const {
    updatePostLoadingSelector,
    updatePostErrorSelector,
    updatePostSuccessSelector
} = updatePostSlice.selectors;
export const {
    updatePostRequest,
    updatePostSuccess,
    updatePostFailure,
    updatePostReset
} = updatePostSlice.actions;

export default updatePostSlice.reducer;