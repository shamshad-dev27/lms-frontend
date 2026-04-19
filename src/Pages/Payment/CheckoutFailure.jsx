import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] bg-[#020617] px-4">
                
                {/* Background Glow */}
                <div className="absolute w-72 h-72 bg-red-600/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                <div className="z-10 w-full max-w-[350px] bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative transition-all duration-300 hover:border-red-500/30">
                    
                    {/* Header Banner */}
                    <div className="bg-red-500 py-6 text-center shadow-lg">
                        <h1 className="text-white text-2xl font-black tracking-tight uppercase">
                            Payment Failed!
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="p-8 flex flex-col items-center justify-center space-y-6">
                        
                        {/* Icon with pulse effect */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                            <RxCrossCircled className="relative text-red-500 text-7xl" />
                        </div>

                        <div className="text-center space-y-3">
                            <h2 className="text-xl font-bold text-white">
                                Oops! Transaction Failed
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                Your payment couldn't be processed. This could be due to a bank error or network issue. 
                                <span className="block mt-2 font-medium text-slate-300">Don't worry, no money was debited.</span>
                            </p>
                        </div>

                        {/* Informational Text */}
                        <div className="w-full bg-red-500/5 border border-red-500/10 p-3 rounded-xl text-[12px] text-red-400 font-medium">
                            Please check your balance or try a different payment method.
                        </div>

                        {/* Try Again Button */}
                        <Link 
                            to="/checkout" 
                            className="w-full"
                        >
                            <button className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 rounded-xl py-3.5 font-bold text-lg shadow-lg shadow-red-500/20 active:scale-95 transform">
                                Try Again
                            </button>
                        </Link>

                        {/* Secondary Link */}
                        <Link to="/" className="text-slate-500 hover:text-white text-sm transition-colors duration-300 font-medium underline underline-offset-4">
                            Go back to Home
                        </Link>
                    </div>

                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutFailure;