import { takeLatest } from 'redux-saga/effects';
import { getOneCompanyRequest } from '../slice.js';
import { getOneCompanyWorker } from './worker.js';

export function* getOneCompanyWatcher() {
    yield takeLatest(getOneCompanyRequest.type, getOneCompanyWorker);
}