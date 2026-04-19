import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helper/axiosInstance"

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: [],
    finalMonth: {},
    monthlySaleRecord: []
}

export const getRazorPayId = createAsyncThunk("/razorPay/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch (e) {
        toast.error("Failed to load data");
        throw e;
    }
})
export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
})
export const verifyUserPayment = createAsyncThunk("/payment/verify", async (data) => {
    try {
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
})
export const getPaymentRecode = createAsyncThunk("/payment/recode", async () => {
    try {
        const response = axiosInstance.get("/payments/?count=100");
        toast.promise(response, {
            loading: "wait ! All recodes are loading",
            success: (data) => {
                return data?.data?.message
            },
            error: "Faile to get payment recode"
        })
        return (await response).data;
    } catch (error) {
        toast.error("Operation failed ");
    }
})
export const cancelCourseBundle = createAsyncThunk("/payment/cancel", async () => {
    try {
        const responsePromise = axiosInstance.post("/payments/unsubscribe");

        toast.promise(responsePromise, {
            loading: "Unsubscribing...",
            success: (data) => data?.data?.message,
            error: "Failed to Unsubscribe"
        });

        const response = await responsePromise;
        return response.data;

    } catch (error) {
        toast.error(error?.response?.data?.message || "Operation failed");
        throw error;
    }
})
const razorPaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRazorPayId.fulfilled, (state, action) => {
            state.key = action?.payload?.key;

        })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(cancelCourseBundle.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.subscription_id = "";
                state.isPaymentVerified = false;
            })
            .addCase(cancelCourseBundle.rejected, (state) => {
                toast.error("Failed to cancel subscription");
            })
            .addCase(getPaymentRecode.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments;
                state.finalMonth = action?.payload?.finalMonth;
                state.monthlySaleRecord = action?.payload?.monthlySaleRecord;
            })

    }
})

export default razorPaySlice.reducer;