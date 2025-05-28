import { takeLatest } from 'redux-saga/effects';
import { deleteCarInfoRequest } from '../slice';
import { deleteCarInfoWorker } from './worker';

export function* deleteCarInfoWatcher() {
    yield takeLatest(deleteCarInfoRequest.type, deleteCarInfoWorker);
}