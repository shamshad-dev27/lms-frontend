import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";
import DoubtSolver from "../ChartBoart/DoubtSolver";

function DisplayLecture(){
    const {state}=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {lecture}=useSelector((state)=> state?.lecture);
    const {role}=useSelector((state)=> state?.auth);
    const [currentVideo, setCurrentVideo]=useState(0);
      async  function onLectureDelete(courseId,lectureId){
            await dispatch(DeleteCourseLecture({courseId:courseId,lectureId:lectureId}));
           await dispatch(getCourseLecture(state?._id));
        }
     useEffect(()=>{
        if(!state){
            navigate("/");
        }
        dispatch(getCourseLecture(state?._id));
     },[]);
      
   return (
    <HomeLayout>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5 relative">
            <div className="text-center text-2xl font-semibold text-yellow-500">
                Course Name: {state?.title}
            </div>

            {(lecture && lecture.length > 0) ? (
                <div className="flex justify-center gap-10 w-full">
                    {/* Video Player */}
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video
                            key={lecture?.[currentVideo]?.lecture?.secure_url}
                            className="rounded-tl-lg rounded-tr-lg w-full"
                            src={lecture && lecture[currentVideo]?.lecture?.secure_url}
                            controls
                            disablePictureInPicture
                            controlsList="nodownload"
                            muted
                        />
                        <div>
                            <h1>title: <span className="text-yellow-500">{lecture && lecture[currentVideo]?.title}</span></h1>
                            <p>description: <span className="text-yellow-500 line-clamp-4">{lecture && lecture[currentVideo]?.description}</span></p>
                        </div>
                    </div>

                    {/* Lecture List */}
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 overflow-y-auto h-[400px]">
                        <li className="font-semibold text-xl text-yellow-500 flex items-center justify-center gap-4">
                            <p>Lecture list</p>
                            {role === "ADMIN" && (
                                <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="btn btn-primary rounded-md font-semibold text-sm">
                                    Add new lecture
                                </button>
                            )}
                        </li>
                        {lecture && lecture.map((lect, ind) => (
                            <li className="space-y-2" key={lect._id}>
                                <p className="cursor-pointer" onClick={() => {
                                    setCurrentVideo(ind);
                                }}>
                                    <span> Lecture {ind + 1}: </span>
                                    {lect?.title}
                                </p>
                                {role === "ADMIN" && (
                                    <button onClick={() => onLectureDelete(state?._id, lect?._id)} className="btn btn-accent rounded-md font-semibold text-small">
                                        Delete Lecture
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                role === "ADMIN" && (
                    <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="btn btn-primary rounded-md font-semibold text-sm">
                        Add new lecture
                    </button>
                )
            )}

            {/* ✅ DoubtSolver andar hai ab */}
            <div>
                <DoubtSolver courseTitle={state?.title} lectureTitle={lecture && lecture[currentVideo]?.title || 'Course'}  />
            </div>

        </div>
    </HomeLayout>
);

}

export default DisplayLecture;