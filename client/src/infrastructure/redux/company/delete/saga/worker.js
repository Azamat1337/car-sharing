import { call, put } from 'redux-saga/effects';
import { companyService } from '../../../../services/company/companyService.js';
import { deleteCompanySuccess, deleteCompanyFailure } from '../slice.js';

export function* deleteCompanyWorker(action) {
    try {
        const companyId = action.payload;
        yield call(companyService.remove, companyId);
        yield put(deleteCompanySuccess());
    } catch (error) {
        yield put(deleteCompanyFailure(error.response?.data?.message || error.message));
    }
}