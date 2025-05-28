import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const DELETE_CAR_INFO = 'delete_car_info';

const deleteCarInfoSlice = createSlice({
    name: DELETE_CAR_INFO,
    initialState,
    reducers: {
        deleteCarInfoRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        deleteCarInfoSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        deleteCarInfoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        deleteCarInfoReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        deleteCarInfoLoadingSelector: (state) => state.loading,
        deleteCarInfoErrorSelector: (state) => state.error,
        deleteCarInfoSuccessSelector: (state) => state.success,
    }
});

export const {
    deleteCarInfoRequest,
    deleteCarInfoSuccess,
    deleteCarInfoFailure,
    deleteCarInfoReset
} = deleteCarInfoSlice.actions;

export const {
    deleteCarInfoLoadingSelector,
    deleteCarInfoErrorSelector,
    deleteCarInfoSuccessSelector
} = deleteCarInfoSlice.selectors;

export default deleteCarInfoSlice.reducer;