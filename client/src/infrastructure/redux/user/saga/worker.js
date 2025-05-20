import {call, put} from 'redux-saga/effects';
import {
    registerSuccess,
    registerFailure,
    loginSuccess,
    loginFailure,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
    logout, checkAuthFailure, checkAuthSuccess,
} from '../slice.js';
import {userService} from "../../../services/user/userService.js";

export function* handleRegister(action) {
    try {
        const { username, email, password } = action.payload;
        const response = yield call(userService.register, { username, email, password });
        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        yield put(registerSuccess(accessToken));
        yield put(fetchProfileRequest());
    } catch (err) {
        yield put(registerFailure(err.response?.data?.message || err.message));
    }
}

export function* handleLogin(action) {
    try {
        const { email, password } = action.payload;
        const response = yield call(userService.login, { email, password });

        const { accessToken, refreshToken } = response;

        localStorage.setItem('accessToken',  accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        yield put(loginSuccess(accessToken));

        yield put(fetchProfileRequest());
    } catch (err) {
        const msg = err.response?.data?.message || err.message;
        yield put(loginFailure(msg));
    }
}


export function* handleFetchProfile() {
    try {
        const profile = yield call(userService.getProfile);
        yield put(fetchProfileSuccess(profile));
    } catch (err) {
        yield put(fetchProfileFailure(err.response?.data?.message || err.message));
    }
}

export function* handleCheckAuth() {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            yield put(checkAuthFailure());
            return;
        }

        const profile = yield call(userService.getProfile);
        yield put(checkAuthSuccess(profile));

    } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        yield put(checkAuthFailure());
    }
}

export function* handleLogout() {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        yield call(userService.logout, refreshToken);
    } finally {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        yield put(logout());
    }
}