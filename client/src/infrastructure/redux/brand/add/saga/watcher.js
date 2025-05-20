import {takeLatest} from 'redux-saga/effects';
import {addBrandRequest} from "../slice.js";
import {addBrandWorker} from "./worker.js";

export function* addBrandWatcher() {
    yield takeLatest(addBrandRequest.type, addBrandWorker);
}