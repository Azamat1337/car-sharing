import { takeLatest } from "redux-saga/effects";
import { deleteBookingRequest } from "../slice";
import { deleteBookingWorker } from "./worker";

export function* deleteBookingWatcher() {
    yield takeLatest(deleteBookingRequest.type, deleteBookingWorker);
}