import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    newBrand: null
}

export const ADD_BRAND = 'add_brand';

const addBrandSlice = createSlice({
    name: ADD_BRAND,
    initialState,
    reducers: {
        addBrandRequest(state, action) {
            state.loading = true;
            state.error = null;
        },
        addBrandSuccess(state, action) {
            state.loading = false;
            state.newBrand = action.payload;
        },
        addBrandFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addBrandReset(state) {
            state.loading = false;
            state.error = null;
            state.newBrand = null;
        }
    },
    selectors: {
        addBrandLoadingSelector: state => state.loading,
        addBrandErrorSelector: state => state.error,
        addBrandDataSelector: state => state.newBrand,
    }
})

export const { addBrandDataSelector, addBrandErrorSelector, addBrandLoadingSelector } = addBrandSlice.selectors;
export const { addBrandFailure, addBrandRequest, addBrandSuccess, addBrandReset } = addBrandSlice.actions;
export default addBrandSlice.reducer;