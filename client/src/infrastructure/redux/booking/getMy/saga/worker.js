import {bookingService} from "../../../../services/bookings/bookingService.js";
import {getMyBookingsFailure, getMyBookingsSuccess} from "../slice.js";
import {put, call} from "redux-saga/effects";

export function* getMyBookingsWorker() {
    try {
        const response = yield call(bookingService.getMyBookings);
        yield put(getMyBookingsSuccess(response));
    } catch (error) {
        yield put(getMyBookingsFailure(error.message));
    }
}