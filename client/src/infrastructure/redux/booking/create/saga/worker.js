import { call, put } from 'redux-saga/effects';
import { bookingService } from '../../../../services/bookings/bookingService';
import {
    createBookingSuccess,
    createBookingFailure
} from '../slice';

export function* createBookingWorker(action) {
    try {
        yield call(bookingService.createBooking, action.payload);
        yield put(createBookingSuccess());
    } catch (error) {
        yield put(createBookingFailure(error?.response?.data?.message || error.message || 'Ошибка создания бронирования'));
    }
}