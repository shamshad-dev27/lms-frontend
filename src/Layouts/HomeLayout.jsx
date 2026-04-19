import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';
import { logout } from '../Redux/Slices/AuthSlice';

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selectors for auth state
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = '0';
    }

    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res?.payload?.success) navigate("/");
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
            {/* Sidebar / Drawer */}
            <div className="drawer absolute left-0 z-50 w-fit">
                <input type="checkbox" id="my-drawer" className="drawer-toggle" />
                
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-yellow-500 m-6 hover:scale-110 transition-transform duration-300"
                        />
                    </label>
                </div>

                <div className="drawer-side w-0 transition-all duration-300 ease-in-out">
                    <label htmlFor="my-drawer" className="drawer-overlay bg-black/60 backdrop-blur-sm"></label>
                    
                    <ul className="menu p-6 w-72 md:w-80 h-full bg-[#0f172a] border-r border-white/10 text-white relative space-y-2 shadow-2xl">
                        {/* Close Button */}
                        <li className="w-fit absolute right-4 top-4 z-50">
                            <button 
                                onClick={hideDrawer}
                                className="hover:text-red-500 transition-colors p-1"
                            >
                                <AiFillCloseCircle size={28} />
                            </button>
                        </li>

                        {/* Navigation Links */}
                        <li className="pt-10">
                            <Link to="/" onClick={hideDrawer} className="text-lg font-medium hover:text-yellow-500 py-3">Home</Link>
                        </li>

                        {isLoggedIn && role === "ADMIN" && (
                            <>
                                <li>
                                    <Link to="/admin/dashboard" onClick={hideDrawer} className="text-lg font-medium hover:text-yellow-500 py-3 italic">Admin Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/course/create" onClick={hideDrawer} className="text-lg font-medium hover:text-yellow-500 py-3 italic">Create Course</Link>
                                </li>
                            </>
                        )}

                        <li><Link to="/courses" onClick={hideDrawer} className="text-lg font-medium hover:text-yellow-500 py-3">All Courses</Link></li>
                        <li><Link to="/contact" onClick={hideDrawer} className="text-lg font-medium hover:text-yellow-500 py-3">Contact Us</Link></li>
                        <li><Link to="/about" onClick={hideDrawer} className="text-lg font-medium hover:text-yellow-500 py-3">About Us</Link></li>

                        {/* Bottom Authentication Buttons */}
                        <li className='absolute bottom-8 w-[85%] left-1/2 -translate-x-1/2'>
                            <div className='w-full flex flex-col sm:flex-row items-center justify-center gap-4'>
                                {!isLoggedIn ? (
                                    <>
                                        <Link to="/login" onClick={hideDrawer} className="w-full">
                                            <button className='w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/10'>
                                                Login
                                            </button>
                                        </Link>
                                        <Link to="/signup" onClick={hideDrawer} className="w-full">
                                            <button className='w-full border border-slate-600 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all'>
                                                Signup
                                            </button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/user/profile" onClick={hideDrawer} className="w-full">
                                            <button className='w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/10'>
                                                Profile
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className='w-full border border-red-500/30 hover:bg-red-600/10 text-red-500 font-bold py-3 rounded-xl transition-all'
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Content Injection */}
            <main className="min-h-[90vh]">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default HomeLayout;