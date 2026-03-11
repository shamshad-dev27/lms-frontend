import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import { useSelector } from "react-redux";

function CourseDescription(){
    const {state}=useLocation();
    const {role,data}=useSelector((state)=>state?.auth);
    console.log(role);
    useEffect(()=>{
    },[]);
    return (
   <HomeLayout>
    <div className="min-h-[90vh] flex flex-col justify-center items-center pt-12 px-20 text-white">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
            <div className="space-y-5">
                <img src={state?.thumbnail?.secure_url} alt="Thumbnail" className="w-full h-64"/>
                <div className="space-y-4">
                   <div className="flex flex-col justify-between items-center text-xl  ">
                       <p className="font-semibold">
                       <span className="text-yellow-500 font-bold">
                        Total lecture : {" "} 
                       </span>
                       {state?.numberOfLecture}
                       </p>
                       <p className="font-semibold">
                       <span className="text-yellow-500 font-bold">
                        Instructor : {" "} 
                       </span>
                       {state?.createdBy}
                       </p>
                </div>
                
                 {role==="ADMIN"||data?.subscription?.status==="ACTIVE"  ?(
                <button className="py-3 px-5 w-full bg-yellow-600 font-bold text-xl rounded-md hover:bg-yellow-500 transition ease-in-out duration-300">
                    Watch lecture
                </button>
            ):(
                <button className="py-3 px-5 w-full bg-yellow-600 font-bold text-xl rounded-md hover:bg-yellow-500 transition ease-in-out duration-300">
                    Subscribe
                </button>
            )}
                </div>

            </div>
           <div className="space-y-2 text-xl ">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                {state?.title}
            </h1>
            <p className="text-yellow-500">
                Course description :
            </p>
            <p >
                {state?.description}
            </p>

           </div>
        </div> 
    </div>
   </HomeLayout>
    );
}

export default CourseDescription;