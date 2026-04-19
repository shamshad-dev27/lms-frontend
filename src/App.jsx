import './App.css'

import { Route,Routes,Router } from 'react-router-dom'
import HomePage from "./Pages/HomePage"
import AboutUs from './Pages/AboutUs';
import NotFoundPage from './Pages/NotFoundPage';
import SignUp from './Pages/SignUp';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login';
import CourseList from './Pages/Course/CourseList';
import Contact from './Pages/Contact';
import Denied from './Pages/Denied';
import CourseDescription from './Pages/CourseDescription';
import CreateCourse from './Pages/Course/CreateCoures';
import RequireAuth from './Components/auth/RequireAuth';
import UserProfile from './Pages/User/UserProfile';
import EditProfile from './Pages/User/EditProfile';
import Checkout from './Pages/Payment/Checkout';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';
import CheckoutFailure from './Pages/Payment/CheckoutFailure';
import DisplayLecture from './Pages/Dashboard/DisplayLecture';
import AddLecture from './Pages/Dashboard/AddLecture';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import ChangePassword from './Pages/User/ChangePassword';
function App() {
  return (
   <>
     <Toaster position="top-right" />
   <Routes>
    <Route path="/" element={<HomePage/>}/> 
    <Route path="/about" element={<AboutUs/>}/> 
    <Route path="/courses" element={<CourseList/>}/> 
    <Route path="/contact" element={<Contact/>}/> 
    <Route path="/denied" element={<Denied/>}/> 
    <Route path="/course/description" element={<CourseDescription/>}/> 
    <Route path="/signup" element={<SignUp/>}/> 
    <Route path="/login" element={<Login/>}/> 
    <Route element={<RequireAuth allowedRole={["ADMIN"]} />}>
   <Route path="/course/create" element={<CreateCourse/>}/>
    <Route path="/course/addlecture"element={<AddLecture/>}/> 
    <Route path="/admin/dashboard"element={<AdminDashboard/>}/> 
    </Route> 
    <Route element={<RequireAuth allowedRole={["ADMIN","User"]} />}>
     <Route path="/user/profile"element={<UserProfile/>}/> 
     <Route path="/user/editProfile"element={<EditProfile/>}/> 
     <Route path="/checkout"element={<Checkout/>}/> 
     <Route path="/checkout/success"element={<CheckoutSuccess/>}/> 
     <Route path="/checkout/fail"element={<CheckoutFailure/>}/> 
     <Route path="/course/displaylectures"element={<DisplayLecture/>}/>  
     <Route path="/changepassword"element={<ChangePassword/>}/>  
    </Route> 
    
    <Route path="/*" element={<NotFoundPage/>}/> 
   </Routes>

   </>
  );
}

export default App


