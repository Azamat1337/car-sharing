import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const CREATE_CAR_INFO = 'create_car_info';

const createCarInfoSlice = createSlice({
    name: CREATE_CAR_INFO,
    initialState,
    reducers: {
        createCarInfoRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        createCarInfoSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        createCarInfoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        createCarInfoReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        createCarInfoLoadingSelector: (state) => state.loading,
        createCarInfoErrorSelector: (state) => state.error,
        createCarInfoSuccessSelector: (state) => state.success,
    }
});

export const {
    createCarInfoRequest,
    createCarInfoSuccess,
    createCarInfoFailure,
    createCarInfoReset
} = createCarInfoSlice.actions;

export const {
    createCarInfoLoadingSelector,
    createCarInfoErrorSelector,
    createCarInfoSuccessSelector
} = createCarInfoSlice.selectors;

export default createCarInfoSlice.reducer;