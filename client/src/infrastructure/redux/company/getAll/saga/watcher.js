import { takeLatest } from 'redux-saga/effects';
import { getAllCompaniesRequest } from '../slice.js';
import { getAllCompaniesWorker } from './worker.js';

export function* getAllCompaniesWatcher() {
    yield takeLatest(getAllCompaniesRequest.type, getAllCompaniesWorker);
}