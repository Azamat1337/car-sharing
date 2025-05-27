import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const JOIN_RIDE = 'join_ride';

const joinRideSlice = createSlice({
    name: JOIN_RIDE,
    initialState,
    reducers: {
        joinRideRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        joinRideSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        joinRideFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        joinRideReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        joinRideLoadingSelector: (state) => state.loading,
        joinRideErrorSelector: (state) => state.error,
        joinRideSuccessSelector: (state) => state.success,
    }
});

export const {
    joinRideRequest,
    joinRideSuccess,
    joinRideFailure,
    joinRideReset
} = joinRideSlice.actions;

export const {
    joinRideLoadingSelector,
    joinRideErrorSelector,
    joinRideSuccessSelector
} = joinRideSlice.selectors;

export default joinRideSlice.reducer;