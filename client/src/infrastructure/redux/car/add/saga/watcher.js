import { takeLatest } from 'redux-saga/effects';
import { addCarRequest } from '../slice';
import { addCarWorker } from './worker';

export function* addCarWatcher() {
    yield takeLatest(addCarRequest.type, addCarWorker);
}