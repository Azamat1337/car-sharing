import { takeLatest } from 'redux-saga/effects';
import { updateCarInfoRequest } from '../slice';
import { updateCarInfoWorker } from './worker';

export function* updateCarInfoWatcher() {
    yield takeLatest(updateCarInfoRequest.type, updateCarInfoWorker);
}