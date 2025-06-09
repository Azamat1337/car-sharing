import { call, put } from 'redux-saga/effects';
import { bookingService } from '../../../../services/bookings/bookingService';
import { deleteBookingSuccess, deleteBookingFailure } from '../slice';

export function* deleteBookingWorker(action) {
    try {
        yield call(bookingService.deleteBooking, action.payload);
        yield put(deleteBookingSuccess());
    } catch (error) {
        yield put(deleteBookingFailure(error.message));
    }
}