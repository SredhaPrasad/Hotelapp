import React from 'react';
import Index from './Components/Index';
import About from './Components/About';
import { Route, Routes } from 'react-router-dom';
import Gallery from './Components/Gallery';
// import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Homescreen from './Components/Screens/Homescreen';

import 'bootstrap/dist/css/bootstrap.min.css';
// import Bookingscreen from './Components/Screens/Bookingscreen';
import Admin from './Components/Admin';
import Hoteldashboard from './Components/Hoteldashboard';
import Hotelroomadd from './Components/Hotelroomadd';
import HotelBooking from './Components/HotelBooking';
import AdminApprovalPage from './Components/AdminApprovalPage';








const App = () => {
  return (

    <>
   <Navbar/>
   
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homescreen />} />
        <Route path="/admin" element={<Admin />} /> 
        <Route path="/Hotel" element={<Hoteldashboard />} /> 
        <Route path="/hoteladd" element={<Hotelroomadd />} /> 
        <Route path="/hotelbooking" element={<HotelBooking />} />
        <Route path="/approval" element={<AdminApprovalPage />} />
       
       
     
       
        
          
        
        


       
        


      
      </Routes>
    </>
  );
};

export default App;
