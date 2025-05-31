import { takeLatest } from "redux-saga/effects";
import { updateBrandWorker } from './worker'
import { updateBrandRequest } from "../slice";

export function* updateBrandWatcher() {
    yield takeLatest(updateBrandRequest.type, updateBrandWorker);
}