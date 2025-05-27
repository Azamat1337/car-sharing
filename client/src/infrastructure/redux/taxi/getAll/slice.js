import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    rides: [],
};

export const GET_ALL_RIDES = 'get_all_rides';

const getAllRidesSlice = createSlice({
    name: GET_ALL_RIDES,
    initialState,
    reducers: {
        getAllRidesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllRidesSuccess: (state, action) => {
            state.loading = false;
            state.rides = action.payload;
        },
        getAllRidesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getAllRidesReset: (state) => {
            state.loading = false;
            state.error = null;
            state.rides = [];
        }
    },
    selectors: {
        getAllRidesLoadingSelector: (state) => state.loading,
        getAllRidesErrorSelector: (state) => state.error,
        getAllRidesDataSelector: (state) => state.rides,
    }
});

export const {
    getAllRidesRequest,
    getAllRidesSuccess,
    getAllRidesFailure,
    getAllRidesReset
} = getAllRidesSlice.actions;

export const {
    getAllRidesLoadingSelector,
    getAllRidesErrorSelector,
    getAllRidesDataSelector
} = getAllRidesSlice.selectors;

export default getAllRidesSlice.reducer;