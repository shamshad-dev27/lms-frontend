import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { purchaseCourseBundle, getRazorPayId, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { BiRupee } from "react-icons/bi";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpay_key = useSelector((state) => state?.razorpay?.key);
    const userDate = useSelector((state) => state?.auth?.data);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);

    async function handleSubscription(e) {
        e.preventDefault();
        if (!razorpay_key || !subscription_id) {
            toast.error("Something went wrong, please refresh");
            return;
        }

        const option = {
            key: razorpay_key,
            subscription_id: subscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Subscription",
            theme: { color: "#f34254" },
            prefill: {
                email: userDate.email,
                name: userDate.fullName,
            },
            modal: {
                ondismiss: function () {
                    toast.error("Payment cancelled");
                    navigate("/checkout/fail");
                }
            },
            handler: async function (response) {
                const paymentDetail = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    razorpay_subscription_id: response.razorpay_subscription_id || subscription_id,
                };

                const res = await dispatch(verifyUserPayment(paymentDetail));
                res?.payload?.success
                    ? navigate("/checkout/success")
                    : navigate("/checkout/fail");
            }
        };

        const paymentObject = new window.Razorpay(option);
        paymentObject.open();
    }

    async function load() {
        try {
            await dispatch(getRazorPayId());
            await dispatch(purchaseCourseBundle());
        } catch (e) {
            toast.error("Failed to initialize payment. Please refresh.");
            navigate("/");
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <form
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl rounded-tl-lg rounded-tr-lg font-bold">
                        Subscription Bundle
                    </h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase allows you to access all available courses
                            on our platform for{" "}
                            <span className="text-yellow-500 font-bold">
                                <br />1 Year
                            </span>
                            . All existing and upcoming courses will also be available.
                        </p>
                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee /> <span>499</span> only
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>*Terms and conditions apply*</p>
                        </div>
                        <button
                            type="submit"
                            disabled={!subscription_id}
                            className={`bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2 w-full 
  ${!subscription_id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            {subscription_id ? "Buy Now" : "Wait for a second"}
                        </button>
                    </div>
                </div>
            </form>
        </HomeLayout>
    );
}

export default Checkout;