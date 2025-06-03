import { takeLatest } from "redux-saga/effects";
import { leaveRideWorker } from "./worker";
import { leaveRideRequest } from "../slice";

export function* leaveRideWatcher() {
    yield takeLatest(leaveRideRequest.type, leaveRideWorker);
}