import { takeLatest } from 'redux-saga/effects';
import { getOrCreateChatRequest } from '../slice';
import { getOrCreateChatWorker } from './worker';

export function* getOrCreateChatWatcher() {
    yield takeLatest(getOrCreateChatRequest.type, getOrCreateChatWorker);
}