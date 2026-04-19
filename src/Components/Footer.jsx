import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative left-0 bottom-0 min-h-[12vh] py-8 flex flex-col sm:flex-row items-center justify-between text-white bg-[#020617] border-t border-white/5 px-10 sm:px-24 gap-6">
            
            {/* Copyright Section */}
            <section className="text-sm md:text-md font-light text-slate-400 tracking-wide text-center sm:text-left">
                Copyright © {year} | <span className="text-white font-semibold">Coursify Inc.</span>
                <p className="text-xs mt-1 text-slate-500 italic">Empowering learners worldwide.</p>
            </section>

            {/* Modern Icon Section */}
            <section className="flex items-center justify-center gap-4">
                {[
                    { icon: <BsFacebook />, link: "#", color: "hover:text-blue-500 hover:shadow-blue-500/20" },
                    { icon: <BsInstagram />, link: "#", color: "hover:text-pink-500 hover:shadow-pink-500/20" },
                    { icon: <BsLinkedin />, link: "#", color: "hover:text-blue-400 hover:shadow-blue-400/20" },
                    { icon: <BsTwitter />, link: "#", color: "hover:text-sky-400 hover:shadow-sky-400/20" }
                ].map((social, index) => (
                    <a 
                        key={index}
                        href={social.link} 
                        className={`
                            h-11 w-11 flex items-center justify-center rounded-xl 
                            bg-slate-800/40 border border-white/10 
                            transition-all duration-300 group
                            hover:-translate-y-2 hover:bg-slate-800 hover:border-white/20
                            shadow-lg ${social.color}
                        `}
                    >
                        <span className="text-xl text-slate-400 group-hover:text-inherit transition-colors duration-300">
                            {social.icon}
                        </span>
                    </a>
                ))}
            </section>

        </footer>
    );
}

export default Footer;