import { useNavigate } from "react-router-dom";
import AboutImage from '../Assets/Image/AboutImage.png';
import Carouselslide from "../Components/Carouselslide";
import { celebrities } from "../CelebrityData/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";
import { FiArrowRight, FiAward, FiUsers, FiBookOpen, FiStar } from "react-icons/fi";

function AboutUs() {
    const navigate = useNavigate();

    const stats = [
        { label: "Active Students", value: "50K+", icon: <FiUsers className="text-yellow-500" /> },
        { label: "Expert Mentors", value: "500+", icon: <FiStar className="text-yellow-500" /> },
        { label: "Courses Published", value: "1.2K+", icon: <FiBookOpen className="text-yellow-500" /> },
        { label: "Success Stories", value: "10K+", icon: <FiAward className="text-yellow-500" /> }
    ];

    return (
        <HomeLayout>

            <div className="flex flex-col text-white px-6 md:px-16 lg:px-24 py-10 min-h-screen bg-[#020617] selection:bg-yellow-500/30 antialiased font-inter overflow-hidden">

                {/* 1. Hero Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-20 md:py-28">

                    {/* Left: Text Content */}
                    <section className="lg:w-[60%] space-y-10">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-300 text-xs font-semibold tracking-wider uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            Elevating Minds Globally
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-white">
                            Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 italic font-serif">Education</span> <br />
                            simplified for <span className="underline decoration-blue-500/50 decoration-4 underline-offset-[12px]">everyone</span>.
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl">
                            We bridge the gap between world-class educators and curious minds.
                            Our platform is a global ecosystem designed for creators and lifelong learners to thrive.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <button
                                onClick={() => navigate("/courses")}
                                className="group flex items-center gap-3 px-8 py-4 bg-yellow-500 text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(234,179,8,0.5)] active:scale-95">
                                Explore Courses
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform stroke-[3px]" />
                            </button>
                            <button
                                onClick={() => navigate("/ourstory")}
                                className="px-8 py-4 border border-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 backdrop-blur-sm">
                                Our Story
                            </button>
                        </div>
                    </section>

                    {/* Right: Image Section */}
                    {/* Right: Image Section */}
                    <div className="lg:w-[45%] relative group flex justify-center items-center">

                        {/* Dynamic Background Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-500/20 to-blue-600/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-60 transition duration-1000"></div>

                        {/* Floating Image */}
                        <img
                            className="relative z-10 w-full max-w-[450px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)] animate-float-slow"
                            alt="Education Illustration"
                            src={AboutImage}
                        />

                        {/* Optional: Subtle Glass Overlay for depth */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-3xl opacity-0 group-hover:opacity-10 transition duration-700 pointer-events-none"></div>
                    </div>
                </div>

                {/* 2. Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 py-10 my-16">
                    {stats.map((stat, i) => (
                        <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 hover:border-yellow-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/5">
                            <div className="mb-4 text-3xl opacity-80 group-hover:scale-110 group-hover:text-yellow-400 transition-all duration-300">
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-1 tracking-tight">{stat.value}</h3>
                            <p className="text-slate-500 text-sm font-semibold tracking-widest uppercase">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* 3. Carousel Section */}
                <div className="mt-20 mb-32">
                    <div className="text-center space-y-6 mb-20">
                        <span className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm">Testimonials</span>
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                            Voices of <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">Excellence</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
                            Insights from visionaries who have transformed industries and shaped the future of learning.
                        </p>
                    </div>

                    <div className="relative w-full max-w-6xl mx-auto px-4">
                        <div className="carousel w-full bg-[#0f172a]/50 border border-slate-800/50 p-6 md:p-12 rounded-[3rem] shadow-3xl backdrop-blur-xl">
                            {celebrities && celebrities.map((cele) => (
                                <Carouselslide
                                    key={cele.SliceNumber}
                                    titel={cele.titel}
                                    quart={cele.description}
                                    image={cele.image}
                                    slideNumber={cele.SliceNumber}
                                    totalSlide={celebrities.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AboutUs;