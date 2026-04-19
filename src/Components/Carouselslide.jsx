function Carouselslide({ image, slideNumber, totalSlide, titel, quart }) {
    
    // Slide logic to handle prev/next correctly
    const prevSlide = slideNumber === 1 ? totalSlide : slideNumber - 1;
    const nextSlide = slideNumber === totalSlide ? 1 : slideNumber + 1;

    return (
        <div id={`slide${slideNumber}`} className="carousel-item relative w-full flex flex-col items-center">
            
            {/* Main Content Container */}
            <div className="relative w-full max-w-2xl mx-auto pt-16 pb-10 px-4">
                
                {/* Profile Image - Positioned to overlap the card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                    <div className="p-1 rounded-full bg-gradient-to-b from-yellow-400 to-transparent shadow-2xl">
                        <img
                            src={image}
                            alt={titel}
                            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#0f172a]"
                        />
                    </div>
                </div>

                {/* Testimonial Card */}
                <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8 md:p-12 text-center flex flex-col items-center gap-4 group hover:border-yellow-500/20 transition-all duration-500">
                    
                    {/* Decorative Quote Mark */}
                    <span className="text-6xl text-yellow-500/20 font-serif absolute top-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity">“</span>

                    <div className="space-y-2 mt-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            {titel}
                        </h2>
                        <div className="flex justify-center gap-1 text-yellow-500 text-sm">
                            <span className="bg-yellow-500/10 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-yellow-500 mb-2">Verified Expert</span>
                        </div>
                    </div>

                    <p className="text-slate-400 text-lg md:text-xl italic leading-relaxed font-light">
                        "{quart}"
                    </p>

                    <div className="flex gap-1 text-yellow-500 pt-2">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows - Using modern styling */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-2 md:-px-10">
                    <a 
                        href={`#slide${prevSlide}`} 
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 shadow-xl"
                    >
                        ❮
                    </a>
                    <a 
                        href={`#slide${nextSlide}`} 
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 shadow-xl"
                    >
                        ❯
                    </a>
                </div>
            </div>

            {/* Slide Indicator (Optional) */}
            <div className="text-slate-600 text-xs font-mono mt-4">
                {slideNumber.toString().padStart(2, '0')} / {totalSlide.toString().padStart(2, '0')}
            </div>
        </div>
    );
}

export default Carouselslide;