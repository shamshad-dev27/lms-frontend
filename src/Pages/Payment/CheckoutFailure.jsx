import { RxCrossCircled } from "react-icons/rx";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function CheckoutFailure(){
    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] text-white">
                <div className="w-80 h-[26rem] flex flex-col justify-center  text-center shadow-[0_0_10px_black] rounded-lg relative">
                  <h1 className="bg-red-500 py-4 text-2xl items-center font-bold absolute top-0 w-full rounded-tl-lg rounded-tr-lg">
                    Payment Failed!
                  </h1>
                  <div className="flex flex-col px-4 space-y-2 items-center justify-center">
                     <div className="text-center space-y-2">
                       <h2 className="text-lg font-semibold">
                        Oops ! your payment Failed
                       </h2>
                       <p>
                       Please try again later
                       </p>
                     </div>
                     <RxCrossCircled className="text-red-500 text-5xl"/>
                  </div>
                  <Link to="/checkout" className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 rounded-bl-lg rounded-br-lg text-xl font-semibold text-center">
                  <button>
                    Try again
                  </button>
                  </Link>
                </div>
            </div>
        </HomeLayout>

    );


}


export default CheckoutFailure;