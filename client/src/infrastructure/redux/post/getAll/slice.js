import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null, // теперь тут будет весь объект ответа с backend
    error: null
}

export const GET_ALL_POSTS = 'get_all_posts'

const getAllPostsSlice = createSlice({
    name: GET_ALL_POSTS,
    initialState,
    reducers: {
        getAllPostsRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        getAllPostsSuccess: (state, action) => {
            state.data = action.payload; // сохраняем весь объект (posts, totalItems, ...)
            state.loading = false;
        },
        getAllPostsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
    selectors: {
        getAllPostsLoadingSelector: (state) => state.loading,
        getAllPostsErrorSelector: (state) => state.error,
        getAllPostsDataSelector: (state) => state.data, // теперь возвращает весь объект
    }
})

export const {getAllPostsDataSelector, getAllPostsLoadingSelector, getAllPostsErrorSelector} = getAllPostsSlice.selectors;
export const {getAllPostsFailure, getAllPostsRequest, getAllPostsSuccess} = getAllPostsSlice.actions;
export default getAllPostsSlice.reducer;

