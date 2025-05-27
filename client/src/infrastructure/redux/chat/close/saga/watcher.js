import { takeLatest } from 'redux-saga/effects';
import { closeConversationRequest } from '../slice';
import { closeConversationWorker } from './worker';

export function* closeConversationWatcher() {
    yield takeLatest(closeConversationRequest.type, closeConversationWorker);
}