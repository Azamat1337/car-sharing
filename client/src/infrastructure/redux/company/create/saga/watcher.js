import { takeLatest } from 'redux-saga/effects';
import { createCompanyRequest } from '../slice.js';
import { createCompanyWorker } from './worker.js';

export function* createCompanyWatcher() {
    yield takeLatest(createCompanyRequest.type, createCompanyWorker);
}