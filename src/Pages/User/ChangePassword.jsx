import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HomeLayout from "../../Layouts/HomeLayout";
import { changepassword } from "../../Redux/Slices/AuthSlice";
import { isPassword } from "../../Helper/RegexMatcher";

function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        oldPassword: '',
        newPassword: ''
    });


    function inputHandle(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    async function UserHandler(e) {
        e.preventDefault();

        if (!userData.newPassword || !userData.oldPassword) {
            toast.error("All fields are required");
            return;
        }

        if (!isPassword(userData.newPassword)) {
            toast.error("Password must be 8+ chars with capital, small, number & special char");
            return;
        }

        if (userData.newPassword === userData.oldPassword) {
            toast.error("New password cannot be same as old password");
            return;
        }

        const res = await dispatch(changepassword(userData));

        if (res?.payload?.success) {
            setUserData({ oldPassword: '', newPassword: '' });
            navigate("/user/profile");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh] bg-[#020617]">
                <form
                    onSubmit={UserHandler}
                    noValidate // Standard HTML validation bypass to use Custom Toast
                    className="flex flex-col justify-center gap-5 rounded-3xl p-8 text-white w-96 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-slate-900/50 border border-slate-800 backdrop-blur-md"
                >
                    {/* Back Link */}
                    <Link to="/user/profile" className="text-yellow-500 hover:text-yellow-400 transition-all text-2xl w-fit">
                        <AiOutlineArrowLeft />
                    </Link>

                    {/* Header Section */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-yellow-500/10 p-4 rounded-full">
                            <RiLockPasswordLine className="text-yellow-500 text-4xl" />
                        </div>
                        <h1 className="text-center text-3xl font-black italic">
                            Change <span className="text-yellow-500 not-italic">Password</span>
                        </h1>
                    </div>

                    {/* Old Password Input */}
                    <div className="flex flex-col gap-1 mt-4">
                        <label className="font-semibold text-slate-400 text-sm">Old Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="Enter old password"
                            className="bg-slate-800/50 border border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-500 transition-all placeholder:text-slate-600"
                            onChange={inputHandle}
                            value={userData.oldPassword}
                        />
                    </div>

                    {/* New Password Input */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-slate-400 text-sm">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password"
                            className="bg-slate-800/50 border border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-500 transition-all placeholder:text-slate-600"
                            onChange={inputHandle}
                            value={userData.newPassword}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl mt-4 transition-all duration-300 transform active:scale-95 shadow-lg shadow-yellow-500/10"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;