import { call, put } from 'redux-saga/effects';
import { carInfoService } from '../../../../services/carInfo/carInfoService';
import {
    getCarInfoSuccess,
    getCarInfoFailure
} from '../slice';

export function* getCarInfoWorker(action) {
    try {
        const data = yield call(carInfoService.fetchCarById, action.payload);
        yield put(getCarInfoSuccess(data));
    } catch (error) {
        yield put(getCarInfoFailure(error?.response?.data?.message || error.message || 'Ошибка загрузки характеристик'));
    }
}