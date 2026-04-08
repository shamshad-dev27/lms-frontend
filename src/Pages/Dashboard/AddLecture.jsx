import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { AddCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture(){
    const courseDetail=useLocation().state;
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [inputData,setInputData]=useState({
        id:courseDetail._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""

    })
   function handleInputChange(e){
      const {name,value}=e.target;
      setInputData({
        ...inputData,
        [name]:value
      })
   }



   function handleVideo(e){
    const video=e.target.files[0];
    const source=window.URL.createObjectURL(video);
    setInputData({
        ...inputData,
        lecture:video,
        videoSrc:source,
    })
}
   async function onFromsubmit(e){
        e.preventDefault();
        if(!inputData.lecture||!inputData.title||!inputData.description){
            toast.error("All fields is mandatory");
            return;
        }
        const response= await dispatch( AddCourseLecture(inputData));
        if(response?.payload?.success){
                setInputData(
                    {
                     id:courseDetail._id,
                      lecture:undefined,
                      title:"",
                      description:"",
                     videoSrc:""
                    }
                )
          navigate(-1);
        } 
    }
     useEffect(()=>{
        if(!courseDetail){
            navigate("/courses")
        }
     },[])
   
    return (
        <HomeLayout>
        <div className="min-h-[90vh] flex flex-col justify-center items-center text-white gap-10 mx-16">
            <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                <header className="flex justify-center items-center  relative">
                    <button className="absolute left-2 text-xl text-green-500" onClick={()=> navigate(-1)}>
                        <AiOutlineArrowLeft/>
                    </button>
                    <h1 className="text-xl text-yellow-500 font-semibold">
                        Add new lecture
                    </h1>
                </header>
                <form onSubmit={onFromsubmit} className="flex flex-col gap-3">
                     <input type="text" name="title" placeholder="enter the lecture title...."
                     onChange={handleInputChange}
                     className="bg-transparent px-3 py-1 border"
                     value={inputData.title}
                     />
                     <textarea name="description" placeholder="enter the lecture description...."
                     onChange={handleInputChange}
                     className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-24"
                     value={inputData.description}
                     />
                     {inputData.videoSrc?(
                        <video  muted src={inputData.videoSrc}
                        controls
                        controlsList="nodownload nofullscreen"
                        disablePictureInPicture
                        className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                        >

                        </video>
                     ):(
                        <div className="h-48 border  flex items-center justify-center cursor-pointer">
                            <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">Choose your video</label>
                            <input type="file" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4 video/x-mp4 video/*"  className="hidden"/>
                        </div>
                     )}
                     <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                        Add new Lecture
                     </button>
                </form>
            </div>

        </div>
        </HomeLayout>
    );
}

export default AddLecture;