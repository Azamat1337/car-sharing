import { call, put } from 'redux-saga/effects';
import { bookingService } from '../../../../services/bookings/bookingService';
import {
    getBookingByIdSuccess,
    getBookingByIdFailure
} from '../slice';

export function* getBookingByIdWorker(action) {
    try {
        const data = yield call(bookingService.getBookingById, action.payload); // payload — id
        yield put(getBookingByIdSuccess(data));
    } catch (error) {
        yield put(getBookingByIdFailure(error?.response?.data?.message || error.message || 'Ошибка получения бронирования'));
    }
}