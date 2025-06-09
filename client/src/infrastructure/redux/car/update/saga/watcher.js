import { takeLatest } from 'redux-saga/effects';
import { updateCarRequest } from '../slice.js';
import { updateCarWorker } from './worker.js';

export function* updateCarWatcher() {
    yield takeLatest(updateCarRequest.type, updateCarWorker);
}