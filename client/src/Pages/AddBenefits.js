import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function AddBenefits() {
    const navigate = useNavigate();
    const[insuranceType, setInsuranceType] = useState('');
    const[insuranceName, setInsuranceName] = useState('');
    const[cost, setInsuranceCost] = useState('');
    const[age, setInsuranceAge] = useState('');
    const[benefits, setBenefits] = useState([]);
    
    const addInsuranceBenefits = () => {
        Axios.post("http://localhost:3001/insertInsurance", {  
            insuranceType: insuranceType,
            insuranceName: insuranceName,
            cost: cost,
            age: age,
            benefits: benefits,
        })
        .then(function(response){
            if(response.data.redirect ==='NotGood_InsuranceCompanyExist') {
                navigate("/FrontPage_Company")
            }
            else {
                navigate("/FrontPage_Company")
            }
        })
    }

    const handleChange = event =>{
        console.log(event.target.value);
        setInsuranceType(event.target.value);
    }

    return (
        <div className="whiteBox"> 
        <h1 className = 'mainTitle'> Insurance Benefits </h1> 

        <label className = 'front'> Select Insurance Type </label>
        <select value={insuranceType} onChange={handleChange}>
            <option value=""> Select Insurance Type </option>
            <option value = "Health" selected> Health</option>
            <option value = "Home"> Home </option>
            <option value = "Auto"> Auto </option>
            <option value = "Dental"> Dental </option>
        </select>


        <label className = 'front'> Insurance Name </label>
        <input 
            type="text" 
            placeholder='Enter Insurance Name'
            onChange={(event) => {
                setInsuranceName(event.target.value);
            }}
        />

        <label className = 'front'> Cost </label>
        <input 
            type="text" 
            placeholder='Enter Insurance Cost'
            onChange={(event) => {
                setInsuranceCost(event.target.value);
            }}
        />

        <label className = 'front'> Age </label>
        <input 
            type="text" 
            placeholder='Enter Age Range'
            onChange={(event) => {
                setInsuranceAge(event.target.value);
            }}
        />

        <label className = 'front'> Benefits </label>
        <input 
            type="object" 
            placeholder='Enter Benefits '
            onChange={(event) => {
                setBenefits(event.target.value);
            }}
        />
    
        <button onClick={addInsuranceBenefits} className ='decide'> Add Benefits </button>       
        </div>

    );
}

export default AddBenefits;
