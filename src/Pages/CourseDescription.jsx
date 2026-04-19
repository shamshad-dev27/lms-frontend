import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout";

function CourseDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();
    
    // Auth state to check access
    const { role, data } = useSelector((state) => state?.auth);

    useEffect(() => {
        // Scroll to top on page load
        window.scrollTo(0, 0);
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-20 px-6 md:px-20 flex flex-col items-center justify-center text-white bg-[#020617]">
                
                {/* Main Content Box */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10 w-full max-w-6xl">
                    
                    {/* Left Column: Media & Actions */}
                    <div className="space-y-6">
                        <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                            <img 
                                src={state?.thumbnail?.secure_url} 
                                alt="Thumbnail" 
                                className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-6">
                            <div className="flex flex-col gap-3 text-lg">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-yellow-500 font-semibold">Total Lectures</span>
                                    <span className="font-bold">{state?.numberOfLecture}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-yellow-500 font-semibold">Instructor</span>
                                    <span className="font-bold italic">{state?.createdBy}</span>
                                </div>
                            </div>
                            
                            {/* Dynamic Button */}
                            {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <button 
                                    onClick={() => navigate("/course/displaylectures", { state: { ...state } })} 
                                    className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-yellow-600/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                                >
                                    Watch Lectures
                                </button>
                            ) : (
                                <button 
                                    onClick={() => navigate("/checkout")} 
                                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                                >
                                    Unlock Course & Subscribe
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Description Text */}
                    <div className="space-y-6 flex flex-col">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500 leading-tight">
                            {state?.title}
                        </h1>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold border-b-2 border-yellow-500 w-fit pb-1">
                                Course Description
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed text-justify italic font-light">
                                "{state?.description}"
                            </p>
                        </div>

                        {/* Feature Tags (Static enhancement for visuals) */}
                        <div className="mt-auto pt-8 flex flex-wrap gap-3">
                            {['Lifetime Access', 'Certificate', 'Expert Support'].map((tag) => (
                                <span key={tag} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-yellow-500 tracking-widest uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;