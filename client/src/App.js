import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import './App.css';
// import Axios from 'axios';
// import Navbar from "./components/navbar.component"
// import createUserR from "./components/create-user.component";
// import AddInsurance from './Pages/AddInsurance';
// import UpdateBenefits from './Pages/UpdateBenefits';
// import DeleteCustomer from './Pages/DeleteCustomer';

// ---- Organized Routes ----
import Login from './Pages/BothRoles/Login';
import Register from './Pages/BothRoles/Register';
import FrontPage_Company from './Pages/Company/FrontPage_Company';
import FrontPage_Customer from './Pages/Customer/FrontPage_Customer';

import AddBenefits from './Pages/Company/AddBenefits'; //COMPANY
import FindInsurance from './Pages/Customer/FindInsuranceForCustomer'; //CUSTOMER

// ---- Dummy Routes ----
import TestAddPlans from './Pages/DummyFiles/TestAddPlans';
import TestDisplay from './Pages/DummyFiles/TestDisplay';
import TestDynamic from './Pages/DummyFiles/TestDynamic';

// ---- Old Routes - No Longer Used ----
import CompanyLogin from './Pages/OldFiles-NoLongerUsed/CompanyLogin';
import CompanyRegister from './Pages/OldFiles-NoLongerUsed/CompanyRegister';
import CustomerOrCompany from './Pages/OldFiles-NoLongerUsed/CustomerOrCompany';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className='app'>
    <Routes>
      <Route path="/" exact element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />        
      <Route path="/FrontPage_Company" element={<FrontPage_Company/>} />
      <Route path="/FrontPage_Customer" element={<FrontPage_Customer/>} />
      
      <Route path="/AddBenefits" element={<AddBenefits/>} />
      <Route path="/FindInsurance" element={<FindInsurance/>} />
      
      <Route path="/TestDynamic" element={<TestDynamic/>} />
      <Route path="/TestAddPlans" element={<TestAddPlans/>} />
      <Route path="/TestDisplay" element={<TestDisplay/>} />

      <Route path="/CompanyLogin" element={<CompanyLogin/>} />
      <Route path="/CompanyRegister" element={<CompanyRegister/>} />
    </Routes>
    </div>
  );
}

export default App;
