import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
    count: 0,
    message: []
};

// FIX 1: Arguments mein (_, { rejectWithValue }) add kiya
export const getUserMessage = createAsyncThunk('user/getMessage', async (_, { rejectWithValue }) => {
    try {
        const res = axiosInstance.get('/contact/getMessage');
        
        toast.promise(res, {
            loading: "Loading Messages...",
            success: "Messages loaded successfully",
            error: "Failed to load messages"
        });

        const response = await res;
        return response.data; 
    } catch (e) {
        // FIX 2: Proper error handling aur return
        toast.error(e?.response?.data?.message || "Something went wrong");
        return rejectWithValue(e?.response?.data); 
    }
});

const messageSlice = createSlice({
    name: 'UserMessage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserMessage.fulfilled, (state, action) => {
                // Backend se agar 'userData' ya 'messages' aa raha hai toh check karein
                state.count = action.payload?.count || 0;
                state.message = action.payload?.messages || [];
            })
            .addCase(getUserMessage.rejected, (state) => {
                state.message = [];
                state.count = 0;
            });
    }
});

export default messageSlice.reducer;