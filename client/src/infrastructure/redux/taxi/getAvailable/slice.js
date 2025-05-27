import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    rides: [],
};

export const GET_AVAILABLE_RIDES = 'get_available_rides';

const getAvailableRidesSlice = createSlice({
    name: GET_AVAILABLE_RIDES,
    initialState,
    reducers: {
        getAvailableRidesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAvailableRidesSuccess: (state, action) => {
            state.loading = false;
            state.rides = action.payload;
        },
        getAvailableRidesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getAvailableRidesReset: (state) => {
            state.loading = false;
            state.error = null;
            state.rides = [];
        }
    },
    selectors: {
        getAvailableRidesLoadingSelector: (state) => state.loading,
        getAvailableRidesErrorSelector: (state) => state.error,
        getAvailableRidesDataSelector: (state) => state.rides,
    }
});

export const {
    getAvailableRidesRequest,
    getAvailableRidesSuccess,
    getAvailableRidesFailure,
    getAvailableRidesReset
} = getAvailableRidesSlice.actions;

export const {
    getAvailableRidesLoadingSelector,
    getAvailableRidesErrorSelector,
    getAvailableRidesDataSelector
} = getAvailableRidesSlice.selectors;

export default getAvailableRidesSlice.reducer;