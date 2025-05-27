import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const COMPLETE_RIDE = 'complete_ride';

const completeRideSlice = createSlice({
    name: 'complete_ride',
    initialState,
    reducers: {
        completeRideRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        completeRideSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        completeRideFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        completeRideReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        completeRideLoadingSelector: (state) => state.loading,
        completeRideErrorSelector: (state) => state.error,
        completeRideSuccessSelector: (state) => state.success,
    }
});

export const {
    completeRideRequest,
    completeRideSuccess,
    completeRideFailure,
    completeRideReset
} = completeRideSlice.actions;

export const {
    completeRideLoadingSelector,
    completeRideErrorSelector,
    completeRideSuccessSelector
} = completeRideSlice.selectors;

export default completeRideSlice.reducer;