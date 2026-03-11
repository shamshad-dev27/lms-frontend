import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState={
    CourseData:[]
}
export const getAllCourse=createAsyncThunk("/course/get",async ()=>{
         try{
             const response=axiosInstance.get("/courses");
             toast.promise(response,{
                loading:"loading course data....",
                success:"Course Loading successfully",
                error:"Fail to Loading the data"
             })
             
             return (await response).data.courses;
         }catch(e){
            toast.error(e?.reponse?.data?.message);
         }
})
export const createNewCourses=createAsyncThunk("/course/create",async(data)=>{
    try{
        const formData=new FormData();
        formData.append('title',data?.title)
        formData.append('description',data?.description)
        formData.append('category',data?.category)
        formData.append('createdBy',data?.createdBy)
        formData.append('thumbnail',data?.thumbnail)
      const res=axiosInstance.post("/courses/",formData);
      toast.promise(res,{
        loading:"Creating new course",
        success:"Create course successfully",
        error:"Fail to create a course"
      })
      return (await res).data;
    }catch(e){
      toast.error(e?.response?.data?.message);
    }
})


const courseSlice=createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourse.fulfilled,(state,action)=>{
            if(action.payload){
                state.CourseData=[...action?.payload];
            }
        })
    }
});

export default courseSlice.reducer;