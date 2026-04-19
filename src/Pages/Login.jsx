import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import HomeLayout from "../Layouts/HomeLayout";
import { LoginUser } from "../Redux/Slices/AuthSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function onLogin(event) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        const response = await dispatch(LoginUser(loginData));
        if (response?.payload?.success) {
            navigate("/");
            setLoginData({
                email: "",
                password: "",
            });
        }
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto justify-center items-center min-h-[90vh] bg-[#020617] px-4">
                
                {/* Glassmorphic Form Container */}
                <form 
                    noValidate 
                    onSubmit={onLogin} 
                    className="flex flex-col justify-center gap-6 rounded-2xl p-8 text-white w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-yellow-500/30"
                >
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-yellow-500">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-slate-400 font-light">
                            Please enter your credentials to login
                        </p>
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold text-slate-300">Email</label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            className="bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all duration-300 placeholder:text-slate-500"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-semibold text-slate-300">Password</label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            className="bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all duration-300 placeholder:text-slate-500"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-white transition-all duration-300 rounded-xl py-3 font-bold text-lg shadow-lg shadow-yellow-600/20 active:scale-95 transform"
                    >
                        Login
                    </button>

                    {/* Footer Link */}
                    <p className="text-center text-slate-400">
                        Don't have an account? {" "}
                        <Link 
                            to="/signup" 
                            className="text-yellow-500 font-semibold hover:underline transition-all cursor-pointer"
                        >
                            Signup
                        </Link>
                    </p>
                </form>

            </div>
        </HomeLayout>
    );
}

export default Login;