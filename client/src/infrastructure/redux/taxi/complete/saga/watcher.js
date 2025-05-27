import { takeLatest } from 'redux-saga/effects';
import { completeRideRequest } from '../slice';
import { completeRideWorker } from './worker';

export function* completeRideWatcher() {
    yield takeLatest(completeRideRequest.type, completeRideWorker);
}