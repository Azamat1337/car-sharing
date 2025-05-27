import { call, put } from 'redux-saga/effects';
import { chatService } from '../../../../services/chat/chatService';
import {
    getOrCreateChatSuccess,
    getOrCreateChatFailure
} from '../slice';

export function* getOrCreateChatWorker(action) {
    try {
        // payload может быть пустым или содержать subject/receiverId и т.д.
        const chat = yield call(chatService.createChat, action.payload);
        yield put(getOrCreateChatSuccess(chat));
    } catch (error) {
        yield put(getOrCreateChatFailure(error?.response?.data?.message || error.message || 'Ошибка создания или получения чата'));
    }
}