import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    deleteBrandId: null,
}

export const DELETE_BRAND = 'delete_brand'

const deleteBrandSlice = createSlice({
    name: DELETE_BRAND,
    initialState,
    reducers: {
        deleteBrandRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteBrandSuccess: (state, action) => {
            state.deleteBrandId = action.payload;
            state.loading = false;
        },
        deleteBrandFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {deleteBrandFailure, deleteBrandRequest, deleteBrandSuccess} = deleteBrandSlice.actions;
export default deleteBrandSlice.reducer;