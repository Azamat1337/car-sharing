import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    bookings: [],
};

export const GET_ALL_BOOKINGS = 'get_all_bookings';

const getAllBookingsSlice = createSlice({
    name: GET_ALL_BOOKINGS,
    initialState,
    reducers: {
        getAllBookingsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllBookingsSuccess: (state, action) => {
            state.loading = false;
            state.bookings = action.payload;
        },
        getAllBookingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getAllBookingsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.bookings = [];
        }
    },
    selectors: {
        getAllBookingsDataSelector: (state) => state.bookings,
        getAllBookingsLoadingSelector: (state) => state.loading,
        getAllBookingsErrorSelector: (state) => state.error,
    }
});

export const {
    getAllBookingsRequest,
    getAllBookingsSuccess,
    getAllBookingsFailure,
    getAllBookingsReset
} = getAllBookingsSlice.actions;

export const {
    getAllBookingsDataSelector,
    getAllBookingsLoadingSelector,
    getAllBookingsErrorSelector
} = getAllBookingsSlice.selectors;

export default getAllBookingsSlice.reducer;