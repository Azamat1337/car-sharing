import { takeLatest } from 'redux-saga/effects';
import { getAllBookingsRequest } from '../slice';
import { getAllBookingsWorker } from './worker';

export function* getAllBookingsWatcher() {
    yield takeLatest(getAllBookingsRequest.type, getAllBookingsWorker);
}