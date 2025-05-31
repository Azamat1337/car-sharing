import { call, put } from 'redux-saga/effects';
import { updateBrandSuccess, updateBrandFailure } from '../slice';
import { brandService } from '../../../../services/brands/brandsService';

export function* updateBrandWorker(action) {
    try {
        const { id, name } = action.payload;
        yield call(brandService.updateBrand, id, { name });
        yield put(updateBrandSuccess());
    } catch (error) {
        yield put(updateBrandFailure(error.message || 'Ошибка обновления бренда'));
    }
}
