import { takeLatest } from 'redux-saga/effects';
import { getCarInfoRequest } from '../slice';
import { getCarInfoWorker } from './worker';

export function* getCarInfoWatcher() {
    yield takeLatest(getCarInfoRequest.type, getCarInfoWorker);
}