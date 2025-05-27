import { getAllPostsRequest } from "../slice.js";
import { takeLatest } from 'redux-saga/effects'
import { getAllPostsWorker } from "./worker.js";

export function* getAllPostsWatcher() {
    yield takeLatest(getAllPostsRequest.type, getAllPostsWorker)
}
