import { call, put } from 'redux-saga/effects';
import { aiService } from '../../../../services/ai/aiService.js';
import { getAiCarInfoSuccess, getAiCarInfoFailure } from '../slice.js';

export function* getAiCarInfoWorker(action) {
    try {
        const carData = action.payload;
        const aiResponse = yield call(aiService.getCarInfo, carData);
        yield put(getAiCarInfoSuccess(aiResponse));
    } catch (error) {
        yield put(getAiCarInfoFailure(error.message));
    }
}