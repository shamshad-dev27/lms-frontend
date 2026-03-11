import { useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";


function UserProfile(){
    const userData=useSelector((state)=>state?.auth?.data);
 return(
   <HomeLayout>
    <div className="flex flex-col justify-center items-center h-[90vh]">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-auto shadow-[0_0_10px_black]">
           <img src={userData?.avatar?.secure_url} alt="userImage" className="w-40 m-auto border border-black rounded-full"/>
           <h1 className="text-xl font-semibold text-center capitalize">
               {userData?.fullName}
           </h1>
           <div className="grid grid-cols-2">
            <h1>Email:</h1> <h1>{userData?.email}</h1>
            <h1>Role:</h1> <h1>{userData?.role}</h1>
            <h1>Subscription:</h1><h1>{userData?.subscription?.status==="active"?"Active":"Inactive"}</h1>
           </div>
           <div className="flex justify-between items-center gap-2">
          <Link 
          to="/changepassword"
          className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition ease-in-out duration-300 rounded-sm cursor-pointer py-2 font-semibold text-center">
         <button> Change Password</button>
          </Link>
          <Link 
          to="/changepassword"
          className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition ease-in-out duration-300 rounded-sm cursor-pointer py-2 font-semibold text-center">
          <button>Edit Profile</button>
          </Link>
         </div>
         {userData?.subscription?.status==="active"||true&&(
            <button
            className="w-full bg-red-600 hover:bg-red-500 transition ease-in-out duration-300 font-semibold py-2 rounded-lg text-lg"
            >Cancel Subscription</button>
         )}
        </div>
    </div>
   </HomeLayout>
 )
}

export default UserProfile;