import { call, put } from 'redux-saga/effects';
import { taxiService } from '../../../../services/taxi/taxiService';
import {
    changeRideStatusSuccess,
    changeRideStatusFailure
} from '../slice';
import { getAllRidesRequest } from '../../getAll/slice';

export function* changeRideStatusWorker(action) {
    try {
        // action.payload = { rideId, status }
        const { rideId, status } = action.payload;
        yield call(taxiService.changeRideStatus, rideId, status);
        yield put(getAllRidesRequest());
        yield put(changeRideStatusSuccess());
    } catch (error) {
        yield put(changeRideStatusFailure(error?.response?.data?.message || error.message || 'Ошибка изменения статуса'));
    }
}