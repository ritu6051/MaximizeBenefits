import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import './App.css';

// ---- Organized Routes ----

// Both Roles
import Login from './Pages/BothRoles/Login';
import Register from './Pages/BothRoles/Register';

// Customer
import FrontPage_Customer from './Pages/Customer/FrontPage_Customer';
import FindInsurance from './Pages/Customer/FindInsuranceForCustomer';

import FrontPage_Company from './Pages/Company/FrontPage_Company';
import AddBenefits from './Pages/Company/AddBenefits'; //COMPANY
import DeleteMyInsurance from './Pages/Customer/DeleteMyInsurance'; //CUSTOMER
import DeleteCustomer from'./Pages/Company/DeleteCustomer';
import DisplayOfferedInsurances from'./Pages/Company/DisplayOfferedInsurances'; //COMPANY
import EditBenefits from './Pages/Company/EditBenefits'; //COMPANY
import AddMorePlans from './Pages/Company/AddMorePlans'; //COMPANY
import UpgradeInsurance from './Pages/Customer/UpgradeInsurance'; //CUSTOMER

// ---- Dummy Routes ----
import TestAddPlans from './Pages/DummyFiles/TestAddPlans';
import TestDisplay from './Pages/DummyFiles/TestDisplay';
import TestDynamic from './Pages/DummyFiles/TestDynamic';
import DisplayFilteredInsurances from './Pages/Customer/DisplayFilteredInsurances';

// ---- Old Routes - No Longer Used ----
import CompanyLogin from './Pages/OldFiles-NoLongerUsed/CompanyLogin';
import CompanyRegister from './Pages/OldFiles-NoLongerUsed/CompanyRegister';
import CustomerOrCompany from './Pages/OldFiles-NoLongerUsed/CustomerOrCompany';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className='app'>
    <Routes>

      {/* Both Roles */}
      <Route path="/" exact element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />        

      {/* Customer */}
      <Route path="/FrontPage_Customer" element={<FrontPage_Customer/>} />
      <Route path="/FindInsurance" element={<FindInsurance/>} />
      

      
      <Route path="/FrontPage_Company" element={<FrontPage_Company/>} />
      <Route path="/AddBenefits" element={<AddBenefits/>} />
      <Route path="/DisplayFilteredInsurances" element={<DisplayFilteredInsurances/>} />
      <Route path="/DeleteMyInsurance" element={<DeleteMyInsurance/>} />
      <Route path="/DeleteCustomer" element={<DeleteCustomer/>} />
      <Route path="/DisplayOfferedInsurances" element={<DisplayOfferedInsurances/>} />
      <Route path="/EditBenefits" element={<EditBenefits/>} />
      <Route path="/AddMorePlans" element={<AddMorePlans/>} />
      <Route path="/UpgradeInsurance" element={<UpgradeInsurance/>} />
      
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
