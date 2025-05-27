import { call, put } from 'redux-saga/effects';
import {
    getAllCarsSuccess,
    getAllCarsFailure
} from '../slice';
import { carService } from '../../../../services/cars/carService';

export function* getAllCarsWorker(action) {
    try {
        const data = yield call(carService.fetchAll, action.payload);
        yield put(getAllCarsSuccess(data));
    } catch (error) {
        yield put(getAllCarsFailure(error.message || 'Ошибка загрузки машин'));
    }
}