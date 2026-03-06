import './App.css'

import { Route,Routes,Router } from 'react-router-dom'
import HomePage from "./Pages/HomePage"
import AboutUs from './Pages/AboutUs';
import NotFoundPage from './Pages/NotFoundPage';
import SignUp from './Pages/SignUp';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login';
function App() {
  return (
   <>
     <Toaster />
   <Routes>
    <Route path="/" element={<HomePage/>}/> 
    <Route path="/about" element={<AboutUs/>}/> 
    <Route path="/signup" element={<SignUp/>}/> 
    <Route path="/login" element={<Login/>}/> 
    <Route path="/*" element={<NotFoundPage/>}/> 
   </Routes>
  
   </>
  );
}

export default App
