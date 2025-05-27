import { call, put } from 'redux-saga/effects';
import { chatService } from '../../../../services/chat/chatService';
import {
    getChatMessagesSuccess,
    getChatMessagesFailure
} from '../slice';

export function* getChatMessagesWorker(action) {
    try {
        // action.payload — chatId
        const messages = yield call(chatService.fetchMessages, action.payload);
        yield put(getChatMessagesSuccess(messages));
    } catch (error) {
        yield put(getChatMessagesFailure(error?.response?.data?.message || error.message || 'Ошибка загрузки сообщений'));
    }
}