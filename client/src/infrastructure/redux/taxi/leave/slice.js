import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    success: false,
    error: null,
};

export const LEAVE_RIDE = 'leave_ride'

const leaveRideSlice = createSlice({
    name: LEAVE_RIDE,
    initialState,
    reducers: {
        leaveRideRequest(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        leaveRideSuccess(state) {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        leaveRideFailure(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        leaveRideReset(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    selectors: {
        leaveRideLoadingSelector: (state) => state.loading,
        leaveRideSuccessSelector: (state) => state.success,
        leaveRideErrorSelector: (state) => state.error,
    },
});

export const {
    leaveRideLoadingSelector,
    leaveRideSuccessSelector,
    leaveRideErrorSelector,
} = leaveRideSlice.selectors;
export const {
    leaveRideRequest,
    leaveRideSuccess,
    leaveRideFailure,
    leaveRideReset,
} = leaveRideSlice.actions;
export default leaveRideSlice.reducer;
