import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
// import Axios from 'axios';
import './App.css';
// import Navbar from "./components/navbar.component"
// import createUserR from "./components/create-user.component";
import TestR from './Pages/TestR';
import Register from './Pages/Register';
import Login from './Pages/Login';
import LoginSuccess from './Pages/LoginSuccess';

function App() {

  return (
    <div className='app'>
    <Routes>
      <Route path="/" exact element={<Register/>} />        
      <Route path="/TestR" element={<TestR/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/LoginSuccess" element={<LoginSuccess/>} />
    </Routes>
    </div>
  );
}

export default App;
