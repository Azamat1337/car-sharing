import { all } from 'redux-saga/effects';
import { fetchNewsWatcher } from '../news/get/saga/watcher.js';
import { getAllBrandsWatcher } from "../brand/get/saga/watcher.js";
import { addBrandWatcher } from "../brand/add/saga/watcher.js";
import { deleteBrandWatcher } from "../brand/delete/saga/watcher.js";
import { getAllPostsWatcher } from "../post/getAll/saga/watcher.js";
import { addPostWatcher } from "../post/add/saga/watcher.js";
import userWatcher from "../user/saga/watcher.js";
import { getMyBookingsWatcher } from "../booking/getMy/saga/watcher.js";
import { deletePostWatcher } from "../post/delete/saga/watcher.js";
import { getAllCarsWatcher } from '../car/getAll/saga/watcher.js';
import { addCarWatcher } from '../car/add/saga/watcher.js';
import { getCarInfoWatcher } from '../carInfo/get/saga/watcher.js';
import { getOrCreateChatWatcher } from '../chat/getOrCreateChat/saga/watcher.js';
import { getChatMessagesWatcher } from '../chat/getChatMessages/saga/watcher.js';
import { getAllChatsWatcher } from '../chat/getAllChats/saga/watcher.js';
import { getAllRidesWatcher } from '../taxi/getAll/saga/watcher.js';
import { addRideWatcher } from '../taxi/add/saga/watcher.js';
import { joinRideWatcher } from '../taxi/join/saga/watcher.js';
import { getMyRidesWatcher } from '../taxi/getMy/saga/watcher.js';
import { changeRideStatusWatcher } from '../taxi/changeStatus/saga/watcher.js';
import { getAvailableRidesWatcher } from '../taxi/getAvailable/saga/watcher.js';
import { completeRideWatcher } from '../taxi/complete/saga/watcher.js';
import { closeConversationWatcher } from '../chat/close/saga/watcher.js';
import { getAllBookingsWatcher } from '../booking/getAll/saga/watcher.js';
import { getBookingByIdWatcher } from '../booking/getById/saga/watcher.js';
import { createBookingWatcher } from '../booking/create/saga/watcher.js';
import { createCarInfoWatcher } from '../carInfo/create/saga/watcher.js';
import { updateCarInfoWatcher } from '../carInfo/update/saga/watcher.js';
import { deleteCarInfoWatcher } from '../carInfo/delete/saga/watcher.js';

export default function* rootSaga() {
    yield all([
        fetchNewsWatcher(),
        getAllBrandsWatcher(),
        addBrandWatcher(),
        deleteBrandWatcher(),
        getAllPostsWatcher(),
        addPostWatcher(),
        userWatcher(),
        getMyBookingsWatcher(),
        deletePostWatcher(),
        getAllCarsWatcher(),
        addCarWatcher(),
        getCarInfoWatcher(),
        getOrCreateChatWatcher(),
        getChatMessagesWatcher(),
        getAllChatsWatcher(),
        getAllRidesWatcher(),
        addRideWatcher(),
        joinRideWatcher(),
        getMyRidesWatcher(),
        changeRideStatusWatcher(),
        getAvailableRidesWatcher(),
        completeRideWatcher(),
        closeConversationWatcher(),
        getAllBookingsWatcher(),
        getBookingByIdWatcher(),
        createBookingWatcher(),
        createCarInfoWatcher(),
        updateCarInfoWatcher(),
        deleteCarInfoWatcher()
    ]);
}
