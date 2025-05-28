import { call, put } from 'redux-saga/effects';
import { carInfoService } from '../../../../services/carInfo/carInfoService';
import {
    deleteCarInfoSuccess,
    deleteCarInfoFailure
} from '../slice';

export function* deleteCarInfoWorker(action) {
    try {
        // action.payload: { carId, infoId }
        const { carId, infoId } = action.payload;
        yield call(carInfoService.remove, carId, infoId);
        yield put(deleteCarInfoSuccess());
    } catch (error) {
        yield put(deleteCarInfoFailure(error?.response?.data?.message || error.message || 'Ошибка удаления характеристики'));
    }
}