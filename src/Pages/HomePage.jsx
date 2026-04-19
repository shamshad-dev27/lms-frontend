import { Link } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';
import homePageImage from '../Assets/Image/homeImage.webp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStateData } from '../Redux/Slices/StatSlice';

function HomePage() {
    const dispatch=useDispatch();
    const {userCount}=useSelector((state)=> state?.stat||0);
   useEffect(() => {
    const fetchData = async () => {
        await dispatch(getStateData());
    };
    fetchData();
}, []);
    return (
        <HomeLayout>
            {/* Main Hero Section */}
            <div className="min-h-[90vh] text-white flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-8 md:px-16 lg:px-24 bg-[#020617] overflow-hidden relative">
                
                {/* Decorative Background Glows */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>

                {/* Left Content Section */}
                <div className="w-full lg:w-1/2 space-y-8 z-10 text-center lg:text-left">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                            Find out best <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 italic">
                                Online Courses
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                            We have a vast library of courses taught by 
                            <span className="text-white font-medium"> highly skilled </span> 
                            faculties at a very affordable cost. Start your learning journey today!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                        <Link to="/courses" className="w-full sm:w-auto">
                            <button className="w-full bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)] transition-all duration-300 transform hover:-translate-y-1">
                                Explore Courses
                            </button>
                        </Link>
                        
                        <Link to="/contact" className="w-full sm:w-auto">
                            <button className="w-full border border-slate-700 bg-slate-900/40 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>

                    {/* Social/Trust Indicator (Optional Enhancement) */}
                    <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-slate-500 text-sm italic">
                        <span className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                            ))}
                        </span>
                        Joined by {userCount}+ students
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center relative group">
                    {/* Animated background ring */}
                    <div className="absolute w-[80%] h-[80%] border-2 border-yellow-500/20 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-yellow-500/40 transition-colors"></div>
                    
                    <img 
                        src={homePageImage} 
                        alt="homepage image" 
                        className="relative z-10 w-[85%] lg:w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float filter brightness-110 contrast-105"
                    />
                </div>
            </div>
        </HomeLayout>
    );
}

export default HomePage;