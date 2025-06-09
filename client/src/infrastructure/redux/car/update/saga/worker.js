import { call, put } from 'redux-saga/effects';
import { carService } from '../../../../services/cars/carService.js';
import { updateCarSuccess, updateCarFailure } from '../slice.js';

export function* updateCarWorker(action) {
    try {
        const { id, ...updateData } = action.payload;
        const car = yield call(carService.update, id, updateData);
        yield put(updateCarSuccess(car));
    } catch (error) {
        yield put(updateCarFailure(error.response?.data?.message || error.message));
    }
}