import { takeLatest } from 'redux-saga/effects';
import { joinRideRequest } from '../slice';
import { joinRideWorker } from './worker';

export function* joinRideWatcher() {
    yield takeLatest(joinRideRequest.type, joinRideWorker);
}