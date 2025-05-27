import { takeLatest } from 'redux-saga/effects';
import { getAllChatsRequest } from '../slice';
import { getAllChatsWorker } from './worker';

export function* getAllChatsWatcher() {
    yield takeLatest(getAllChatsRequest.type, getAllChatsWorker);
}