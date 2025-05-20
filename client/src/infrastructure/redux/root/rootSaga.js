import { all } from 'redux-saga/effects';
import { fetchNewsWatcher } from '../news/get/saga/watcher.js';
import {getAllBrandsWatcher} from "../brand/get/saga/watcher.js";
import {addBrandWatcher} from "../brand/add/saga/watcher.js";
import {deleteBrandWatcher} from "../brand/delete/saga/watcher.js";
import {getAllPostsWatcher} from "../post/getAll/saga/worker.js";
import {addPostWatcher} from "../post/add/saga/watcher.js";
import userWatcher from "../user/saga/watcher.js";

export default function* rootSaga() {
    yield all([
        fetchNewsWatcher(),
        getAllBrandsWatcher(),
        addBrandWatcher(),
        deleteBrandWatcher(),
        getAllPostsWatcher(),
        addPostWatcher(),
        userWatcher(),
    ]);
}
