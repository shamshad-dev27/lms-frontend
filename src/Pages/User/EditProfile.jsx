import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updataProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        perviewImage: "",
        fullName: "",
        avatar: undefined,
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    perviewImage: this.result,
                    avatar: uploadedImage,
                });
            });
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!data.fullName || !data.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if (data.fullName.length < 5) {
            toast.error("Name should be at least 5 characters");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);

        // Upload and update
        const responseUpdate = await dispatch(updataProfile(formData));
        
        if (responseUpdate?.payload?.success) {
            await dispatch(getUserData());
            navigate("/user/profile");
        }
    }

    return (
        <HomeLayout>
            <div className="flex flex-col justify-center items-center min-h-[90vh] bg-[#020617] px-4">
                
                {/* Form Card */}
                <form 
                    noValidate 
                    onSubmit={onFormSubmit} 
                    className="my-10 flex flex-col gap-6 rounded-2xl p-8 text-white w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-yellow-500/30"
                >
                    <h1 className="text-center text-3xl font-extrabold text-yellow-500 tracking-tight">
                        Edit Profile
                    </h1>

                    {/* Image Upload Section */}
                    <div className="relative group w-32 h-32 mx-auto">
                        <label htmlFor="image_upload" className="cursor-pointer block">
                            {data.perviewImage ? (
                                <img 
                                    className="w-32 h-32 m-auto rounded-full object-cover border-2 border-yellow-500 group-hover:brightness-50 transition-all duration-300" 
                                    src={data.perviewImage} 
                                    alt="Preview"
                                />
                            ) : (
                                <BsPersonCircle className="w-32 h-32 m-auto text-slate-400 group-hover:text-yellow-500 transition-all duration-300" />
                            )}
                            {/* Overlay icon on hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-bold uppercase">Change</span>
                            </div>
                        </label>
                        <input 
                            onChange={handleImageUpload} 
                            className="hidden" 
                            type="file" 
                            name="avatar" 
                            accept=".jpg, .jpeg, .png, .svg" 
                            id="image_upload" 
                        />
                    </div>

                    {/* Input Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="text-sm font-semibold text-slate-300">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your full name..."
                            className="bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500"
                            onChange={handleUserInput}
                            value={data.fullName}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 pt-2">
                        <button 
                            type="submit" 
                            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white transition-all duration-300 rounded-xl py-3 font-bold text-lg shadow-lg shadow-yellow-600/20 active:scale-95 transform"
                        >
                            Update Profile
                        </button>

                        <Link 
                            to="/user/profile" 
                            className="flex items-center justify-center gap-2 text-slate-400 hover:text-yellow-500 transition-colors text-sm font-medium group"
                        >
                            <AiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Go back to profile
                        </Link>
                    </div>
                </form>
            </div>
        </HomeLayout>
    );
}

export default EditProfile