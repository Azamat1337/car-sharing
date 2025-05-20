import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
}

export const ADD_POST = 'add_post'

const addPostSlice = createSlice({
    name: ADD_POST,
    initialState,
    reducers: {
        addPostRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        addPostSuccess: (state, action) => {
            state.loading = false;
        },
        addPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
    selectors: {
        addPostLoadingSelector: (state) => state.loading,
        addPostErrorSelector: (state) => state.error
    }
})

export const {addPostErrorSelector, addPostLoadingSelector} = addPostSlice.selectors;
export const {addPostFailure, addPostRequest, addPostSuccess} = addPostSlice.actions;
export default addPostSlice.reducer