import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourses } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                });
            });
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function formSubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.category || !userInput.description || !userInput.thumbnail || !userInput.createdBy) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(createNewCourses(userInput));
        if (response?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            });
            navigate("/courses");
        }
    }

    return (
        <HomeLayout>
            <div className="flex justify-center items-center min-h-[90vh] bg-[#020617] px-4 py-12">
                
                {/* Form Container */}
                <form 
                    onSubmit={formSubmit} 
                    noValidate 
                    className="flex flex-col justify-center rounded-2xl p-8 gap-6 text-white w-full max-w-[750px] bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl relative transition-all duration-300 hover:border-yellow-500/20"
                >
                    {/* Back Navigation */}
                    <Link to="/" className="absolute top-8 left-8 text-2xl text-yellow-500 hover:text-yellow-400 transition-colors">
                        <AiOutlineArrowLeft />
                    </Link>

                    <header className="text-center space-y-2 mb-4">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            Create New <span className="text-yellow-500">Course</span>
                        </h1>
                        <p className="text-sm text-slate-400">Fill in the details to launch your new masterpiece</p>
                    </header>

                    <main className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Left Column: Image & Title */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="image_uploads" className="cursor-pointer group">
                                    {userInput.previewImage ? (
                                        <div className="relative overflow-hidden rounded-xl border-2 border-yellow-500/50">
                                            <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" src={userInput.previewImage} alt="Thumbnail Preview" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-2 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all group">
                                            <span className="text-slate-400 group-hover:text-yellow-500 font-medium">Upload Course Thumbnail</span>
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">JPG, PNG, SVG</span>
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">1280x720 pixels</span>
                                        </div>
                                    )}
                                </label>
                                <input type="file" id="image_uploads" onChange={handleImageUpload} className="hidden" accept=".jpg, .jpeg, .png, .svg" name="image_uploads" />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="title" className="text-sm font-semibold text-slate-300 tracking-wide">Course Title</label>
                                <input 
                                    type="text"
                                    required
                                    name="title"
                                    id="title"
                                    value={userInput.title}
                                    placeholder="e.g. Full Stack Web Development"
                                    className="bg-slate-800/50 py-2.5 px-4 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500 font-normal"
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>

                        {/* Right Column: Instructor, Category & Description */}
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="createdBy" className="text-sm font-semibold text-slate-300 tracking-wide">Instructor Name</label>
                                <input 
                                    type="text"
                                    required
                                    name="createdBy"
                                    id="createdBy"
                                    value={userInput.createdBy}
                                    placeholder="Enter instructor name..."
                                    className="bg-slate-800/50 py-2.5 px-4 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500 font-normal"
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="category" className="text-sm font-semibold text-slate-300 tracking-wide">Category</label>
                                <input 
                                    type="text"
                                    required
                                    name="category"
                                    id="category"
                                    value={userInput.category}
                                    placeholder="e.g. Web Dev, Marketing, Design"
                                    className="bg-slate-800/50 py-2.5 px-4 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500 font-normal"
                                    onChange={handleUserInput}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="description" className="text-sm font-semibold text-slate-300 tracking-wide">Description</label>
                                <textarea
                                    required
                                    name="description"
                                    id="description"
                                    value={userInput.description}
                                    placeholder="Briefly describe what this course covers..."
                                    className="bg-slate-800/50 py-2.5 px-4 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500 h-24 overflow-y-auto resize-none font-normal"
                                    onChange={handleUserInput}
                                />
                            </div>
                        </div>
                    </main>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full mt-4 bg-yellow-600 hover:bg-yellow-500 text-white transition-all duration-300 py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-yellow-600/20 active:scale-95 transform tracking-wide"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;