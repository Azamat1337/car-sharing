import { takeLatest } from 'redux-saga/effects';
import { deleteCarRequest } from '../slice.js';
import { deleteCarWorker } from './worker.js';

export function* deleteCarWatcher() {
    yield takeLatest(deleteCarRequest.type, deleteCarWorker);
}