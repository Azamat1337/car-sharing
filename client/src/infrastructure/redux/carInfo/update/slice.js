import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const UPDATE_CAR_INFO = 'update_car_info';

const updateCarInfoSlice = createSlice({
    name: UPDATE_CAR_INFO,
    initialState,
    reducers: {
        updateCarInfoRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        updateCarInfoSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        updateCarInfoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        updateCarInfoReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        updateCarInfoLoadingSelector: (state) => state.loading,
        updateCarInfoErrorSelector: (state) => state.error,
        updateCarInfoSuccessSelector: (state) => state.success,
    }
});

export const {
    updateCarInfoRequest,
    updateCarInfoSuccess,
    updateCarInfoFailure,
    updateCarInfoReset
} = updateCarInfoSlice.actions;

export const {
    updateCarInfoLoadingSelector,
    updateCarInfoErrorSelector,
    updateCarInfoSuccessSelector
} = updateCarInfoSlice.selectors;

export default updateCarInfoSlice.reducer;