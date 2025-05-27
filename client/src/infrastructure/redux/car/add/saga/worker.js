import { call, put } from 'redux-saga/effects';
import { carService } from '../../../../services/cars/carService';
import {
    addCarSuccess,
    addCarFailure
} from '../slice';

export function* addCarWorker(action) {
    try {
        yield call(carService.create, action.payload);
        yield put(addCarSuccess());
    } catch (error) {
        yield put(addCarFailure(error?.response?.data?.message || error.message || 'Ошибка добавления машины'));
    }
}