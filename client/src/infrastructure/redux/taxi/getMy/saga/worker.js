import { call, put } from 'redux-saga/effects';
import { taxiService } from '../../../../services/taxi/taxiService';
import {
    getMyRidesSuccess,
    getMyRidesFailure
} from '../slice';

export function* getMyRidesWorker() {
    try {
        const rides = yield call(taxiService.fetchMyRides);
        yield put(getMyRidesSuccess(rides));
    } catch (error) {
        yield put(getMyRidesFailure(error?.response?.data?.message || error.message || 'Ошибка загрузки ваших поездок'));
    }
}