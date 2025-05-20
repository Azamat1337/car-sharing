import {call, put} from 'redux-saga/effects';
import {addBrandSuccess, addBrandFailure} from "../slice.js";
import {brandService} from "../../../../services/brands/brandsService.js";

export function* addBrandWorker(action) {
    try {
        const data = yield call(brandService.create, action.payload);
        yield put(addBrandSuccess(data))
    } catch (e) {
        yield put(addBrandFailure(e.message));
    }
}