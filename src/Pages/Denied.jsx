import { useNavigate } from "react-router-dom";

function Denied() {
    const navigate = useNavigate();

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#020617] relative overflow-hidden">
            
            {/* Background Red Glow (Danger Theme) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[130px] rounded-full"></div>

            {/* 403 Large Background Text */}
            <h1 className="text-[12rem] md:text-[15rem] font-black text-white tracking-tighter opacity-5 select-none">
                403
            </h1>

            {/* Access Denied Badge */}
            <div className="bg-red-600 text-white px-4 py-1 text-sm font-bold rounded shadow-lg -rotate-12 absolute top-[42%] md:top-[45%] tracking-widest uppercase">
                Access Denied
            </div>

            {/* Content Section */}
            <div className="z-10 text-center space-y-6 -mt-10">
                <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                    Whoops! <span className="text-red-500">Restricted Area</span>
                </h2>
                <p className="text-slate-400 max-w-sm mx-auto font-light leading-relaxed">
                    You don't have the required permissions to view this resource. 
                    Please contact the administrator if you think this is a mistake.
                </p>

                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="group relative inline-flex items-center justify-center px-10 py-3.5 font-bold text-white transition-all duration-300 bg-transparent border-2 border-red-600 rounded-xl hover:bg-red-600 shadow-lg shadow-red-600/10"
                >
                    <span className="relative flex items-center gap-2 tracking-wide">
                        ← Go Back
                    </span>
                </button>
            </div>

            {/* Dark Vignette Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none"></div>
        </main>
    );
}

export default Denied;