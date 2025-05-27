import {takeLatest} from 'redux-saga/effects'
import {getMyBookingsWorker} from "./worker.js";
import {getMyBookingsRequest} from "../slice.js";

export function* getMyBookingsWatcher() {
    yield takeLatest(getMyBookingsRequest.type, getMyBookingsWorker);
}