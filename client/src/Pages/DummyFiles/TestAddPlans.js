import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function TestAddPlans() {
    const navigate = useNavigate();
    const[insuranceName, setInsuranceName] = useState('');
    const[insuranceType, setInsuranceType] = useState('');
    const[cost, setInsuranceCost] = useState('');
    const[age, setInsuranceAge] = useState('');
    const[benefits, setBenefits] = useState([]);
    const [formValues1, setFormValues1] = useState([{planName: "", planCost : "", age : "", coverages : []}])
    const [formValues, setFormValues] = useState([{name: "", email : ""}])
    
    const addInsuranceBenefits2 = () => {
        // setInsuranceName("Insurance Name Cigna")
        // setInsuranceType("Insurance Type Health")
        // const coverages = ["Physical: 100", "Dental: 200"]
        // setFormValues1([...formValues1, { planName: "Premium", yearlyCost: "2000", age: "25", coverages: coverages}])
        console.log(formValues)
    }

    const addInsuranceBenefits = () => {
        
        // console.log(insuranceName)
        // console.log(insuranceType)
        console.log(formValues1[1])
        Axios.post("http://localhost:3001/testAddPlans", {  
            // insuranceType: insuranceType,
            // insuranceName: insuranceName,
            // cost: cost,
            // age: age,
            // benefits: benefits,
            insuranceName: insuranceName,
            insuranceType: insuranceType,
            formValues: formValues1[1]
        })
        .then(function(response){
            console.log("Here inside TestAddPlans")
        })
    }

    const findInsurances = () => {
        console.log("here")
        console.log(formValues)
        navigate("/TestAddPlans")
    }
    const handleChange = (i, e) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
    }
    
    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(JSON.stringify(formValues));
    }


    return (
        <form  onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>Name</label>
              <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
              <label>Email</label>
              <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
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
          <button id='next' onClick={findInsurances}> Next </button>
          <div className="whiteBox"> 
        <button onClick={addInsuranceBenefits2} className ='decide'> Add </button>       
        <button onClick={addInsuranceBenefits} className ='decide'> Add Benefits </button>       
        </div>
      </form>
        
    );
}

export default TestAddPlans;