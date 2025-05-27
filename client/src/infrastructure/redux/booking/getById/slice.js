import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    booking: null,
};

export const GET_BOOKING_BY_ID = 'get_booking_by_id';

const getBookingByIdSlice = createSlice({
    name: GET_BOOKING_BY_ID,
    initialState,
    reducers: {
        getBookingByIdRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.booking = null;
        },
        getBookingByIdSuccess: (state, action) => {
            state.loading = false;
            state.booking = action.payload;
        },
        getBookingByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getBookingByIdReset: (state) => {
            state.loading = false;
            state.error = null;
            state.booking = null;
        }
    },
    selectors: {
        getBookingByIdDataSelector: (state) => state.booking,
        getBookingByIdLoadingSelector: (state) => state.loading,
        getBookingByIdErrorSelector: (state) => state.error,
    }
});

export const {
    getBookingByIdRequest,
    getBookingByIdSuccess,
    getBookingByIdFailure,
    getBookingByIdReset
} = getBookingByIdSlice.actions;

export const {
    getBookingByIdDataSelector,
    getBookingByIdLoadingSelector,
    getBookingByIdErrorSelector
} = getBookingByIdSlice.selectors;

export default getBookingByIdSlice.reducer;