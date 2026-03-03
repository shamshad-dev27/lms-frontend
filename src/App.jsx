import './App.css'

import { Route,Routes,Router } from 'react-router-dom'
import HomePage from "./Pages/HomePage"
import AboutUs from './Pages/AboutUs';
import NotFoundPage from './Pages/NotFoundPage';
function App() {
  return (
   <>
   
   <Routes>
    <Route path="/" element={<HomePage/>}/> 
    <Route path="/about" element={<AboutUs/>}/> 
    <Route path="/*" element={<NotFoundPage/>}/> 
   </Routes>
  
   </>
  );
}

export default App
