import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function UserProfile() {
    const userData = useSelector((state) => state?.auth?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubscribtion() {
        toast.loading("Cancelling subscription...");
        const res = await dispatch(cancelCourseBundle());
        
        if (res?.payload?.success) {
            await dispatch(getUserData());
            toast.success("Subscription cancelled successfully");
            navigate("/");
        } else {
            toast.error("Something went wrong");
        }
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col justify-center items-center bg-[#020617] px-4">
                
                {/* Profile Card Container */}
                <div className="my-10 flex flex-col gap-6 rounded-2xl p-8 text-white w-full max-w-md bg-slate-900/50 backdrop-blur-lg border border-white/10 shadow-2xl relative overflow-hidden">
                    
                    {/* Top Decorative bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-500 to-orange-500"></div>

                    {/* Avatar Section */}
                    <div className="relative mx-auto">
                        <img 
                            src={userData?.avatar?.secure_url} 
                            alt="user image" 
                            className="w-32 h-32 m-auto border-4 border-yellow-500 p-1 rounded-full shadow-lg object-cover"
                        />
                        <span className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                    </div>

                    {/* Name & Role */}
                    <div className="text-center space-y-1">
                        <h1 className="text-2xl font-bold capitalize tracking-wide">
                            {userData?.fullName}
                        </h1>
                        <p className="text-yellow-500 font-medium text-sm tracking-widest uppercase">
                            {userData?.role}
                        </p>
                    </div>

                    {/* Information Grid */}
                    <div className="space-y-4 py-4 border-y border-white/5">
                        <div className="flex justify-between items-center text-sm md:text-base">
                            <span className="text-slate-400">Email:</span>
                            <span className="font-medium truncate max-w-[200px]">{userData?.email}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm md:text-base">
                            <span className="text-slate-400">Subscription:</span>
                            <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${userData?.subscription?.status === "active" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                                {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link 
                            to="/changepassword"
                            className="w-full sm:w-1/2"
                        >
                            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white transition-all duration-300 rounded-xl py-3 font-semibold text-sm border border-white/10">
                                Change Password
                            </button>
                        </Link>
                        
                        <Link 
                            to="/user/editProfile"
                            className="w-full sm:w-1/2"
                        >
                            <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-white transition-all duration-300 rounded-xl py-3 font-semibold text-sm shadow-lg shadow-yellow-600/10">
                                Edit Profile
                            </button>
                        </Link>
                    </div>

                    {/* Cancel Subscription Button */}
                    {userData?.subscription?.status === "active" && (
                        <button
                            onClick={handleSubscribtion}
                            className="w-full mt-2 bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all duration-300 font-bold py-3 rounded-xl text-sm uppercase tracking-tighter"
                        >
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default UserProfile;