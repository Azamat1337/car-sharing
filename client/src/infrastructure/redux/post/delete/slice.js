import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const DELETE_POST = 'delete_post';

const deletePostSlice = createSlice({
    name: DELETE_POST,
    initialState,
    reducers: {
        deletePostRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        deletePostSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        deletePostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        clearDeletePostState: () => initialState,
    },
    selectors: {
        deletePostLoadingSelector: (state) => state.loading,
        deletePostErrorSelector: (state) => state.error,
        deletePostSuccessSelector: (state) => state.success,
    },
});

export const {
    deletePostLoadingSelector,
    deletePostErrorSelector,
    deletePostSuccessSelector,
} = deletePostSlice.selectors;
export const {
    deletePostRequest,
    deletePostSuccess,
    deletePostFailure,
    clearDeletePostState,
} = deletePostSlice.actions;
export default deletePostSlice.reducer;

