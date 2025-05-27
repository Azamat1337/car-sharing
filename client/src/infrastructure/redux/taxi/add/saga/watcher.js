import { takeLatest } from 'redux-saga/effects';
import { addRideRequest } from '../slice';
import { addRideWorker } from './worker';

export function* addRideWatcher() {
    yield takeLatest(addRideRequest.type, addRideWorker);
}