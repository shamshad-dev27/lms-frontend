import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function CheckoutSuccess() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Update user state to reflect active subscription immediately
        dispatch(getUserData());
    }, [dispatch]);

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] bg-[#020617] px-4">
                
                {/* Background Success Glow */}
                <div className="absolute w-72 h-72 bg-green-500/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                <div className="z-10 w-full max-w-[350px] bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative transition-all duration-300 hover:border-green-500/30">
                    
                    {/* Success Header Banner */}
                    <div className="bg-green-500 py-6 text-center shadow-lg">
                        <h1 className="text-white text-2xl font-black tracking-tight uppercase">
                            Payment Successful!
                        </h1>
                    </div>

                    {/* Main Content Area */}
                    <div className="p-8 flex flex-col items-center justify-center space-y-6">
                        
                        {/* Animated Icon Container */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 animate-ping"></div>
                            <AiFillCheckCircle className="relative text-green-500 text-7xl" />
                        </div>

                        <div className="text-center space-y-3">
                            <h2 className="text-xl font-bold text-white">
                                Welcome to the <span className="text-green-500">Pro Bundle</span>
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                Your account is now upgraded. You can start exploring all premium courses right away!
                            </p>
                        </div>

                        {/* Motivational Note */}
                        <div className="w-full bg-green-500/5 border border-green-500/10 p-3 rounded-xl text-[12px] text-green-400 font-medium text-center italic">
                            "The best investment you can make is in yourself."
                        </div>

                        {/* Dashboard Button */}
                        <Link 
                            to="/" 
                            className="w-full"
                        >
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 rounded-xl py-3.5 font-bold text-lg shadow-lg shadow-green-500/20 active:scale-95 transform uppercase tracking-wide">
                                Go to Dashboard
                            </button>
                        </Link>

                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                            Confirmation email sent
                        </p>
                    </div>

                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutSuccess;