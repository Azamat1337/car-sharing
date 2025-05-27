import { takeLatest } from 'redux-saga/effects';
import { getMyRidesRequest } from '../slice';
import { getMyRidesWorker } from './worker';

export function* getMyRidesWatcher() {
    yield takeLatest(getMyRidesRequest.type, getMyRidesWorker);
}