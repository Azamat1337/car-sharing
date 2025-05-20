import {getAllPostsRequest} from "../slice.js";
import {takeLatest} from 'redux-saga/effects'
import {getAllPostsWorker} from "./watcher.js";

export function* getAllPostsWatcher() {
    yield takeLatest(getAllPostsRequest.type, getAllPostsWorker)
}