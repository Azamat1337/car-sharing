import { fetchNewsWorker } from "./worker.js";
import { takeLatest } from 'redux-saga/effects'
import { fetchNewsRequest } from "../slice.js";

export function* fetchNewsWatcher() {
    yield takeLatest(fetchNewsRequest.type, fetchNewsWorker);
}

