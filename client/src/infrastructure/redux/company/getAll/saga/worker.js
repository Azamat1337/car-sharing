import { call, put } from 'redux-saga/effects';
import { companyService } from '../../../../services/company/companyService.js';
import { getAllCompaniesSuccess, getAllCompaniesFailure } from '../slice.js';

export function* getAllCompaniesWorker() {
    try {
        console.log('Fetching all companies...');
        const companies = yield call(companyService.fetchAll);
        yield put(getAllCompaniesSuccess(companies));
    } catch (error) {
        yield put(getAllCompaniesFailure(error.message));
    }
}