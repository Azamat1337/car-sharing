import { takeLatest } from "redux-saga/effects";
import { getAllCarsRequest } from "../slice";
import { getAllCarsWorker } from "./worker";

export function* getAllCarsWatcher() {
    yield takeLatest(getAllCarsRequest.type, getAllCarsWorker);
}