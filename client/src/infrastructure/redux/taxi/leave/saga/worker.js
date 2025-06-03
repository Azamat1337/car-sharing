import { taxiService } from "../../../../services/taxi/taxiService";
import { leaveRideSuccess, leaveRideFailure } from "../slice";
import { call, put } from "redux-saga/effects";

export function* leaveRideWorker(action) {
    try {
        yield call(taxiService.leaveRide, action.payload);
        yield put(leaveRideSuccess());
    } catch (error) {
        yield put(leaveRideFailure(error?.response?.data?.message || error.message));
    }
}