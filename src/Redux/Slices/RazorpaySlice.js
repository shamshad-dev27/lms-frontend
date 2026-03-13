import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helper/axiosInstance"

const initialState={
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:[],
    finalMonth:{},
    monthlySaleRecord:[]
}

const getRazorPayId=createAsyncThunk("/razorPay/getId",async ()=>{
    try{
         const response=await axiosInstance.get("/payments/razorpay-key");
         return response.data;
    }catch(e){
        toast.error("faile to load data");
    }
})
const purchaseCourseBundle=createAsyncThunk("/purchaseCourse",async ()=>{
    try{
         const response=await axiosInstance.post("/payments/subscribe");
         return response.data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const verifyUserPayment=createAsyncThunk("/payment/verify",async (data)=>{
    try{
         const response=await axiosInstance.post("/payments/verify",{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature,
         });
         return response.data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const getPaymentRecode=createAsyncThunk("/payment/recode",async ()=>{
    try{
         const response= axiosInstance.get("/payments?count=100");
         toast.promise(response,{
            loading:"wait ! All recodes are loading",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Faile to get payment recode"
         })
         return (await response).data;
    }catch(error){
        toast.error("Operation failed ");
    }
})
const cancelCourseBundle=createAsyncThunk("/payment/cancel",async ()=>{
    try{
         const response= axiosInstance.post("/payments/unsubscribe");
         toast.promise(response,{
            loading:"Unsubscribe the bundle",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Faile to Unsubscribe"
         })
         return (await response).data;
    }catch(error){
        toast.error("Operation failed ");
    }
})

const razorPaySlice=createSlice({
    name:'razorpay',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key;

        })

    }
})

export default razorPaySlice.reducer;