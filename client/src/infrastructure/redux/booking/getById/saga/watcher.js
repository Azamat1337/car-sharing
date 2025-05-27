import { takeLatest } from 'redux-saga/effects';
import { getBookingByIdRequest } from '../slice';
import { getBookingByIdWorker } from './worker';

export function* getBookingByIdWatcher() {
    yield takeLatest(getBookingByIdRequest.type, getBookingByIdWorker);
}