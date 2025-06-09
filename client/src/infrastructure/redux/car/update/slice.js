import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const UPDATE_CAR = 'update_car'

const updateCarSlice = createSlice({
    name: UPDATE_CAR,
    initialState,
    reducers: {
        updateCarRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updateCarSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        updateCarFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateCarReset: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    },
    selectors: {
        updateCarLoadingSelector: (state) => state.loading,
        updateCarErrorSelector: (state) => state.error,
        updateCarDataSelector: (state) => state.data,
    }
})

export const { updateCarDataSelector, updateCarLoadingSelector, updateCarErrorSelector } = updateCarSlice.selectors;
export const { updateCarFailure, updateCarRequest, updateCarSuccess, updateCarReset } = updateCarSlice.actions;
export default updateCarSlice.reducer;