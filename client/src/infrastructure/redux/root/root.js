import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from '../news/get/slice.js'
import userReducer from '../user/slice.js'
import getBrandsReducer from '../brand/get/slice.js';
import addBrandReducer from '../brand/add/slice.js';
import deleteBrandReducer from '../brand/delete/slice.js';
import addPostReducer from '../post/add/slice.js';
import getAllPostsReducer from '../post/getAll/slice.js';
import getMyBookingsReducer from '../booking/getMy/slice.js'
import getAllCarsReducer from '../car/getAll/slice.js';
import addCarReducer from '../car/add/slice.js';
import getCarInfoReducer from '../carInfo/get/slice.js';
import getOrCreateChatReducer from '../chat/getOrCreateChat/slice.js';
import getChatMessagesReducer from '../chat/getChatMessages/slice.js';
import getAllChatsReducer from '../chat/getAllChats/slice.js';
import getAllRidesReducer from '../taxi/getAll/slice.js';
import addRideReducer from '../taxi/add/slice.js';
import getAvailableRidesReducer from '../taxi/getAvailable/slice.js';
import joinRideReducer from '../taxi/join/slice.js';
import getMyRidesReducer from '../taxi/getMy/slice.js';
import changeRideStatusReducer from '../taxi/changeStatus/slice.js';
import completeRideReducer from '../taxi/complete/slice.js';
import closeConversationReducer from '../chat/close/slice.js';
import getAllBookingsReducer from '../booking/getAll/slice.js';
import getBookingByIdReducer from '../booking/getById/slice.js';
import createBookingReducer from '../booking/create/slice.js';
import createCarInfoReducer from '../carInfo/create/slice.js';
import updateCarInfoReducer from '../carInfo/update/slice.js';
import deleteCarInfoReducer from '../carInfo/delete/slice.js';
import updateBookingReducer from '../booking/update/slice.js';
import updateBrandReducer from '../brand/update/slice.js';
import updatePostReducer from '../post/update/slice.js';
import deletePostReducer from '../post/delete/slice.js';
import leaveRideReducer from '../taxi/leave/slice.js';

import { GET_BRANDS } from "../brand/get/slice.js";
import { ADD_BRAND } from "../brand/add/slice.js";
import { DELETE_BRAND } from "../brand/delete/slice.js";
import { USER } from "../user/slice.js";
import { FETCH_NEWS } from "../news/get/slice.js";
import { GET_ALL_POSTS } from "../post/getAll/slice.js";
import { ADD_POST } from "../post/add/slice.js";
import { GET_MY_BOOKINGS } from "../booking/getMy/slice.js";
import { GET_ALL_CARS } from '../car/getAll/slice.js';
import { ADD_CAR } from '../car/add/slice.js';
import { GET_CAR_INFO } from "../carInfo/get/slice.js";
import { GET_OR_CREATE_CHAT } from "../chat/getOrCreateChat/slice.js";
import { GET_CHAT_MESSAGES } from "../chat/getChatMessages/slice.js";
import { GET_ALL_CHATS } from "../chat/getAllChats/slice.js";
import { GET_ALL_RIDES } from "../taxi/getAll/slice.js";
import { ADD_RIDE } from "../taxi/add/slice.js";
import { GET_AVAILABLE_RIDES } from "../taxi/getAvailable/slice.js";
import { JOIN_RIDE } from "../taxi/join/slice.js";
import { GET_MY_RIDES } from "../taxi/getMy/slice.js";
import { CHANGE_RIDE_STATUS } from "../taxi/changeStatus/slice.js";
import { COMPLETE_RIDE } from "../taxi/complete/slice.js";
import { CLOSE_CONVERSATION } from "../chat/close/slice.js";
import { GET_ALL_BOOKINGS } from "../booking/getAll/slice.js";
import { GET_BOOKING_BY_ID } from "../booking/getById/slice.js";
import { CREATE_BOOKING } from "../booking/create/slice.js";
import { CREATE_CAR_INFO } from "../carInfo/create/slice.js";
import { UPDATE_CAR_INFO } from "../carInfo/update/slice.js";
import { DELETE_CAR_INFO } from "../carInfo/delete/slice.js";
import { UPDATE_BOOKING } from "../booking/update/slice.js";
import { UPDATE_BRAND } from "../brand/update/slice.js";
import { UPDATE_POST } from "../post/update/slice.js";
import { DELETE_POST } from "../post/delete/slice.js";
import { LEAVE_RIDE } from "../taxi/leave/slice.js";

const rootReducer = combineReducers({
    [FETCH_NEWS]: newsReducer,
    [USER]: userReducer,
    [GET_BRANDS]: getBrandsReducer,
    [ADD_BRAND]: addBrandReducer,
    [DELETE_BRAND]: deleteBrandReducer,
    [GET_ALL_POSTS]: getAllPostsReducer,
    [ADD_POST]: addPostReducer,
    [GET_MY_BOOKINGS]: getMyBookingsReducer,
    [GET_ALL_CARS]: getAllCarsReducer,
    [ADD_CAR]: addCarReducer,
    [GET_CAR_INFO]: getCarInfoReducer,
    [GET_OR_CREATE_CHAT]: getOrCreateChatReducer,
    [GET_CHAT_MESSAGES]: getChatMessagesReducer,
    [GET_ALL_CHATS]: getAllChatsReducer,
    [GET_ALL_RIDES]: getAllRidesReducer,
    [ADD_RIDE]: addRideReducer,
    [GET_AVAILABLE_RIDES]: getAvailableRidesReducer,
    [JOIN_RIDE]: joinRideReducer,
    [GET_MY_RIDES]: getMyRidesReducer,
    [CHANGE_RIDE_STATUS]: changeRideStatusReducer,
    [COMPLETE_RIDE]: completeRideReducer,
    [CLOSE_CONVERSATION]: closeConversationReducer,
    [GET_ALL_BOOKINGS]: getAllBookingsReducer,
    [GET_BOOKING_BY_ID]: getBookingByIdReducer,
    [CREATE_BOOKING]: createBookingReducer,
    [CREATE_CAR_INFO]: createCarInfoReducer,
    [UPDATE_CAR_INFO]: updateCarInfoReducer,
    [DELETE_CAR_INFO]: deleteCarInfoReducer,
    [UPDATE_BOOKING]: updateBookingReducer,
    [UPDATE_BRAND]: updateBrandReducer,
    [UPDATE_POST]: updatePostReducer,
    [DELETE_POST]: deletePostReducer,
    [LEAVE_RIDE]: leaveRideReducer,
})

export default rootReducer;