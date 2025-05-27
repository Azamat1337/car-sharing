import { takeLatest } from 'redux-saga/effects';
import { getChatMessagesRequest } from '../slice';
import { getChatMessagesWorker } from './worker';

export function* getChatMessagesWatcher() {
    yield takeLatest(getChatMessagesRequest.type, getChatMessagesWorker);
}