import { call, put } from 'redux-saga/effects';
import { companyService } from '../../../../services/company/companyService.js';
import { createCompanySuccess, createCompanyFailure } from '../slice.js';

export function* createCompanyWorker(action) {
    try {
        const { name, description, foundedYear } = action.payload;
        const company = yield call(companyService.create, { name, description, foundedYear });
        yield put(createCompanySuccess(company));
    } catch (error) {
        yield put(createCompanyFailure(error.response?.data?.message || error.message));
    }
}