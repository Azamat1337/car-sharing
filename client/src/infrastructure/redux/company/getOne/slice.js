import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const GET_ONE_COMPANY = 'get_one_company'

const getOneCompanySlice = createSlice({
    name: GET_ONE_COMPANY,
    initialState,
    reducers: {
        getOneCompanyRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        getOneCompanySuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        getOneCompanyFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getOneCompanyReset: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    },
    selectors: {
        getOneCompanyLoadingSelector: (state) => state.loading,
        getOneCompanyErrorSelector: (state) => state.error,
        getOneCompanyDataSelector: (state) => state.data,
    }
})

export const { getOneCompanyDataSelector, getOneCompanyLoadingSelector, getOneCompanyErrorSelector } = getOneCompanySlice.selectors;
export const { getOneCompanyFailure, getOneCompanyRequest, getOneCompanySuccess, getOneCompanyReset } = getOneCompanySlice.actions;
export default getOneCompanySlice.reducer;