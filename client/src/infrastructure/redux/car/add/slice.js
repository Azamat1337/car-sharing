import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const ADD_CAR = 'add_car';

const addCarSlice = createSlice({
    name: ADD_CAR,
    initialState,
    reducers: {
        addCarRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        addCarSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        addCarFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        addCarReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        addCarLoadingSelector: (state) => state.loading,
        addCarErrorSelector: (state) => state.error,
        addCarSuccessSelector: (state) => state.success,
    }
});

export const {
    addCarLoadingSelector,
    addCarErrorSelector,
    addCarSuccessSelector
} = addCarSlice.selectors;

export const {
    addCarRequest,
    addCarSuccess,
    addCarFailure,
    addCarReset
} = addCarSlice.actions;

export default addCarSlice.reducer;