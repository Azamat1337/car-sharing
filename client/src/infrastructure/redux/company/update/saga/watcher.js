import { takeLatest } from 'redux-saga/effects';
import { updateCompanyRequest } from '../slice.js';
import { updateCompanyWorker } from './worker.js';

export function* updateCompanyWatcher() {
    yield takeLatest(updateCompanyRequest.type, updateCompanyWorker);
}