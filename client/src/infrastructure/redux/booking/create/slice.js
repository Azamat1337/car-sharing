import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const CREATE_BOOKING = 'create_booking';

const createBookingSlice = createSlice({
    name: CREATE_BOOKING,
    initialState,
    reducers: {
        createBookingRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        createBookingSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        createBookingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        createBookingReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        createBookingLoadingSelector: (state) => state.loading,
        createBookingErrorSelector: (state) => state.error,
        createBookingSuccessSelector: (state) => state.success,
    }
});

export const {
    createBookingRequest,
    createBookingSuccess,
    createBookingFailure,
    createBookingReset
} = createBookingSlice.actions;

export const {
    createBookingLoadingSelector,
    createBookingErrorSelector,
    createBookingSuccessSelector
} = createBookingSlice.selectors;

export default createBookingSlice.reducer;