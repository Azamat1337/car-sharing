import { takeEvery, all, fork, takeLatest } from 'redux-saga/effects';
import {
    registerRequest,
    loginRequest,
    fetchProfileRequest,
    logoutRequest,
    checkAuthRequest,
} from '../slice';
import {
    handleRegister,
    handleLogin,
    handleFetchProfile,
    handleLogout,
    handleCheckAuth
} from './worker.js';

function* watchRegister() {
    yield takeEvery(registerRequest.type, handleRegister);
}

function* watchLogin() {
    yield takeEvery(loginRequest.type, handleLogin);
}

function* watchFetchProfile() {
    yield takeEvery(fetchProfileRequest.type, handleFetchProfile);
}

function* watchLogout() {
    yield takeEvery(logoutRequest.type, handleLogout);
}

function* watchCheckAuth() {
    yield takeLatest(checkAuthRequest.type, handleCheckAuth);
}

export default function* userWatcher() {
    yield all([
        fork(watchRegister),
        fork(watchLogin),
        fork(watchFetchProfile),
        fork(watchLogout),
        fork(watchCheckAuth),
    ]);
}