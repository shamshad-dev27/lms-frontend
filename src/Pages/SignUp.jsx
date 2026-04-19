import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isPassword } from "../Helper/RegexMatcher";

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    function getImage(event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(fileReader.result);
            });
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();
        if (!signupData.email || !signupData.fullName || !signupData.password || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast 5 characters");
            return;
        }
        if (!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }
        if (!isPassword(signupData.password)) {
            toast.error("Password must be 8+ chars with capital, small, number & special char");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        const response = await dispatch(createAccount(formData));
        if (response?.payload?.success) {
            navigate("/");
            setSignupData({
                fullName: "",
                email: "",
                password: "",
                avatar: "",
            });
            setPreviewImage("");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] bg-[#020617] px-4 py-12">
                
                <form 
                    noValidate 
                    onSubmit={createNewAccount} 
                    className="flex flex-col justify-center gap-5 rounded-2xl p-8 text-white w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-yellow-500/30"
                >
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-extrabold text-yellow-500 tracking-tight">Create Account</h1>
                        <p className="text-sm text-slate-400">Join our community of learners</p>
                    </div>

                    {/* Avatar Upload Section */}
                    <div className="relative w-28 h-28 mx-auto group">
                        <label htmlFor="image_upload" className="cursor-pointer">
                            {previewImage ? (
                                <img 
                                    className="w-28 h-28 rounded-full m-auto object-cover border-2 border-yellow-500 group-hover:brightness-75 transition-all" 
                                    src={previewImage} 
                                    alt="Preview"
                                />
                            ) : (
                                <BsPersonCircle className="w-28 h-28 m-auto text-slate-400 group-hover:text-yellow-500 transition-all" />
                            )}
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] bg-black/60 px-2 py-1 rounded text-white">Upload</span>
                            </div>
                        </label>
                        <input onChange={getImage} className="hidden" type="file" name="avatar" accept=".jpg, .jpeg, .png, .svg" id="image_upload" />
                    </div>

                    <div className="space-y-4">
                        {/* Name Input */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="fullName" className="text-sm font-semibold text-slate-300">Full Name</label>
                            <input 
                                type="text" 
                                required
                                name="fullName"
                                id="fullName"
                                placeholder="Enter your full name..."
                                className="bg-slate-800/50 px-4 py-2.5 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500"
                                onChange={handleUserInput}
                                value={signupData.fullName}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-semibold text-slate-300">Email</label>
                            <input 
                                type="email" 
                                required
                                name="email"
                                id="email"
                                placeholder="Enter your email..."
                                className="bg-slate-800/50 px-4 py-2.5 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500"
                                onChange={handleUserInput}
                                value={signupData.email}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-semibold text-slate-300">Password</label>
                            <input 
                                type="password" 
                                required
                                name="password"
                                id="password"
                                placeholder="Enter your password..."
                                className="bg-slate-800/50 px-4 py-2.5 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500"
                                onChange={handleUserInput}
                                value={signupData.password}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-white transition-all duration-300 rounded-xl py-3 font-bold text-lg shadow-lg shadow-yellow-600/20 active:scale-95 transform"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-slate-400 text-sm">
                        Already have an account? {" "}
                        <Link to="/login" className="text-yellow-500 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default SignUp;