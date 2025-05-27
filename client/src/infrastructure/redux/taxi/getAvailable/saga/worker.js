import { call, put } from 'redux-saga/effects';
import { taxiService } from '../../../../services/taxi/taxiService';
import {
    getAvailableRidesSuccess,
    getAvailableRidesFailure
} from '../slice';

export function* getAvailableRidesWorker() {
    try {
        const rides = yield call(taxiService.fetchAvailableRides);
        yield put(getAvailableRidesSuccess(rides));
    } catch (error) {
        yield put(getAvailableRidesFailure(error?.response?.data?.message || error.message || 'Ошибка загрузки доступных поездок'));
    }
}