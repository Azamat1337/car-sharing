import { call, put } from 'redux-saga/effects';
import { carInfoService } from '../../../../services/carInfo/carInfoService';
import {
    updateCarInfoSuccess,
    updateCarInfoFailure
} from '../slice';

export function* updateCarInfoWorker(action) {
    try {
        // action.payload: { carId, infoId, attributeName, attributeValue }
        const { carId, infoId, attributeName, attributeValue } = action.payload;
        yield call(carInfoService.update, carId, infoId, { attributeName, attributeValue });
        yield put(updateCarInfoSuccess());
    } catch (error) {
        yield put(updateCarInfoFailure(error?.response?.data?.message || error.message || 'Ошибка обновления характеристики'));
    }
}