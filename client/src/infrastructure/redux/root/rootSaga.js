import { all } from 'redux-saga/effects';
import { fetchNewsWatcher } from '../news/get/saga/watcher.js';

export default function* rootSaga() {
    yield all([
        fetchNewsWatcher(),
    ]);
}
