import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    success: false,
    error: null,
};

export const DELETE_BOOKING = 'delete_booking';

const deleteBookingSlice = createSlice({
    name: DELETE_BOOKING,
    initialState,
    reducers: {
        deleteBookingRequest(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        deleteBookingSuccess(state) {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        deleteBookingFailure(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        deleteBookingReset(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    selectors: {
        deleteBookingLoadingSelector: (state) => state.loading,
        deleteBookingSuccessSelector: (state) => state.success,
        deleteBookingErrorSelector: (state) => state.error,
    }
});


export const {
    deleteBookingLoadingSelector,
    deleteBookingSuccessSelector,
    deleteBookingErrorSelector,
} = deleteBookingSlice.selectors;
export const {
    deleteBookingRequest,
    deleteBookingSuccess,
    deleteBookingFailure,
    deleteBookingReset,
} = deleteBookingSlice.actions;
export default deleteBookingSlice.reducer;
