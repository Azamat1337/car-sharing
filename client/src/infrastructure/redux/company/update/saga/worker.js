import { call, put } from 'redux-saga/effects';
import { companyService } from '../../../../services/company/companyService.js';
import { updateCompanySuccess, updateCompanyFailure } from '../slice.js';

export function* updateCompanyWorker(action) {
    try {
        const { id, name, description, foundedYear } = action.payload;
        const company = yield call(companyService.update, id, { name, description, foundedYear });
        yield put(updateCompanySuccess(company));
    } catch (error) {
        yield put(updateCompanyFailure(error.response?.data?.message || error.message));
    }
}