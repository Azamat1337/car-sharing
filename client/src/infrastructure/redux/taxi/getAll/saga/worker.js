import { call, put } from 'redux-saga/effects';
import { taxiService } from '../../../../services/taxi/taxiService';
import {
    getAllRidesSuccess,
    getAllRidesFailure
} from '../slice';

export function* getAllRidesWorker() {
    try {
        const rides = yield call(taxiService.fetchAllRides);
        yield put(getAllRidesSuccess(rides));
    } catch (error) {
        yield put(getAllRidesFailure(error?.response?.data?.message || error.message || 'Ошибка загрузки поездок'));
    }
}