import { call, put } from 'redux-saga/effects';
import { taxiService } from '../../../../services/taxi/taxiService';
import {
    completeRideSuccess,
    completeRideFailure
} from '../slice';
import { getMyRidesRequest } from '../../getMy/slice';

export function* completeRideWorker(action) {
    try {
        yield call(taxiService.completeRide, action.payload); // action.payload — это rideId
        yield put(completeRideSuccess());
        yield put(getMyRidesRequest());
    } catch (error) {
        yield put(completeRideFailure(error?.response?.data?.message || error.message || 'Ошибка завершения поездки'));
    }
}