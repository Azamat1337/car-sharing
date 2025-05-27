import { call, put } from 'redux-saga/effects';
import { taxiService } from '../../../../services/taxi/taxiService';
import {
    joinRideSuccess,
    joinRideFailure
} from '../slice';

export function* joinRideWorker(action) {
    try {
        yield call(taxiService.joinRide, action.payload); // payload — это rideId
        yield put(joinRideSuccess());
    } catch (error) {
        yield put(joinRideFailure(error?.response?.data?.message || error.message || 'Ошибка регистрации на поездку'));
    }
}