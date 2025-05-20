import {addPostWorker} from "./worker.js";
import {takeLatest} from 'redux-saga/effects'
import {addPostRequest} from "../slice.js";

export function* addPostWatcher() {
    yield takeLatest(addPostRequest.type, addPostWorker);
}