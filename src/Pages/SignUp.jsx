import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast} from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";

 function  SignUp(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
  const [PreviewImage ,setPreviewImage]=useState("")
    const [SignupData , setSignupData]=useState({
        fullName:"",
        email:"",
        password:"",
        avatar:"",
    })
    function handleUserInput(e){
        const {name,value}=e.target;
         setSignupData({
            ...SignupData,
            [name]:value
         })
    }
    function getImage(event){
        event.preventDefault();
        const uploadeImage=event.target.files[0];
        if(uploadeImage){
            setSignupData(
                {
                    ...SignupData,
                    avatar:uploadeImage,
                }
            )
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadeImage);
            fileReader.addEventListener("load",function(){
                setPreviewImage(fileReader.result);
            })
        }
    }
    async function createNewAccount(event){
        event.preventDefault();
        if(!SignupData.email||!SignupData.fullName||!SignupData.password||!SignupData.avatar){
            toast.error("Please fill all the details");
            return;
        }
        if(SignupData.fullName.length<5){
            toast.error("Name should be atleast 5 character");
            return;
        }
        // checking valid email id
        if(!SignupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            toast.error("Invalid email id");
            return;
        }
        // checking valid password
        if(!SignupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
            toast.error(" The password should be minimum 8 character , capital letter, small letter,Number and special character")
        }

        const formData=new FormData();
        formData.append("fullName",SignupData.fullName);
        formData.append("email",SignupData.email);
        formData.append("password",SignupData.password);
        formData.append("avatar",SignupData.avatar);
// dispatch create account action
     const response= await dispatch(createAccount(formData));
     if(response?.payload?.success)
        navigate("/");
        setSignupData({
        fullname:"",
        email:"",
        password:"",
        avatar:"",
    });
    setPreviewImage("");
    }
    return(
   <HomeLayout>
    <div className="flex overflow-x-auto justify-center items-center h-[90vh]">
       <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-5 text-white w-96  shadow-[0_0_10px_black]">
        <h1 className="text-center text-2xl font-bold">Registration Page</h1>

        <label htmlFor="image_upload" className="cursor-pointer w-25 m-auto">
            {PreviewImage?<img className="w-24 h-24 m-auto rounded-full" src={PreviewImage} />:<BsPersonCircle className="w-24 h-24 m-auto rounded-full"/>}
        </label>
        <input  onChange={getImage} className="hidden" type="file" name="avatar" about=".jpg, .jpag, .png, .svg" id="image_upload"  />
        
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
           value={SignupData.name}
          />
          </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="semibold">Email</label>
          <input 
          type="email" 
          required
          name="email"
          id="email"
          placeholder="Enter your email...."
          className="bg-transparent px-2 py-1 border"
          onChange={handleUserInput}
           value={SignupData.email}
          />
          </div>
          <div className="flex flex-col gap-1">
          <label htmlFor="password" className="semibold">Password</label>
          <input 
          type="password" 
          required
          name="password"
          id="password"
          placeholder="Enter your password"
          className="bg-transparent px-2 py-1 border"
           onChange={handleUserInput}
            value={SignupData.password}
          />
        </div>
        <button type="submit" className=" mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm p-2 font-semibold text-lg cursor-pointer">
            Create account
        </button>
        <h1 className="text-center">
            Already have an account? <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
        </h1>
       </form>
    </div>
   </HomeLayout>
    );
}

export default SignUp;