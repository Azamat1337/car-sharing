import {postService} from "../../../../services/post/postService.js";
import {addPostSuccess, addPostFailure} from "../slice.js";
import {call, put} from 'redux-saga/effects';

export function* addPostWorker(action) {
    try {
        const postData = action.payload;
        const newPost = yield call(postService.create, postData);

        yield put(addPostSuccess(newPost));

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Не удалось создать пост';
        yield put(addPostFailure(errorMessage));
    }
}