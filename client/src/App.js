import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
// import Axios from 'axios';
import './App.css';
// import Navbar from "./components/navbar.component"
// import createUserR from "./components/create-user.component";
import Register from './Pages/Register';
import Login from './Pages/Login';
import FrontPage_Customer from './Pages/FrontPage_Customer';
import FrontPage_Company from './Pages/FrontPage_Company';
import FindInsurance from './Pages/FindInsurance';
import AddInsurance from './Pages/AddInsurance';
import CompanyLogin from './Pages/CompanyLogin';
import CompanyRegister from './Pages/CompanyRegister';
import CustomerOrCompany from './Pages/CustomerOrCompany';


function App() {

  return (
    <div className='app'>
    <Routes>
      <Route path="/" exact element={<Register/>} />
      <Route path="/Register" element={<Register/>} />        
      <Route path="/Login" element={<Login/>} />
      <Route path="/FrontPage_Customer" element={<FrontPage_Customer/>} />
      <Route path="/FrontPage_Company" element={<FrontPage_Company/>} />
      <Route path="/FindInsurance" element={<FindInsurance/>} />
      <Route path="/AddInsurance" element={<AddInsurance/>} />
      <Route path="/CompanyLogin" element={<CompanyLogin/>} />
      <Route path="/CompanyRegister" element={<CompanyRegister/>} />

    </Routes>
    </div>
  );
}

export default App;
