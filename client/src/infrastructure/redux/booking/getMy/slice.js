import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    bookings: []
}

export const GET_MY_BOOKINGS = 'get_my_bookings';

const getMyBookingsSlice = createSlice({
    name: GET_MY_BOOKINGS,
    initialState,
    reducers: {
        getMyBookingsRequest: (state) => {
            state.loading = true;
        },
        getMyBookingsSuccess: (state, action) => {
            state.loading = false;
            state.bookings = action.payload;
        },
        getMyBookingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
    selectors: {
        getMyBookingsLoadingSelector: (state) => state.loading,
        getMyBookingsErrorSelector: (state) => state.error,
        getMyBookingsDataSelector: (state) => state.bookings
    }
})

export const {getMyBookingsDataSelector, getMyBookingsErrorSelector, getMyBookingsLoadingSelector} = getMyBookingsSlice.selectors;
export const {getMyBookingsFailure, getMyBookingsRequest, getMyBookingsSuccess} = getMyBookingsSlice.actions;
export default getMyBookingsSlice.reducer;