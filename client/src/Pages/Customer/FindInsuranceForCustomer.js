import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function FindInsuranceForCustomer() {
    const navigate = useNavigate();
    const[insuranceTypeList, setInsuranceTypeList] = useState([]);
    const[insuranceType, setInsuranceType] = useState('');
    const[budget, setBudget] = useState('');
    const[maxAge, setMaxAge] = useState('');
    
    
    Axios.get("http://localhost:3001/getAvailableInsuranceTypes").then((response) => {
        setInsuranceTypeList(response.data)
    })

    const findInsurances = () => {
        Axios.post("http://localhost:3001/findInsurances", {
        // Axios.post("http://localhost:3001/print", {
            // insuranceType: insuranceType,
            // budget: budget,
            // maxAge: maxAge
        })
        .then((response) => {
            // navigate("/TestDisplay")
        })
    }

    const handleInsuranceType = event =>{
        console.log(event.target.value);
        setInsuranceType(event.target.value);
        console.log("Insurance type = " +insuranceType)
    }

    return (
        <div className="whiteBox"> 
        <h1> Please Enter Criteria </h1> 
        {/* 
        <div className="dropdown">
        <select id = "insuranceTypeList" onClick={handleInsuranceType}>  
            <option> --- What kind of insurance? --- </option>  
            <option> Health </option>
            <option> Dental </option>
        </select>  
        </div>
         */}
        
        <div className="dropdown">
        <select id = "insuranceTypeList" onClick={handleInsuranceType}>  
            <option> --- What kind of insurance? --- </option>  
            {
                insuranceTypeList.map((val, key) => {
                    return (
                        <option key={key}> {val} </option>
                    ) 
                })
            }
        </select>  
        </div>

        <label className = 'front'> What is your budget? (Max) </label>
        <input 
            type="number" 
            placeholder='Enter budget'
            onChange={(event) => {
                setBudget(event.target.value);
            }}
        />

        <label className = 'front'> What is your age? </label>
        <input 
            type="number" 
            placeholder='Enter age'
            onChange={(event) => {
                setMaxAge(event.target.value);
            }}
        />
        
        <button id='next' onClick={findInsurances}> Next </button>
        </div>
    );
}

export default FindInsuranceForCustomer;