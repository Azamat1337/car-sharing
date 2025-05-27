import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    rides: [],
};

export const GET_MY_RIDES = 'get_my_rides';

const getMyRidesSlice = createSlice({
    name: GET_MY_RIDES,
    initialState,
    reducers: {
        getMyRidesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getMyRidesSuccess: (state, action) => {
            state.loading = false;
            state.rides = action.payload;
        },
        getMyRidesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getMyRidesReset: (state) => {
            state.loading = false;
            state.error = null;
            state.rides = [];
        }
    },
    selectors: {
        getMyRidesLoadingSelector: (state) => state.loading,
        getMyRidesErrorSelector: (state) => state.error,
        getMyRidesDataSelector: (state) => state.rides,
    }
});

export const {
    getMyRidesRequest,
    getMyRidesSuccess,
    getMyRidesFailure,
    getMyRidesReset
} = getMyRidesSlice.actions;

export const {
    getMyRidesLoadingSelector,
    getMyRidesErrorSelector,
    getMyRidesDataSelector
} = getMyRidesSlice.selectors;

export default getMyRidesSlice.reducer;