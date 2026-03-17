import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState={
    lecture:[],

}

export const getCourseLecture=createAsyncThunk("course/lecture/get" ,async (CId)=>{
    try{
                const response=axiosInstance.get(`/courses/${CId}`);
                toast.promise(response,{
                    loading:"Fatching the lecture",
                    success:"Lecture Fatch the lecture successfully!",
                    error:"Fail to load the lecture"
                })
                return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }

})
export const AddCourseLecture=createAsyncThunk("course/lecture/add" ,async (data)=>{
    try{
        const formData=new FormData();
        formData.append("lectur",data.lecture)
        formData.append("title",data.title)
        formData.append("description",data.description)
                const response=axiosInstance.post(`/courses/${data.id}`,formData);
                toast.promise(response,{
                    loading:"Adding course  lecture",
                    success:"Add course  lecture successfully!",
                    error:"Fail to add the course lecture"
                })
                return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }

})
export const DeleteCourseLecture=createAsyncThunk("course/lecture/delete" ,async (data)=>{
    try{
                const response=axiosInstance.post(`/courses/courseId=${data.courseId}&lecturId=${data.lectureId}`);
                toast.promise(response,{
                    loading:"Adding course  lecture",
                    success:"Add course  lecture successfully!",
                    error:"Fail to add the course lecture"
                })
                return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }

})

const LectrueSlice=createSlice({
    name:"Lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})


export default LectrueSlice.reducer;