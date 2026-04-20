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
export const AddCourseLecture = createAsyncThunk("course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("lecture", data.lecture);

        const response = axiosInstance.post(`/courses/${data.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: 0
        });

        toast.promise(response, {
            loading: "Adding course lecture (it may take a few minutes)...",
            success: "Add course lecture successfully!",
            error: "Fail to add the course lecture"
        });

        const res = await response;
        return res.data;

    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
});
export const DeleteCourseLecture=createAsyncThunk("course/lecture/delete" ,async (data)=>{
    try{
                const response=axiosInstance.delete(`/courses/${data.courseId}/lecture/${data.lectureId}`);
                toast.promise(response,{
                    loading:"Deleting course  lecture",
                    success:"Delete course  lecture successfully!",
                    error:"Fail to Delete the course lecture"
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
            builder.addCase(getCourseLecture.fulfilled,(state,action)=>{
                state.lecture=action?.payload?.lecture;
            })
            .addCase(AddCourseLecture.fulfilled,(state,action)=>{
                  state.lecture=action?.payload?.course?.lecture;
            })
    }
})


export default LectrueSlice.reducer;