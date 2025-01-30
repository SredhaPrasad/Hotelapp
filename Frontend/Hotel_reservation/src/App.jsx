import React from 'react';
import Index from './Components/Index';
import About from './Components/About';
import { Route, Routes } from 'react-router-dom';
import Gallery from './Components/Gallery';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';

const App = () => {
  return (

    <>
   <Navbar/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
