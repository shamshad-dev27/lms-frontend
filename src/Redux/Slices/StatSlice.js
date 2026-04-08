import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helper/axiosInstance"

const initialState={
    userCount:0,
    subscribedCount:0
}


const getStateData=createAsyncThunk("state/get",async ()=>{
    try{
           const response=axiosInstance.get("/admin/state/user");
           toast.promise(response,{
               loading:"Get loading state...",
               success:(data)=>{
                return data?.data?.message;
               },
               error:"faild load state data"
           })
           return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const stateSlice=createSlice({
    name:"state",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{}
})

export default stateSlice.reducer;