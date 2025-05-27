import { takeLatest } from 'redux-saga/effects';
import { changeRideStatusRequest } from '../slice';
import { changeRideStatusWorker } from './worker';

export function* changeRideStatusWatcher() {
    yield takeLatest(changeRideStatusRequest.type, changeRideStatusWorker);
}