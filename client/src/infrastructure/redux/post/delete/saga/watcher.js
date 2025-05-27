import {deletePostRequest} from "../slice.js";
import {deletePostWorker} from "./worker.js";
import {takeLatest} from 'redux-saga/effects'

export function* deletePostWatcher() {
    yield takeLatest(deletePostRequest.type, deletePostWorker);
}