import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {purchaseCourseBundle,getRazorPayId, verifyUserPayment} from "../../Redux/Slices/RazorpaySlice"
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import {BiRupee}  from "react-icons/bi"

function Checkout(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const  razorpay_key=useSelector((state)=>state?.razorpay?.key);
    const userDate=useSelector((state)=>state?.auth?.data);
     
    const paymentDetail={
            razorpay_payment_id:"",
            razorpay_subscription_id:"",
            razorpay_signature:"",
    }


    async function handleSubscription(e){
        e.preventDefault();
        if(!razorpay_key||!subscription_id){
            toast.error("Something want wrong");
            return;
        }

        const option={
            key:razorpay_key,
            subscription_id:subscription_id,
            name:"Coursify .Pvt .Ltd.",
            description:"Subscription",
            them:{
                color:"#f34254"
            },
            prefill:{
               email:userDate.email,
               name:userDate.fullName,
            },
            handler:async function(response){
                paymentDetail.razorpay_payment_id=response.razorpay_payment_id;
                paymentDetail.razorpay_signature=response.razorpay_signature;
                paymentDetail.razorpay_subscription_id=response.razorpay_subscription_id;
                toast.success("Payment successful");
                const res= await dispatch(verifyUserPayment(paymentDetail));
               (res?.payload?.success)?navigate("/checkout/success"):navigate("/checkout/fail");
            }
        }
        const paymentObject=new window.Razorpay(option);
        paymentObject.open();
    }

    async function load(){
      await dispatch(getRazorPayId());
      await dispatch(purchaseCourseBundle());
    }
    
    useEffect(()=>{
      load();
    },[])
   return(
    <HomeLayout>
            <form onSubmit={handleSubscription}
            className="min-h-[90vh] flex  items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem]  flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                     <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl rounded-tl-lg rounded-tr-lg font-bold">
                        Subscription Bundle
                     </h1>
                     <div className="px-4 space-y-5  text-center">
                         <p className="text-[17px]">
                          This purchase allow you to access all available course 
                          of our platform for {" "}
                          <span className="text-yellow-500 font-bold">
                            <br />
                            1 Year duration
                          </span>
                          {" "}
                           All  the  existing and new  lounch course will be also available
                         </p>
                         <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee className=""/> <span>499</span> only
                         </p>
                         <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p >*term and condition applied*</p>
                         </div>
                         <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300  absolute bottom-0 left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2 w-full">
                             By now
                         </button>
                     </div>
                </div>

            </form>
    </HomeLayout>
   )
}

export default Checkout;