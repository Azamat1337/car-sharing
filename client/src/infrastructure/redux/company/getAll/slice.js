import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const GET_ALL_COMPANIES = 'get_all_companies'

const getAllCompaniesSlice = createSlice({
    name: GET_ALL_COMPANIES,
    initialState,
    reducers: {
        getAllCompaniesRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        getAllCompaniesSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        getAllCompaniesFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getAllCompaniesReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    selectors: {
        getAllCompaniesLoadingSelector: (state) => state.loading,
        getAllCompaniesErrorSelector: (state) => state.error,
        getAllCompaniesDataSelector: (state) => state.data,
    }
})

export const { getAllCompaniesDataSelector, getAllCompaniesLoadingSelector, getAllCompaniesErrorSelector } = getAllCompaniesSlice.selectors;
export const { getAllCompaniesFailure, getAllCompaniesRequest, getAllCompaniesSuccess, getAllCompaniesReset } = getAllCompaniesSlice.actions;
export default getAllCompaniesSlice.reducer;