import {fetchNewsWorker} from "./worker.js";
import {takeLatest} from 'redux-saga/effects'
import {fetchNewsRequest} from "../slice.js";

export function* fetchNewsWatcher() {
    console.log('popal')
    yield takeLatest(fetchNewsRequest.type, fetchNewsWorker);
}

