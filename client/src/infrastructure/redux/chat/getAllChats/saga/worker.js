import { call, put } from 'redux-saga/effects';
import { chatService } from '../../../../services/chat/chatService';
import {
    getAllChatsSuccess,
    getAllChatsFailure
} from '../slice';

export function* getAllChatsWorker() {
    try {
        const chats = yield call(chatService.fetchAllChats);
        yield put(getAllChatsSuccess(chats));
    } catch (error) {
        yield put(getAllChatsFailure(error?.response?.data?.message || error.message || 'Ошибка загрузки чатов'));
    }
}