import {deleteBrandWorker} from "./worker.js";
import {takeLatest} from 'redux-saga/effects';
import {deleteBrandRequest} from "../slice.js";

export function* deleteBrandWatcher() {
    yield takeLatest(deleteBrandRequest.type, deleteBrandWorker);
}
