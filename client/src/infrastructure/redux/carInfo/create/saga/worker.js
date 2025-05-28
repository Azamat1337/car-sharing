import { call, put } from 'redux-saga/effects';
import { carInfoService } from '../../../../services/carInfo/carInfoService';
import {
    createCarInfoSuccess,
    createCarInfoFailure
} from '../slice';

export function* createCarInfoWorker(action) {
    try {
        // action.payload: { carId, attributeName, attributeValue }
        const { carId, attributeName, attributeValue } = action.payload;
        yield call(carInfoService.create, carId, { attributeName, attributeValue });
        yield put(createCarInfoSuccess());
    } catch (error) {
        yield put(createCarInfoFailure(error?.response?.data?.message || error.message || 'Ошибка добавления характеристики'));
    }
}