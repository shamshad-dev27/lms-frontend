import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";

import HomeLayout from "../../Layouts/HomeLayout";
import { AddCourseLecture } from "../../Redux/Slices/LectureSlice";

function AddLecture() {
    const courseDetail = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        id: courseDetail?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        if (video) {
            const source = window.URL.createObjectURL(video);
            setInputData({
                ...inputData,
                lecture: video,
                videoSrc: source,
            });
        }
    }

    async function onFromsubmit(e) {
        e.preventDefault();
        if (!inputData.lecture || !inputData.title || !inputData.description) {
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(AddCourseLecture(inputData));
        if (response?.payload?.success) {
            navigate(-1);
            setInputData({
                id: courseDetail._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            });
        }
    }

    useEffect(() => {
        if (!courseDetail) {
            navigate("/courses");
        }
    }, [courseDetail, navigate]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col justify-center items-center bg-[#020617] px-4 py-10">
                
                {/* Form Card */}
                <div className="flex flex-col gap-6 p-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden">
                    
                    {/* Header */}
                    <header className="flex justify-center items-center relative">
                        <button 
                            className="absolute left-0 text-2xl text-yellow-500 hover:text-yellow-400 transition-colors" 
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-2xl text-white font-bold tracking-tight">
                            Add New <span className="text-yellow-500">Lecture</span>
                        </h1>
                    </header>

                    <form onSubmit={onFromsubmit} className="flex flex-col gap-5">
                        
                        {/* Title Input */}
                        <div className="flex flex-col gap-1.5 text-sm font-semibold text-slate-300">
                            <label htmlFor="title">Lecture Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                id="title"
                                placeholder="E.g. Introduction to React"
                                onChange={handleInputChange}
                                className="bg-slate-800/50 px-4 py-2.5 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500 font-normal"
                                value={inputData.title}
                            />
                        </div>

                        {/* Description Input */}
                        <div className="flex flex-col gap-1.5 text-sm font-semibold text-slate-300">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                name="description" 
                                id="description"
                                placeholder="What will students learn in this video?"
                                onChange={handleInputChange}
                                className="bg-slate-800/50 px-4 py-2.5 rounded-lg border border-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-500 resize-none h-24 overflow-y-auto font-normal"
                                value={inputData.description}
                            />
                        </div>

                        {/* Video Upload Section */}
                        <div className="space-y-1.5">
                            <p className="text-sm font-semibold text-slate-300">Lecture Video</p>
                            {inputData.videoSrc ? (
                                <div className="relative group">
                                    <video 
                                        muted 
                                        src={inputData.videoSrc}
                                        controls
                                        controlsList="nodownload"
                                        className="rounded-xl w-full aspect-video object-cover border border-yellow-500/30"
                                    />
                                    <button 
                                        onClick={() => setInputData({...inputData, videoSrc: "", lecture: undefined})}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <label 
                                    htmlFor="lecture" 
                                    className="h-44 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all group"
                                >
                                    <div className="bg-slate-800 p-3 rounded-full group-hover:bg-yellow-500 group-hover:text-black transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-slate-400 group-hover:text-slate-200 font-medium">Click to upload video</span>
                                    <input type="file" id="lecture" name="lecture" onChange={handleVideo} accept="video/*" className="hidden" />
                                </label>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="mt-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-yellow-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            Publish Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AddLecture;