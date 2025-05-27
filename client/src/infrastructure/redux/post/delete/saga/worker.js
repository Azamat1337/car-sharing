import { call, put } from 'redux-saga/effects';
import { postService } from '../../../../services/post/postService.js';
import {
    deletePostSuccess,
    deletePostFailure,
} from '../slice';

export function* deletePostWorker(action) {
    try {
        yield call(postService.remove, action.payload); // payload = id
        yield put(deletePostSuccess());
    } catch (error) {
        yield put(deletePostFailure(error.message));
    }
}


