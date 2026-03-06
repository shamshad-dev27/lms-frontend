import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast} from "react-hot-toast";
import {  LoginUser } from "../Redux/Slices/AuthSlice";

 function Login()
{
    const dispatch=useDispatch();
    const navigate=useNavigate();
 
    const [LoginData , setLoginData]=useState({
        email:"",
        password:"",
    })
    function handleUserInput(e){
        const {name,value}=e.target;
         setLoginData({
            ...LoginData,
            [name]:value
         })
    }
  
    async function onLogin(event){
        event.preventDefault();
        if(!LoginData.email||!LoginData.password){
            toast.error("Please fill all the details");
            return;
        }
// dispatch create account action
     const response= await dispatch(LoginUser(LoginData));
     if(response?.payload?.success)
        navigate("/");
        setLoginData({
        email:"",
        password:"",
    });
    }
    return(
   <HomeLayout>
    <div className="flex overflow-x-auto justify-center items-center h-[90vh]">
       <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-5 text-white w-96  shadow-[0_0_10px_black]">
        <h1 className="text-center text-2xl font-bold">Login Page</h1>

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
           value={LoginData.email}
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
            value={LoginData.password}
          />
        </div>
        <button type="submit" className=" mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm p-2 font-semibold text-lg cursor-pointer">
            Login
        </button>
        <h1 className="text-center">
           Don't have an account? <Link to="/signup" className="link text-accent cursor-pointer">Signup</Link>
        </h1>
       </form>
    </div>
   </HomeLayout>
    );
}

export default Login;