import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null,
}

export const FETCH_NEWS = 'FETCH_NEWS';

const fetchNewsSlice = createSlice({
    name: FETCH_NEWS,
    initialState,
    reducers: {
        fetchNewsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchNewsSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        fetchNewsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
    selectors: {
        fetchNewsLoadingSelector: (state) => state.loading,
        fetchNewsDataSelector: (state) => state.data,
        fetchNewsErrorSelector: (state) => state.error,
    }
})

export const {fetchNewsFailure, fetchNewsRequest, fetchNewsSuccess} = fetchNewsSlice.actions;
export const {fetchNewsDataSelector, fetchNewsErrorSelector, fetchNewsLoadingSelector} = fetchNewsSlice.selectors;
export default fetchNewsSlice.reducer;