import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
    userCount: 0,
    subscribedCount: 0
};

export const getStateData = createAsyncThunk("state/get", async () => {
    try {
        const responsePromise = axiosInstance.get("/user/stat");
        toast.promise(responsePromise, {
            loading: "Fetching stats...",
            success: (res) => res?.data?.message || "Success",
            error: (err) => err?.response?.data?.message || "Failed to fetch"
        });

        const res = await responsePromise;
        return res.data;
    } catch (error) {
        throw error; 
    }
});

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStateData.fulfilled, (state, action) => {
            const data = action?.payload?.userData;
            
            if (data) {
                state.userCount = data.userCount;
                state.subscribedCount = data.subscribedCount;
            }
        });
    }
});

export default stateSlice.reducer;