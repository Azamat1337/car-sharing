import { takeLatest } from 'redux-saga/effects';
import { createCarInfoRequest } from '../slice';
import { createCarInfoWorker } from './worker';

export function* createCarInfoWatcher() {
    yield takeLatest(createCarInfoRequest.type, createCarInfoWorker);
}