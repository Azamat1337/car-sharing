import newsReducer from '../news/get/slice.js'
import {combineReducers} from "@reduxjs/toolkit";

import {FETCH_NEWS} from "../news/get/slice.js";

const rootReducer = combineReducers({
    [FETCH_NEWS]: newsReducer
})

export default rootReducer;