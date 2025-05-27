import { takeLatest } from 'redux-saga/effects';
import { createBookingRequest } from '../slice';
import { createBookingWorker } from './worker';

export function* createBookingWatcher() {
    yield takeLatest(createBookingRequest.type, createBookingWorker);
}