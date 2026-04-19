import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate("/course/description", { state: { ...data } })}
            className="group relative bg-[#1c1c24] text-white w-[22rem] h-[450px] rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)] border border-white/5 hover:border-yellow-500/50"
        >
            {/* Thumbnail Container */}
            <div className="relative h-52 overflow-hidden">
                {/* Overlay Gradient on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c24] to-transparent z-10 opacity-60"></div>
                
                <img 
                    src={data?.thumbnail?.secure_url}
                    alt="course thumbnail"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 z-20 bg-yellow-500 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    {data?.category}
                </span>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <h2 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300 line-clamp-2 min-h-[56px]">
                    {data?.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {data?.description}
                </p>

                {/* Stats & Info Grid */}
                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-y-3">
                    <div className="flex flex-col">
                        <span className="text-yellow-500 text-[11px] font-semibold uppercase tracking-widest">Lectures</span>
                        <p className="text-sm font-medium">{data?.numberOfLecture}+ Videos</p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-yellow-500 text-[11px] font-semibold uppercase tracking-widest">Instructor</span>
                        <p className="text-sm font-medium truncate">{data?.createdBy}</p>
                    </div>
                </div>

                {/* CTA Indicator (Visible on hover) */}
                <div className="absolute bottom-4 right-6 text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 flex items-center gap-2 text-sm font-bold">
                    View Details <span>→</span>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;