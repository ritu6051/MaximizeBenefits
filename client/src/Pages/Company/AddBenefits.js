import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function AddBenefits() {
    const navigate = useNavigate();
    
    // ----------- Start of states -----------
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[insuranceType, setInsuranceType] = useState('');
    const[insuranceName, setInsuranceName] = useState('');
    const[planName, setPlanName] = useState('');
    const[yearlyCost, setYearlyCost] = useState('');
    const[maxAge, setMaxAge] = useState('');
    const [formValues, setFormValues] = useState([{coverageName: "", coverageAmount : ""}])
    const[popUp1, setPopUp1] = useState(false); // Insurance already exists, can't create another
    // ----------- End of states -----------
    
    // ----------- Start of functions -----------
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Insurance Type in handleFormSubmit = "+insuranceType)
        // console.log(JSON.stringify(formValues))
        Axios.post("http://localhost:3001/insertInsurancePlan", {  
            insuranceName: insuranceName,
            insuranceType: insuranceType,
            planName: planName,
            yearlyCost: yearlyCost,
            maxAge: maxAge,
            coverageDetails: formValues,
        })
        .then(function(response) {
            console.log("Redirect msg inside AddInsurance.js = " +response.data.redirect)
            if (response.data.redirect === 'insurance_already_exists') {
                setPopUp1(true)
                // navigate("/Register")
            } else if (response.data.redirect === 'new_insurance_added_successfully') {
                console.log("new_insurance_added_successfully")
                navigate("/FrontPage_Company")
            }
        })
    }

    const handleInsuranceType = event =>{
        console.log(event.target.value);
        setInsuranceType(event.target.value);
    }

    const handleChange = (i, e) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const addFormFields = () => {
        setFormValues([...formValues, { coverageName: "", coverageAmount: "" }])
    }
    
    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/Login")
    }
    // ----------- End of functions -----------

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="whiteBox"> 
            <h2 className = 'mainTitle'> Insurance Benefits </h2> 

            <label className = 'front'> Select Insurance Type </label>
            <select value={insuranceType} onChange={handleInsuranceType}>
                <option value=""> Select Insurance Type </option>
                <option value = "Health" selected> Health </option>
                <option value = "Home"> Home </option>
                <option value = "Auto"> Auto </option>
            </select>

            <label className = 'front'> Insurance Name </label>
            <input 
                type="text" 
                placeholder='Enter Insurance Name'
                onChange={(event) => {
                    setInsuranceName(event.target.value);
                }}
            />
            <h2 className = 'mainTitle'> Add Plans </h2>

            <label className = 'front'> Plan Name </label>
            <input 
                type="text" 
                placeholder='Enter Plan Name'
                onChange={(event) => {
                    setPlanName(event.target.value);
                }}
            />

            <label className = 'front'> Yearly Cost </label>
            <input 
                type="text" 
                placeholder='Enter Yearly Cost'
                onChange={(event) => {
                    setYearlyCost(event.target.value);
                }}
            />

            <label className = 'front'> Max Age </label>
            <input 
                type="text" 
                placeholder='Enter Max Age'
                onChange={(event) => {
                    setMaxAge(event.target.value);
                }}
            />

            {
            formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label> Coverage Name </label>
                    <input type="text" name="coverageName" value={element.coverageName || ""} onChange={e => handleChange(index, e)} />
                    <label> Coverage Amount </label>
                    <input type="text" name="coverageAmount" value={element.coverageAmount || ""} onChange={e => handleChange(index, e)} />
                    {
                        index ? 
                        <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                        : null
                    }
                </div>
            ))}
            
            <div className="button-section">
                <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                <button className="button submit" type="submit">Submit</button>
            </div>
            {popUp1 && (
                <p> Insurance already exists </p>
            )}

            <button onClick={logout} id ='logout'> Logout </button>
            </div>
        </form>
    );
    
}

export default AddBenefits;