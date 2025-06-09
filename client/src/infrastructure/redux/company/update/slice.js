import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const UPDATE_COMPANY = 'update_company'

const updateCompanySlice = createSlice({
    name: UPDATE_COMPANY,
    initialState,
    reducers: {
        updateCompanyRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updateCompanySuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        updateCompanyFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateCompanyReset: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    },
    selectors: {
        updateCompanyLoadingSelector: (state) => state.loading,
        updateCompanyErrorSelector: (state) => state.error,
        updateCompanyDataSelector: (state) => state.data,
    }
})

export const { updateCompanyDataSelector, updateCompanyLoadingSelector, updateCompanyErrorSelector } = updateCompanySlice.selectors;
export const { updateCompanyFailure, updateCompanyRequest, updateCompanySuccess, updateCompanyReset } = updateCompanySlice.actions;
export default updateCompanySlice.reducer;