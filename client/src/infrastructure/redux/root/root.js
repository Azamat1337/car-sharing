import newsReducer from '../news/get/slice.js'
import userReducer from '../user/slice.js'
import getBrandsReducer from '../brand/get/slice.js';
import addBrandReducer from '../brand/add/slice.js';
import deleteBrandReducer from '../brand/delete/slice.js';
import addPostReducer from '../post/add/slice.js';
import getAllPostsReducer from '../post/getAll/slice.js';
import {combineReducers} from "@reduxjs/toolkit";

import {GET_BRANDS} from "../brand/get/slice.js";
import {ADD_BRAND} from "../brand/add/slice.js";
import {DELETE_BRAND} from "../brand/delete/slice.js";
import {USER} from "../user/slice.js";
import {FETCH_NEWS} from "../news/get/slice.js";
import {GET_ALL_POSTS} from "../post/getAll/slice.js";
import {ADD_POST} from "../post/add/slice.js";

const rootReducer = combineReducers({
    [FETCH_NEWS]: newsReducer,
    [USER]: userReducer,
    [GET_BRANDS]: getBrandsReducer,
    [ADD_BRAND]: addBrandReducer,
    [DELETE_BRAND]: deleteBrandReducer,
    [GET_ALL_POSTS]: getAllPostsReducer,
    [ADD_POST]: addPostReducer,
})

export default rootReducer;