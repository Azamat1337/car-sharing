import {getBrandsSuccess, getBrandsFailure} from "../slice.js";
import {call, put} from 'redux-saga/effects';
import {brandService} from "../../../../services/brands/brandsService.js";

export function* getAllBrandsWorker() {
    try {
        const items = yield call(brandService.fetchAll);
        console.log('brands', items);
        yield put(getBrandsSuccess(items));
    } catch (e) {
        yield put(getBrandsFailure(e.message));
    }
}