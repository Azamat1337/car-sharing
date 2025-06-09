import { call, put } from 'redux-saga/effects';
import { companyService } from '../../../../services/company/companyService.js';
import { getOneCompanySuccess, getOneCompanyFailure } from '../slice.js';

export function* getOneCompanyWorker(action) {
    try {
        const companyId = action.payload;
        const company = yield call(companyService.fetchById, companyId);
        yield put(getOneCompanySuccess(company));
    } catch (error) {
        yield put(getOneCompanyFailure(error.response?.data?.message || error.message));
    }
}