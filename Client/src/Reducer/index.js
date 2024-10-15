import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../Slice/authSlice"

const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
