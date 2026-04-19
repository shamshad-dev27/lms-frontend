import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpay_key = useSelector((state) => state?.razorpay?.key);
    const userData = useSelector((state) => state?.auth?.data);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);

    async function handleSubscription(e) {
        e.preventDefault();
        if (!razorpay_key || !subscription_id) {
            toast.error("Payment initialization failed. Please refresh.");
            return;
        }

        const options = {
            key: razorpay_key,
            subscription_id: subscription_id,
            name: "Coursify Pvt. Ltd.",
            description: "Yearly Subscription Bundle",
            theme: { color: "#EAB308" }, // Yellow-500 match
            prefill: {
                email: userData.email,
                name: userData.fullName,
            },
            modal: {
                ondismiss: function () {
                    toast.error("Payment cancelled");
                }
            },
            handler: async function (response) {
                const paymentDetail = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    razorpay_subscription_id: response.razorpay_subscription_id || subscription_id,
                };

                const res = await dispatch(verifyUserPayment(paymentDetail));
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center bg-[#020617] px-4 py-10">
                
                {/* Background Decoration */}
                <div className="absolute w-72 h-72 bg-yellow-500/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                <form
                    onSubmit={handleSubscription}
                    className="z-10 w-full max-w-[350px] bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
                >
                    {/* Header */}
                    <header className="bg-yellow-500 py-6 text-center shadow-lg">
                        <h1 className="text-black text-2xl font-black tracking-tight uppercase">
                            Premium Access
                        </h1>
                    </header>

                    {/* Content Section */}
                    <div className="p-8 space-y-8 text-center">
                        <div className="space-y-3">
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Get unlimited access to all <span className="text-white font-bold">Existing & Upcoming</span> courses for
                            </p>
                            <div className="inline-block px-4 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                                <span className="text-yellow-500 font-bold text-lg">1 Year Validity</span>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="space-y-1">
                            <p className="flex items-center justify-center gap-1 text-5xl font-black text-white">
                                <BiRupee className="text-yellow-500 text-4xl" />
                                <span>499</span>
                            </p>
                            <p className="text-slate-500 text-xs font-medium tracking-widest uppercase">
                                All-inclusive price
                            </p>
                        </div>

                        {/* Features/Trust Signals */}
                        <div className="space-y-2 text-xs text-slate-400 font-medium">
                            <p className="flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
                                100% Refund on cancellation
                            </p>
                            <p className="opacity-60 italic">*Terms and conditions apply*</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!subscription_id}
                            className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 transform active:scale-95 shadow-xl
                                ${!subscription_id 
                                    ? "bg-slate-700 text-slate-500 cursor-not-allowed" 
                                    : "bg-yellow-500 text-black hover:bg-yellow-400 shadow-yellow-500/20"
                                }`}
                        >
                            {!subscription_id ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                                    Initializing...
                                </span>
                            ) : (
                                "Buy Now"
                            )}
                        </button>
                    </div>

                    {/* Footer bar */}
                    <div className="bg-slate-800/50 py-3 text-[10px] text-slate-500 text-center uppercase tracking-[0.2em]">
                        Secure Payment via Razorpay
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Checkout;