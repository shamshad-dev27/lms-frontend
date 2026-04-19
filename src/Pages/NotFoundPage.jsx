import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#020617] relative overflow-hidden">
            
            {/* Background Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full"></div>

            {/* 404 Text */}
            <h1 className="text-[12rem] md:text-[15rem] font-black text-white tracking-tighter opacity-10 select-none">
                404
            </h1>

            {/* Floating Label */}
            <div className="bg-yellow-500 text-black px-4 py-1 text-sm font-bold rounded shadow-lg rotate-12 absolute top-[42%] md:top-[45%]">
                Page not found...
            </div>

            {/* Content Section */}
            <div className="z-10 text-center space-y-6 -mt-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Lost in Space?
                </h2>
                <p className="text-slate-400 max-w-sm mx-auto font-light">
                    The page you are looking for doesn't exist or has been moved to another universe.
                </p>

                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-transparent border-2 border-yellow-500 rounded-xl hover:bg-yellow-500 hover:text-black mt-4"
                >
                    <span className="absolute inset-0 w-full h-full rounded-xl bg-yellow-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity"></span>
                    <span className="relative flex items-center gap-2">
                        ← Go Back
                    </span>
                </button>
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
    );
}

export default NotFoundPage;