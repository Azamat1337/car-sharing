import { takeLatest } from 'redux-saga/effects';
import { updateBookingWorker } from './worker';
import { updateBookingRequest } from '../slice';

export function* updateBookingWatcher() {
    yield takeLatest(updateBookingRequest.type, updateBookingWorker);
}