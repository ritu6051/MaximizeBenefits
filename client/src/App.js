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
import AddBenefits from './Pages/AddBenefits';
import UpdateBenefits from './Pages/UpdateBenefits';
import DeleteCustomer from './Pages/DeleteCustomer';
import DisplayInsurances from './Pages/DisplayInsurances';


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
      <Route path="/AddBenefits" element={<AddBenefits/>} />
      <Route path="/UpdateBenefits" element={<UpdateBenefits/>} />
      <Route path="/DeleteCustomer" element={<DeleteCustomer/>} />
      <Route path="/CompanyLogin" element={<CompanyLogin/>} />
      <Route path="/CompanyRegister" element={<CompanyRegister/>} />
      <Route path="/DisplayInsurances" element={<DisplayInsurances/>} />
    </Routes>
    </div>
  );
}

export default App;