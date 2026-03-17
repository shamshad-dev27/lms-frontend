import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function CheckoutSuccess(){
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getUserData());
    },[])
    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] text-white">
                <div className="w-80 h-[26rem] flex flex-col justify-center  text-center shadow-[0_0_10px_black] rounded-lg relative">
                  <h1 className="bg-green-500 py-4 text-2xl items-center font-bold absolute top-0 w-full rounded-tl-lg rounded-tr-lg">
                    Payment Successfull!
                  </h1>
                  <div className="flex flex-col px-4 space-y-2 items-center justify-center">
                     <div className="text-center space-y-2">
                       <h2 className="text-lg font-semibold">
                        Welcome to pro bundle
                       </h2>
                       <p>
                        Now you can enjoy all the course
                       </p>
                     </div>
                     <AiFillCheckCircle className="text-green-500 text-5xl"/>
                  </div>
                  <Link to="/" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 rounded-bl-lg rounded-br-lg text-xl font-semibold text-center">
                  <button>
                    Go to dashboard
                  </button>
                  </Link>
                </div>
            </div>
        </HomeLayout>

    );


}


export default CheckoutSuccess;