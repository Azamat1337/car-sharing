import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    items: []
}

export const GET_BRANDS = 'get_brands'

const getBrandsSlice = createSlice({
    name: GET_BRANDS,
    initialState,
    reducers: {
        getBrandsRequest: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        getBrandsSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        getBrandsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
    selectors: {
        getBrandsLoadingSelector: (state) => state.loading,
        getBrandsErrorSelector: (state) => state.error,
        getBrandsDataSelector: (state) => state.items
    }
})

export const {getBrandsDataSelector, getBrandsErrorSelector, getBrandsLoadingSelector } = getBrandsSlice.selectors;
export const {getBrandsFailure, getBrandsRequest, getBrandsSuccess} = getBrandsSlice.actions;
export default getBrandsSlice.reducer;