import { useEffect } from "react";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash, BsPlusLg } from "react-icons/bs";
import { FaUsers, FaChartLine, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { DeleteCourse, getAllCourse } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecode } from "../../Redux/Slices/RazorpaySlice";
import { getStateData } from "../../Redux/Slices/StatSlice";
import { getUserMessage } from "../../Redux/Slices/ContactSlice";

ChartJs.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux Data with default fallbacks to prevent "undefined" errors
    const { userCount = 0, subscribedCount = 0 } = useSelector((state) => state?.stat || {});
    const { allPayments = { count: 0 }, monthlySaleRecord = [] } = useSelector((state) => state?.razorpay || {});
    const courseData = useSelector((state) => state?.courses?.CourseData || []);
    const { count = 0, message = [] } = useSelector((state) => state?.message || {});

    // Pie Chart Data
    const userData = {
        labels: ["Registered User", "Enrolled User"],
        datasets: [{
            data: [userCount, subscribedCount],
            backgroundColor: ["#EAB308", "#22C55E"],
            borderWidth: 0,
        }]
    };

    // Bar Chart Data - Using empty array fallback
    const saleData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Sales/Month",
            data: monthlySaleRecord?.length > 0 ? monthlySaleRecord : Array(12).fill(0),
            backgroundColor: ["#3b82f6"],
            borderRadius: 8,
        }]
    };

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const res = await dispatch(DeleteCourse(id));
            if (res?.payload?.success) await dispatch(getAllCourse());
        }
    }

    useEffect(() => {
        (async () => {
            await dispatch(getAllCourse());
            await dispatch(getStateData());
            await dispatch(getPaymentRecode());
            await dispatch(getUserMessage());
        })();
    }, [dispatch]);

    return (
        <HomeLayout>
            <div className="min-h-screen pt-16 px-4 md:px-12 lg:px-20 flex flex-col gap-12 text-white bg-[#020617] pb-20 antialiased">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <h1 className="text-4xl md:text-5xl font-black italic">
                        Admin <span className="text-yellow-500 not-italic">Dashboard</span>
                    </h1>
                    <button onClick={() => navigate("/course/create")} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl transition-all active:scale-95">
                        <BsPlusLg /> Create New Course
                    </button>
                </div>

                {/* Charts & Summary Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    {/* User Stats Card */}
                    <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl flex flex-col items-center">
                        <div className="flex items-center gap-3 w-full border-b border-slate-800 pb-4 mb-6 text-yellow-500">
                            <FaUsers size={20} /> <h2 className="text-xl font-bold text-white">User Statistics</h2>
                        </div>
                        <div className="h-72 w-72 mb-10">
                            <Pie data={userData} options={{ plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } } }} />
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-full text-center">
                            <div className="bg-[#1e293b] p-6 rounded-2xl">
                                <p className="text-slate-400 text-sm uppercase">Registered</p>
                                <p className="text-4xl font-black">{userCount}</p>
                            </div>
                            <div className="bg-[#1e293b] p-6 rounded-2xl">
                                <p className="text-slate-400 text-sm uppercase">Subscribed</p>
                                <p className="text-4xl font-black text-green-500">{subscribedCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Revenue Card */}
                    <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-3xl flex flex-col items-center">
                        <div className="flex items-center gap-3 w-full border-b border-slate-800 pb-4 mb-6 text-blue-500">
                            <FaChartLine size={20} /> <h2 className="text-xl font-bold text-white">Revenue Analytics</h2>
                        </div>
                        <div className="h-72 w-full mb-10">
                            <Bar data={saleData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-full text-center">
                            <div className="bg-[#1e293b] p-6 rounded-2xl">
                                <p className="text-slate-400 text-sm uppercase">Orders</p>
                                <p className="text-4xl font-black">{allPayments?.count || 0}</p>
                            </div>
                            <div className="bg-[#1e293b] p-6 rounded-2xl">
                                <p className="text-slate-400 text-sm uppercase">Revenue</p>
                                <p className="text-4xl font-black text-blue-500">₹{(allPayments?.count || 0) * 499}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message Section - Crash Proof */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-slate-800 bg-[#1e293b]/50 flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-green-500"><FaEnvelope /> User Inquiries</h2>
                        <span className="text-slate-400 font-bold">{count || 0} Messages</span>
                    </div>
                    <div className="overflow-x-auto max-h-80">
                        <table className="w-full text-left">
                            <thead className="bg-[#1e293b] text-slate-400 text-xs uppercase tracking-widest sticky top-0">
                                <tr>
                                    <th className="px-8 py-5">Name</th>
                                    <th className="px-8 py-5">Email</th>
                                    <th className="px-8 py-5">Message</th>
                                    <th className="px-8 py-5">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {message && message.length > 0 ? message.map((msg) => (
                                    <tr key={msg?._id} className="border-b border-slate-800 hover:bg-slate-800/20">
                                        <td className="px-8 py-6 font-bold">{msg?.Name || "N/A"}</td>
                                        <td className="px-8 py-6 text-slate-400">{msg?.email}</td>
                                        {/* Message with Overflow Hidden & Ellipsis */}
                                        <td className="px-8 py-6 max-w-[200px] md:max-w-xs">
                                            <p
                                                className="italic text-slate-300 truncate"
                                                title={msg?.Message} // Hover karne par pura message dikhega
                                            >
                                                "{msg?.Message}"
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-slate-500 text-sm">{new Date(msg?.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="py-10 text-center text-slate-500">No messages to display</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Course Inventory Section */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden">
                    <div className="p-8 border-b border-slate-800 bg-[#1e293b]/50"><h2 className="text-2xl font-bold">Course Inventory</h2></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1e293b] text-slate-400 text-xs uppercase tracking-widest">
                                <tr><th className="px-8 py-5">S.No</th><th className="px-8 py-5">Title</th><th className="px-8 py-5 text-center">Instructor</th><th className="px-8 py-5 text-center">Actions</th></tr>
                            </thead>
                            <tbody>
                                {courseData?.map((course, i) => (
                                    <tr key={course?._id} className="border-b border-slate-800 hover:bg-slate-800/20">
                                        <td className="px-8 py-6 text-slate-500">{i + 1}</td>
                                        <td className="px-8 py-6 font-bold">{course?.title}</td>
                                        <td className="px-8 py-6 text-center text-slate-400">{course?.createdBy}</td>
                                        <td className="px-8 py-6 flex justify-center gap-4">
                                            <button onClick={() => navigate("/course/displaylectures", { state: { ...course } })} className="text-green-500 p-2"><BsCollectionPlayFill size={20} /></button>
                                            <button onClick={() => onCourseDelete(course?._id)} className="text-red-500 p-2"><BsTrash size={20} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;