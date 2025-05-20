import {deleteBrandSuccess, deleteBrandFailure} from "../slice.js";
import {put, call} from 'redux-saga/effects';
import {brandService} from "../../../../services/brands/brandsService.js";

export function* deleteBrandWorker(action) {
    try {
        const payload = yield call(brandService.remove, action.payload);
        yield put(deleteBrandSuccess(payload));
    } catch (e) {
        yield put(deleteBrandFailure(e.message));
    }
}