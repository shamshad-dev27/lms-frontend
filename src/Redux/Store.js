import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice"
import courseSliceReducer from "./Slices/CourseSlice"
import razorPaySlice from "./Slices/RazorpaySlice"
import LectureSliceReducer from "./Slices/LectureSlice"
import Usermessage from "./Slices/ContactSlice"
import StateData from "./Slices/StatSlice"
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        courses:courseSliceReducer,
        razorpay:razorPaySlice,
        lecture:LectureSliceReducer,
        stat:StateData,
        message:Usermessage
    },
    devTools:true,
});
export default store;