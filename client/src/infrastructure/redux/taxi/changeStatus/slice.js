import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const CHANGE_RIDE_STATUS = 'change_ride_status';

const changeRideStatusSlice = createSlice({
    name: CHANGE_RIDE_STATUS,
    initialState,
    reducers: {
        changeRideStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        changeRideStatusSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        changeRideStatusFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        changeRideStatusReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        changeRideStatusLoadingSelector: (state) => state.loading,
        changeRideStatusErrorSelector: (state) => state.error,
        changeRideStatusSuccessSelector: (state) => state.success,
    }
});

export const {
    changeRideStatusRequest,
    changeRideStatusSuccess,
    changeRideStatusFailure,
    changeRideStatusReset
} = changeRideStatusSlice.actions;

export const {
    changeRideStatusLoadingSelector,
    changeRideStatusErrorSelector,
    changeRideStatusSuccessSelector
} = changeRideStatusSlice.selectors;

export default changeRideStatusSlice.reducer;