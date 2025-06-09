import { call, put } from 'redux-saga/effects';
import { carService } from '../../../../services/cars/carService.js';
import { deleteCarSuccess, deleteCarFailure } from '../slice.js';

export function* deleteCarWorker(action) {
    try {
        const carId = action.payload;
        yield call(carService.remove, carId);
        yield put(deleteCarSuccess());
    } catch (error) {
        yield put(deleteCarFailure(error.response?.data?.message || error.message));
    }
}