import {createSlice} from "@reduxjs/toolkit";

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
        }
    }
})

export const {addBrandFailure, addBrandRequest, addBrandSuccess} = addBrandSlice.actions;
export default addBrandSlice.reducer;