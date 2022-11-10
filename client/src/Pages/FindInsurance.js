import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function FindInsurance() {
    const navigate = useNavigate();
    const[insuranceType, setInsuranceType] = useState('');
    const[insuranceName, setInsuranceName] = useState('');
    const[budget, setBudget] = useState('');
    const[age, setAge] = useState('');
    const[popUp, setpopUp] = useState(false);
    const[userList, setUserList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [fruit, setFruit] = useState("Select a fruit")
    
    // const findInsurances = () => {
    //     Axios.post("http://localhost:3001/findInsurances",{
    //         insuranceType: insuranceType,
    //         insuranceName: insuranceName,
    //         budget: budget,
    //         age: age,
    //     })
    //     .then(function(response) {
    //         console.log(response)
    //         navigate('/DisplayInsurances')
    //     })
    //     // .then(function (response) {
    //     //     setUserList(response.data.redirect)
    //     //     console.log("UserList = " +response.data.redirect)
    //     // })
    // }

    const findInsurances = () => {
        navigate("/DisplayInsurances")
    }
    
    const selectInsurance = () => {
        //do something
        console.log("Here")
    }

    const handleChange = event => {
        setInsuranceType(event.target.value);
    }

    return (
        <div className="whiteBox"> 
        <h1> Please Enter Criteria </h1> 

        <div className="dropdown">
            <select value={insuranceType} onChange={handleChange}>  
                <option> --- What kind of insurance? --- </option>  
                <option value = 'Health'> Health </option>  
                <option value = 'Dental'> Dental </option>  
                <option value = 'Home'> Home </option>  
                <option value = 'Auto'> Auto </option>
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
                setAge(event.target.value);
            }}
        />

        <button id='next' onClick={findInsurances}> Next </button>
        </div>
    );
}

export default FindInsurance;