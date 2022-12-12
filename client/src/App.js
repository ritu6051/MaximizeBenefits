import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import './App.css';

// Both Roles
import Login from './Pages/BothRoles/Login';
import Register from './Pages/BothRoles/Register';
import AboutUs from './Pages/Common/AboutUs';

// Customer
import FrontPage_Customer from './Pages/Customer/FrontPage_Customer';
import FindInsurance from './Pages/Customer/FindInsuranceForCustomer';
import DisplayFilteredInsurances from './Pages/Customer/DisplayFilteredInsurances';
import UpgradeInsurance from './Pages/Customer/UpgradeInsurance'; 
import DeleteMyInsurance from './Pages/Customer/DeleteMyInsurance';

// Company
import FrontPage_Company from './Pages/Company/FrontPage_Company';
import AddBenefits from './Pages/Company/AddBenefits';
import DeleteCustomer from'./Pages/Company/DeleteCustomer';
import DisplayOfferedInsurances from'./Pages/Company/DisplayOfferedInsurances';
import EditBenefits from './Pages/Company/EditBenefits';
import AddMorePlans from './Pages/Company/AddMorePlans';

import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @returns all of pages and routes that the application takes from one page to another
 */
function App() {

  return (
    <div className='app'>
    <Routes>

      {/* Both Roles */}
      <Route path="/" exact element={<AboutUs/>} />
      <Route path="/AboutUs" exact element={<AboutUs/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />        

      {/* Customer */}
      <Route path="/FrontPage_Customer" element={<FrontPage_Customer/>} />
      <Route path="/FindInsurance" element={<FindInsurance/>} />
      <Route path="/DisplayFilteredInsurances" element={<DisplayFilteredInsurances/>} />
      <Route path="/UpgradeInsurance" element={<UpgradeInsurance/>} />
      <Route path="/DeleteMyInsurance" element={<DeleteMyInsurance/>} />

      {/* Company */}
      <Route path="/FrontPage_Company" element={<FrontPage_Company/>} />
      <Route path="/AddBenefits" element={<AddBenefits/>} />
      <Route path="/DeleteCustomer" element={<DeleteCustomer/>} />
      <Route path="/DisplayOfferedInsurances" element={<DisplayOfferedInsurances/>} />
      <Route path="/EditBenefits" element={<EditBenefits/>} />
      <Route path="/AddMorePlans" element={<AddMorePlans/>} />

    </Routes>
    </div>
  );
}

export default App;
