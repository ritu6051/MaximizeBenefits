import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function CustomerOrCompany() {
    const navigate = useNavigate();
    const customer = () => {
        navigate("/Register")
    }
    const insuranceCompany = () => {
        navigate("/CompanyRegister")
    }

    return(
        <>
            <h1 id = 'mainTitle'>Maximize Benefits</h1>
            <button className = 'role' onClick={customer}> Customer </button>
            <button className = 'role' onClick={insuranceCompany}> Insurance Company </button>
        </>
        
    );
}

export default CustomerOrCompany;