import { takeLatest } from 'redux-saga/effects';
import { deleteCompanyRequest } from '../slice.js';
import { deleteCompanyWorker } from './worker.js';

export function* deleteCompanyWatcher() {
    yield takeLatest(deleteCompanyRequest.type, deleteCompanyWorker);
}