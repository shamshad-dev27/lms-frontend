import { useSelector } from "react-redux";
import  {Navigate, Outlet } from "react-router-dom" ;

function RequireAuth({allowedRole}){
    const {role,isLoggedIn}=useSelector((state)=>state?.auth);
    return isLoggedIn&&allowedRole.find((myRole)=>myRole==role)?
    (
        <Outlet/>
        )
        : isLoggedIn?(<Navigate to="/denied" replace />):(<Navigate to="/login"/>)
        
    
}
export default RequireAuth;