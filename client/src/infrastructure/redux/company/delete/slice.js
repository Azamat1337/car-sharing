import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    error: null
}

export const DELETE_COMPANY = 'delete_company'

const deleteCompanySlice = createSlice({
    name: DELETE_COMPANY,
    initialState,
    reducers: {
        deleteCompanyRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        deleteCompanySuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        deleteCompanyFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        },
        deleteCompanyReset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
    selectors: {
        deleteCompanyLoadingSelector: (state) => state.loading,
        deleteCompanyErrorSelector: (state) => state.error,
        deleteCompanySuccessSelector: (state) => state.success,
    }
})

export const { deleteCompanySuccessSelector, deleteCompanyLoadingSelector, deleteCompanyErrorSelector } = deleteCompanySlice.selectors;
export const { deleteCompanyFailure, deleteCompanyRequest, deleteCompanySuccess, deleteCompanyReset } = deleteCompanySlice.actions;
export default deleteCompanySlice.reducer;