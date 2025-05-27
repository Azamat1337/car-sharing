import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null
};

export const GET_ALL_CARS = 'get_all_cars';

const getAllCarsSlice = createSlice({
    name: GET_ALL_CARS,
    initialState,
    reducers: {
        getAllCarsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllCarsSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        getAllCarsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
    selectors: {
        getAllCarsLoadingSelector: (state) => state.loading,
        getAllCarsErrorSelector: (state) => state.error,
        getAllCarsDataSelector: (state) => state.data,
    }
});

export const {
    getAllCarsDataSelector,
    getAllCarsLoadingSelector,
    getAllCarsErrorSelector
} = getAllCarsSlice.selectors;

export const {
    getAllCarsRequest,
    getAllCarsSuccess,
    getAllCarsFailure
} = getAllCarsSlice.actions;

export default getAllCarsSlice.reducer;