import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const CREATE_COMPANY = 'create_company'

const createCompanySlice = createSlice({
    name: CREATE_COMPANY,
    initialState,
    reducers: {
        createCompanyRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        createCompanySuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        createCompanyFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        createCompanyReset: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    },
    selectors: {
        createCompanyLoadingSelector: (state) => state.loading,
        createCompanyErrorSelector: (state) => state.error,
        createCompanyDataSelector: (state) => state.data,
    }
})

export const { createCompanyDataSelector, createCompanyLoadingSelector, createCompanyErrorSelector } = createCompanySlice.selectors;
export const { createCompanyFailure, createCompanyRequest, createCompanySuccess, createCompanyReset } = createCompanySlice.actions;
export default createCompanySlice.reducer;