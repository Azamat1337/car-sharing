import {postService} from "../../../../services/post/postService.js";
import {getAllPostsSuccess, getAllPostsFailure} from "../slice.js";
import {call, put} from 'redux-saga/effects'

export function* getAllPostsWorker(action) {
    try {
        const paginationParams = action.payload || {};
        const responseData = yield call(postService.fetchAll, paginationParams);

        yield put(getAllPostsSuccess(responseData));
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Не удалось загрузить посты';
        yield put(getAllPostsFailure(errorMessage));
    }
}