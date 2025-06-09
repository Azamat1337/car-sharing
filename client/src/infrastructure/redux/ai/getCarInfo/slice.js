import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null
}

export const GET_AI_CAR_INFO = 'get_ai_car_info'

const getAiCarInfoSlice = createSlice({
    name: GET_AI_CAR_INFO,
    initialState,
    reducers: {
        getAiCarInfoRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        getAiCarInfoSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        getAiCarInfoFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getAiCarInfoReset: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    },
    selectors: {
        getAiCarInfoLoadingSelector: (state) => state.loading,
        getAiCarInfoErrorSelector: (state) => state.error,
        getAiCarInfoDataSelector: (state) => state.data,
    }
})

export const { getAiCarInfoDataSelector, getAiCarInfoLoadingSelector, getAiCarInfoErrorSelector } = getAiCarInfoSlice.selectors;
export const { getAiCarInfoFailure, getAiCarInfoRequest, getAiCarInfoSuccess, getAiCarInfoReset } = getAiCarInfoSlice.actions;
export default getAiCarInfoSlice.reducer;