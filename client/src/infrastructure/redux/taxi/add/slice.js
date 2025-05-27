import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    ride: null,
};

export const ADD_RIDE = 'add_ride';

const addRideSlice = createSlice({
    name: ADD_RIDE,
    initialState,
    reducers: {
        addRideRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addRideSuccess: (state, action) => {
            state.loading = false;
            state.ride = action.payload;
        },
        addRideFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addRideReset: (state) => {
            state.loading = false;
            state.error = null;
            state.ride = null;
        }
    },
    selectors: {
        addRideLoadingSelector: (state) => state.loading,
        addRideErrorSelector: (state) => state.error,
        addRideDataSelector: (state) => state.ride,
    }
});

export const {
    addRideRequest,
    addRideSuccess,
    addRideFailure,
    addRideReset
} = addRideSlice.actions;

export const {
    addRideLoadingSelector,
    addRideErrorSelector,
    addRideDataSelector
} = addRideSlice.selectors;

export default addRideSlice.reducer;