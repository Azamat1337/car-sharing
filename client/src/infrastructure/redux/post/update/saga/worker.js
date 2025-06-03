import { call, put } from 'redux-saga/effects';
import {
    updatePostSuccess,
    updatePostFailure
} from '../slice';
import { postService } from '../../../../services/post/postService';

export function* updatePostWorker(action) {
    try {
        const { id, title, excerpt, content } = action.payload;
        yield call(postService.update, id, { title, excerpt, content });
        yield put(updatePostSuccess());
    } catch (error) {
        yield put(updatePostFailure(error.message || 'Ошибка обновления поста'));
    }
}
