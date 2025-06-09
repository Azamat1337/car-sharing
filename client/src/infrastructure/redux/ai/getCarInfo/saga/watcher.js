import { takeLatest } from 'redux-saga/effects';
import { getAiCarInfoRequest } from '../slice.js';
import { getAiCarInfoWorker } from './worker.js';

export function* getAiCarInfoWatcher() {
    yield takeLatest(getAiCarInfoRequest.type, getAiCarInfoWorker);
}