import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    data: [],
};

export const GET_CAR_INFO = 'get_car_info';

const carInfoSlice = createSlice({
    name: GET_CAR_INFO,
    initialState,
    reducers: {
        getCarInfoRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getCarInfoSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        getCarInfoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        carInfoReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = [];
        }
    },
    selectors: {
        carInfoLoadingSelector: (state) => state.loading,
        carInfoErrorSelector: (state) => state.error,
        carInfoDataSelector: (state) => state.data,
    }
});

export const {
    carInfoLoadingSelector,
    carInfoErrorSelector,
    carInfoDataSelector
} = carInfoSlice.selectors;

export const {
    getCarInfoRequest,
    getCarInfoSuccess,
    getCarInfoFailure,
    carInfoReset
} = carInfoSlice.actions;

export default carInfoSlice.reducer;