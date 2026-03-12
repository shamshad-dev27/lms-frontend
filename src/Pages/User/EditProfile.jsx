import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updataProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile(){
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const [data , setData]=useState({
    perviewImage:"",
    fullName:"",
    avatar:undefined,
    // userId:useSelector((state)=>state?.auth?.data?._id)
   });
     function handleUserInput(e){
        const {name, value}=e.target;
        setData({
            ...data,
            [name]:value
        })
     }
   function handleImageUpload(e){
     e.preventDefault();
     const uploadeImage=e.target.files[0];
     if(uploadeImage){
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadeImage);
        fileReader.addEventListener("load",function(){
            setData({
                ...data,
                perviewImage:this.result,
                avatar:uploadeImage,
            })
        })
     }
   }
  async function onFormSubmit(e){
      e.preventDefault();
      if(!data.fullName||!data.avatar){
        toast.error("All fields are mandatory");
        return;
      }
      if(data.fullName<5){
        toast.error("Name cannot be less than 5  character");
        return;
      }
      const formData=new FormData();
     formData.append("fullName", data.fullName);
     formData.append("avatar", data.avatar);
      await dispatch( updataProfile(formData));
     const response= await dispatch(getUserData())
     console.log(response);
        navigate("/user/profile");
   }
   return(
      <HomeLayout>
           <div className="flex flex-col justify-center items-center h-[90vh]">
              <form  noValidate onSubmit={onFormSubmit} className="my-10 flex flex-col  gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
                <h1 className="text-center text-2xl font-bold">Update your profile</h1>
                
                        <label htmlFor="image_upload" className="cursor-pointer w-25 m-auto">
                            {data.perviewImage?<img className="w-24 h-24 m-auto rounded-full" src={data.perviewImage} />:<BsPersonCircle className="w-24 h-24 m-auto rounded-full"/>}
                        </label>
                        <input  onChange={handleImageUpload} className="hidden" type="file" name="avatar" accept=".jpg, .jpeg, .png, .svg" id="image_upload"  />
                        
                     <div className="flex flex-col gap-1">
                          <label htmlFor="fullName" className="semibold">Name</label>
                          <input 
                          type="text" 
                          required
                          name="fullName"
                          id="fullName"
                          placeholder="Enter your FullName...."
                          className="bg-transparent px-2 py-1 border"
                          onChange={handleUserInput}
                           value={data.name}
                          />
                          </div>

                          <button type="submit" className=" mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm p-2 font-semibold text-lg cursor-pointer">
                           Create account
                           </button>
                           <h1 className="text-center">
           <Link to="/user/profile" >
           <h1 className="link text-accent cursor-pointer flex justify-center items-center w-full">
             <AiOutlineArrowLeft/>Go back to profile
           </h1>
            </Link>
        </h1>

              </form>
           </div>
      </HomeLayout>
   );
}

export default EditProfile;