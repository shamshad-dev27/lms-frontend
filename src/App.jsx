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
function App() {
  return (
   <>
     <Toaster />
   <Routes>
    <Route path="/" element={<HomePage/>}/> 
    <Route path="/about" element={<AboutUs/>}/> 
    <Route path="/courses" element={<CourseList/>}/> 
    <Route path="/contact" element={<Contact/>}/> 
    <Route path="/denied" element={<Denied/>}/> 
    <Route path="/course/description" element={<CourseDescription/>}/> 
    <Route path="/signup" element={<SignUp/>}/> 
    <Route path="/login" element={<Login/>}/> 
    <Route path="/*" element={<NotFoundPage/>}/> 
   </Routes>
  
   </>
  );
}

export default App
