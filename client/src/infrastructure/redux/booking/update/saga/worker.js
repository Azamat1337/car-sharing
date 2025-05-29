import { call, put } from 'redux-saga/effects';
import { bookingService } from '../../../../services/bookings/bookingService';
import {
    updateBookingSuccess,
    updateBookingFailure
} from '../slice';

export function* updateBookingWorker(action) {
    try {
        const { id, data } = action.payload;
        yield call(bookingService.updateBooking, id, data);
        yield put(updateBookingSuccess());
    } catch (error) {
        yield put(updateBookingFailure(error.message));
    }
}
