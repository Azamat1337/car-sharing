import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: null,
    profile: null,
    loading: false,
    error: null,
    isAuth: false,
};

export const USER = 'user'

const userSlice = createSlice({
    name: USER,
    initialState,
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.token = action.payload;
            state.isAuth = true;
        },
        registerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        loginRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.token = action.payload;
            state.isAuth = true;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        fetchProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess(state, action) {
            state.loading = false;
            state.profile = action.payload;
        },
        fetchProfileFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        checkAuthRequest(state) {
            state.loading = true;
            state.error = null;
        },
        checkAuthSuccess(state, action) {
            state.loading = false;
            state.isAuth = true;
            state.profile = action.payload;
        },
        checkAuthFailure(state) {
            state.loading = false;
            state.isAuth = false;
            state.token = null;
            state.profile = null;
        },
        logout(state) {
            Object.assign(state, initialState);
        }
    }
})

export const {
    registerRequest, registerSuccess, registerFailure,
    loginRequest, loginSuccess, loginFailure,
    fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure,
    checkAuthFailure, checkAuthRequest, checkAuthSuccess,
    logout
} = userSlice.actions;
export default userSlice.reducer;