import { takeLatest } from "redux-saga/effects";
import { updatePostRequest } from "../slice.js";
import { updatePostWorker } from "./worker.js";

export function* updatePostWatcher() {
    yield takeLatest(updatePostRequest.type, updatePostWorker);
}