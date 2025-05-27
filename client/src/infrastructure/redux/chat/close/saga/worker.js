import { call, put } from 'redux-saga/effects';
import { chatService } from '../../../../services/chat/chatService';
import {
    closeConversationSuccess,
    closeConversationFailure
} from '../slice';

export function* closeConversationWorker(action) {
    try {
        yield call(chatService.closeConversation, action.payload); // payload — convId
        yield put(closeConversationSuccess());
    } catch (error) {
        yield put(closeConversationFailure(error?.response?.data?.message || error.message || 'Ошибка завершения чата'));
    }
}