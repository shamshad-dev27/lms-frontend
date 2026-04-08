import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice"
import courseSliceReducer from "./Slices/CourseSlice"
import razorPaySlice from "./Slices/RazorpaySlice"
import LectureSliceReducer from "./Slices/LectureSlice"
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        courses:courseSliceReducer,
        razorpay:razorPaySlice,
        lecture:LectureSliceReducer
    },
    devTools:true,
});
export default store;