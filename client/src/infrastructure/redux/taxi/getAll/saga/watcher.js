import { takeLatest } from 'redux-saga/effects';
import { getAllRidesRequest } from '../slice';
import { getAllRidesWorker } from './worker';

export function* getAllRidesWatcher() {
    yield takeLatest(getAllRidesRequest.type, getAllRidesWorker);
}