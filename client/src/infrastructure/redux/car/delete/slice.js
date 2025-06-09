import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    error: null
}

export const DELETE_CAR = 'delete_car'

const deleteCarSlice = createSlice({
    name: DELETE_CAR,
    initialState,
    reducers: {
        deleteCarRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        deleteCarSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        deleteCarFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        },
        deleteCarReset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
    selectors: {
        deleteCarLoadingSelector: (state) => state.loading,
        deleteCarErrorSelector: (state) => state.error,
        deleteCarSuccessSelector: (state) => state.success,
    }
})

export const { deleteCarSuccessSelector, deleteCarLoadingSelector, deleteCarErrorSelector } = deleteCarSlice.selectors;
export const { deleteCarFailure, deleteCarRequest, deleteCarSuccess, deleteCarReset } = deleteCarSlice.actions;
export default deleteCarSlice.reducer;