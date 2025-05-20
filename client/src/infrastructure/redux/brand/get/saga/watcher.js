import {getAllBrandsWorker} from "./worker.js";
import {takeLatest} from 'redux-saga/effects';
import {getBrandsRequest} from "../slice.js";

export function* getAllBrandsWatcher() {
    yield takeLatest(getBrandsRequest.type, getAllBrandsWorker);
}