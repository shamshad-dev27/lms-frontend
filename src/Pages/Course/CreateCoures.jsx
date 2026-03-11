import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {Link}  from "react-router-dom"

function CreateCourse(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [userInput , setUserInput]=useState({
        title:"",
        category:"",
         createdBy:"",
        description:"",
        thumbnail:null,
        previewImage:""
    });

    function handleImageUpload(e){
        e.preventDefault();
        const uploadeImage=e.target.files[0];
        if(uploadeImage){
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadeImage);
            fileReader.addEventListener("load",function(){
                setUserInput({
                    ...userInput,
                    previewImage:this.result,
                    thumbnail:uploadeImage
                })
            })
        }
    }
    function handleUserInput(e){
        const{name ,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value,
        })
    }
   async function formSubmit(e){
        e.preventDefault();
        if(!userInput.title||!userInput.category||!userInput.description||!userInput.thumbnail||!userInput.createdBy){
            toast.error("All fields are mandatory");
            return;
        }
        const response= await dispatch(createNewCourses(userInput));
        if(response?.payload?.success){
            setUserInput({
                  title:"",
                   category:"",
                   createdBy:"",
                   description:"",
                   thumbnail:null,
                    previewImage:""
            })
            navigate("/courses")
        }
    }
    return ( 
       <HomeLayout>
       
          <div className="flex justify-center items-center h-[90vh]">
              <form onSubmit={formSubmit} noValidate className="flex flex-col justify-center rounded-lg p-4 gap-5 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">
                <Link  to="/" className="absolute top-5 text-2xl link text-accent cursor-pointer">
                <AiOutlineArrowLeft/>
                </Link>
                <h1 className="text-center font-bold text-2xl">
                    Create New Course
                </h1>
                <main className="grid grid-cols-2 gap-x-10">
                     <div className="gap-y-6">
                       <div>
                        <label htmlFor="image_uploads">
                            {userInput.previewImage?( <img className="w-full h-44 m-auto border" src={userInput.previewImage} /> ):(
                                <div className="w-full h-44 m-auto border flex items-center justify-center">
                                    <h1>
                                        Upload your course thumbnail
                                    </h1>
                                </div>
                             )}
                        </label>
                        <input type="file" id="image_uploads" onChange={handleImageUpload} className="hidden" accept=".jpg, .jpeg, .png, .svg" name="image_uploads"/>
                       </div>
                       <div className="flex flex-col gap-1">
                          <label htmlFor="title" className="text-lg font-semibold">
                            Course title:
                          </label>
                          <input 
                          type="text"
                           required
                            name="title"
                            id="title"
                            value={userInput.title}
                             placeholder="Enter the title..."
                            className="bg-transparent py-1 px-2 border"
                            onChange={handleUserInput}
                          />
                       </div>
                     </div>
                     <div className="flex flex-col gap-1">
                           <div className="flex flex-col gap-1">
                          <label htmlFor="createdBy" className="text-lg font-semibold">
                            Created By :
                          </label>
                          <input 
                          type="text"
                           required
                            name="createdBy"
                            id="createdBy"
                            value={userInput.createdBy}
                             placeholder="Enter the createdBy..."
                            className="bg-transparent py-1 px-2 border"
                            onChange={handleUserInput}
                          />
                       </div>
                       <div className="flex flex-col gap-1">
                          <label htmlFor="category" className="text-lg font-semibold">
                            Course Category :
                          </label>
                          <input 
                          type="text"
                           required
                            name="category"
                            id="category"
                            value={userInput.category}
                            placeholder="Enter the category..."
                            className="bg-transparent py-1 px-2 border"
                            onChange={handleUserInput}
                          />
                       </div>
                       <div className="flex flex-col gap-1">
                          <label htmlFor="description" className="text-lg font-semibold">
                            Course description :
                          </label>
                          <textarea
                           required
                            name="description"
                            id="description"
                            value={userInput.description}
                            placeholder="Enter the description..."
                            className="bg-transparent py-1 px-2 border h-24 overflow-y-scroll resize-none"
                            onChange={handleUserInput}
                          />
                       </div>
                     </div>
                </main>
                <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition ease-in-out duration-300 py-2 rounded-xl font-semibold text-lg">
                    Create course
                </button>
           </form>
          </div>
       </HomeLayout>
    );
}
export default CreateCourse