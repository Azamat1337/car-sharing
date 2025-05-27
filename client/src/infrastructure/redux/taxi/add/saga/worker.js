import { call, put } from 'redux-saga/effects';
import { taxiService } from '../../../../services/taxi/taxiService';
import {
    addRideSuccess,
    addRideFailure
} from '../slice';

export function* addRideWorker(action) {
    try {
        const ride = yield call(taxiService.createRide, action.payload);
        yield put(addRideSuccess(ride));
    } catch (error) {
        yield put(addRideFailure(error?.response?.data?.message || error.message || 'Ошибка создания поездки'));
    }
}