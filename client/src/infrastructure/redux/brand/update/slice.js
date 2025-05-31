import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const UPDATE_BRAND = 'update_brand';

const updateBrandSlice = createSlice({
    name: UPDATE_BRAND,
    initialState,
    reducers: {
        updateBrandRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        updateBrandSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        updateBrandFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        updateBrandReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        updateBrandLoadingSelector: (state) => state.loading,
        updateBrandErrorSelector: (state) => state.error,
        updateBrandSuccessSelector: (state) => state.success,
    }
});

export const {
    updateBrandLoadingSelector,
    updateBrandErrorSelector,
    updateBrandSuccessSelector
} = updateBrandSlice.selectors;

export const {
    updateBrandRequest,
    updateBrandSuccess,
    updateBrandFailure,
    updateBrandReset
} = updateBrandSlice.actions;

export default updateBrandSlice.reducer;