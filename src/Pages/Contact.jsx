import { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { isEmail} from "../Helper/RegexMatcher";
import axiosInstance from '../Helper/axiosInstance';
function Contact(){
  const navigate=useNavigate()
  const [formData ,setFormData]=useState({
    name:"",
    email:"",
    message:""
  });
  function inputChange(event){
    const {name,value}=event.target;
    console.log(value);
     setFormData({
        ...formData,
      [name]:value
     })
  }
  async function onFormSubmit(event){
       event.preventDefault();
       if(!formData.name||!formData.email||!formData.message){
        toast.error("Fill all the detail");
        return;
       }
        if(!isEmail(formData.email)){
            toast.error("Invalid email id");
            return;
        }
        try{
            const response=axiosInstance.get("/contact",formData);
            toast.error(response,{
              loading:"Submitting your message...",
              success:"Submited Form Data",
              error:"Fail to submit"
            });
            const ContactResponse=await response;
            if(ContactResponse?.data?.success){
               setFormData({
                 name:"",
                 email:"",
                 message:""
       })
            }
        }catch(e){
             toast.error("operation failed.....")
        }
      
  }
    return(
      <HomeLayout>
       <div  className='flex  items-center justify-center h-[90vh]'>
         <form onSubmit={onFormSubmit} noValidate
         className='flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]'>
          <h1 className='text-3xl font-semibold text-yellow-500 text-center'>
            Contact Form
          </h1>
          <div className='flex flex-col gap-1 w-full'>
             <label htmlFor="name" className='text-xl font-semibold'>Name </label>
             <input 
             type="text" 
             name="name" 
             id="name"  
             className='bg-transparent border px-2 py-1 rounded-sm'
              placeholder='Enter your name...'
              onChange={inputChange}
              value={formData.name}
              />
          </div>
          <div className='flex flex-col gap-1 w-full'>
             <label htmlFor="email" className='text-xl font-semibold'>Email </label>
             <input 
             type="email" 
             name="email" 
             id="email"  
             className='bg-transparent border px-2 py-1 rounded-sm' 
             placeholder='Enter your email...'
             onChange={inputChange}
             value={formData.email}
             />
          </div>
          <div className='flex flex-col gap-1 w-full'>
             <label htmlFor="message" className='text-xl font-semibold'>Message</label>
             <textarea 
             name="message"
              id="message" 
               className='bg-transparent border px-2 py-1 rounded-sm resize-none h-40'
                placeholder='Enter your message...'
                onChange={inputChange}
                value={formData.message}
                />
          </div>
          <button  type='submit' className='w-full bg-yellow-600 py-2 hover:bg-yellow-500 transition ease-in-out duration-300  rounded-sm font-semibold text-lg cursor-pointer'>
             Submit
          </button>
        </form>
       </div>
      </HomeLayout>
    );
}

export default Contact;