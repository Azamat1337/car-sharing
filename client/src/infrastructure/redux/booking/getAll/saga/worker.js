import { call, put } from 'redux-saga/effects';
import { bookingService } from '../../../../services/bookings/bookingService';
import {
    getAllBookingsSuccess,
    getAllBookingsFailure
} from '../slice';

export function* getAllBookingsWorker() {
    try {
        const data = yield call(bookingService.getAllBookings);
        yield put(getAllBookingsSuccess(data));
    } catch (error) {
        yield put(getAllBookingsFailure(error?.response?.data?.message || error.message || 'Ошибка получения бронирований'));
    }
}