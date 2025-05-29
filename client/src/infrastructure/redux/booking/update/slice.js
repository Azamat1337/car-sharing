import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const UPDATE_BOOKING = 'update_booking';

const updateBookingSlice = createSlice({
    name: UPDATE_BOOKING,
    initialState,
    reducers: {
        updateBookingRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        updateBookingSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        updateBookingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        updateBookingReset: () => initialState,
    },
    selectors: {
        updateBookingLoadingSelector: (state) => state.loading,
        updateBookingErrorSelector: (state) => state.error,
        updateBookingSuccessSelector: (state) => state.success,
    }
});

export const {
    updateBookingRequest,
    updateBookingSuccess,
    updateBookingFailure,
    updateBookingReset
} = updateBookingSlice.actions;

export const {
    updateBookingLoadingSelector,
    updateBookingErrorSelector,
    updateBookingSuccessSelector
} = updateBookingSlice.selectors;

export default updateBookingSlice.reducer;