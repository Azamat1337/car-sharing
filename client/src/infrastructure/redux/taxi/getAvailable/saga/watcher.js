import { takeLatest } from 'redux-saga/effects';
import { getAvailableRidesRequest } from '../slice';
import { getAvailableRidesWorker } from './worker';

export function* getAvailableRidesWatcher() {
    yield takeLatest(getAvailableRidesRequest.type, getAvailableRidesWorker);
}