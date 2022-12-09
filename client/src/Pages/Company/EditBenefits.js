import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from '../Common/NavBar';
import Alert from 'react-bootstrap/Alert';

/**
 * @returns the page that companies are redirected to if they choose to edit an existing plan, where 
 * they can input the type, yearly cost, max age, plan name, and a list of coverages with their costs
 */
function EditBenefits() {
    const navigate = useNavigate();

    const{state} = useLocation();
    const[insuranceType, setInsuranceType] = useState(state.val1.insuranceType);
    const[insuranceName, setInsuranceName] = useState(state.val1.insuranceName);
    const[planName, setPlanName] = useState(state.val2.planName);
    const[yearlyCost, setYearlyCost] = useState(state.val2.yearlyCost);
    const[maxAge, setMaxAge] = useState(state.val2.age);
    const [formValues, setFormValues] = useState(state.coverages)

    const [originalPlanName, setOriginalPlanName] = useState(state.val2.planName)

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
        
    const[popUp1, setPopUp1] = useState(false); // Insurance already exists, can't create another
    
    // setFormValues(state.coverages)
    // const [formValues, setFormValues] = useState([{coverageName: "", coverageAmount : ""}])

    const handleFormSubmit = (event) => {
        console.log("Insurance Name = " +insuranceName)
        console.log("Insurance Type = " +insuranceType)
        console.log("Plan Name = " +planName)
        console.log("Plan Name = " +yearlyCost)
        event.preventDefault();
        Axios.post("http://localhost:3001/updateInsurancePlan", {  
            insuranceName: state.username,
            insuranceType: insuranceType,
            planName: planName,
            yearlyCost: yearlyCost,
            maxAge: maxAge,
            coverageDetails: formValues,
            originalPlanName: originalPlanName
        })
        .then(function(response) {
            console.log("Redirect msg inside AddBenefits.js = " +response.data.redirect)
            if (response.data.redirect === 'insurance_already_exists') {
                setPopUp1(true)
                // navigate("/Register")
            } else if (response.data.redirect === 'updated_company_insurance') {
                console.log(response.data.redirect)
                console.log(state.insuranceList)
                navigate("/FrontPage_Company", {state})
                // navigate('/DisplayOfferedInsurance', {state: {val1: val1, val2: val2, coverages: coverages, insuranceList: state.insuranceList, username: state.username}});
            }
        })
    }

    const handleInsuranceType = event =>{
        console.log(event.target.value);
        setInsuranceType(event.target.value);
        console.log("Type = " +insuranceType)
    }

    const handleChange = (i, e) => {
        console.log("e = " +e.target.name)
        const newFormValues = [...formValues];
        // newFormValues[i][e.target.name] = e.target.value;
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        console.log(newFormValues)   
    }

    const addFormFields = () => {
        console.log(formValues)
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
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/>

            <Form onSubmit={handleFormSubmit}>
                <div className="whiteBox"> 
                    <h2 className = 'mainTitle'> Insurance Benefits </h2> 

                    <Row>
                    <Form.Group className="mb-3" controlId="formInsuranceName">
                            <Form.Label> Your Insurance/Company Name: </Form.Label>
                                {/* <Form.Control

                                    // type="text"
                                    // placeholder="Insurance Name"
                                    // onChange={(event) => {
                                    //     setInsuranceName(event.target.value);
                                    // }}
                                    /> */}
                                <b> {state.username}</b>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3" controlId="formInsuranceName">
                            <Form.Label> Insurance Type </Form.Label>
                            <Form.Select 
                                defaultValue={state.val1.insuranceType}
                                onChange={handleInsuranceType}>
                                <option value=""> Select Insurance Type </option>
                                <option value="Health" selected> Health </option>
                                <option value="Home"> Home </option>
                                <option value="Auto"> Auto </option>
                            </Form.Select>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formPlanName">
                                <Form.Label>Plan Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={state.val2.planName}
                                    // value={state.val2.planName}
                                    onChange={(event) => {
                                        setPlanName(event.target.value);
                                    }} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="formYearlyCost">
                                <Form.Label>Yearly Cost</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder={state.val2.yearlyCost}
                                    // value={state.val2.yearlyCost}
                                    onChange={(event) => {
                                        setYearlyCost(event.target.value);
                                    }} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="formMaxAge">
                                <Form.Label>Max Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder={state.val2.age}
                                    // value={state.val2.age}
                                    onChange={(event) => {
                                        setMaxAge(event.target.value);
                                    }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                            <Form.Label> Enter Coverages </Form.Label>
                    </Row>
                </div>
                {
                formValues.map((element, index) => (
                    <Row>
                        <Col>
                        <Form.Group className="mb-3" controlId="coverageName" >
                            <Form.Control
                                type = "text"
                                name = "coverageName"
                                placeholder = "Coverage Name"
                                // value = {element.coverageName}
                                defaultValue = {element.coverageName || ""}
                                onChange = {e => handleChange(index, e)} />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3" controlId="coverageAmount" >
                            <Form.Control
                                type = "number"
                                name = "coverageAmount"
                                placeholder = "Coverage Amount"
                                // value = {element.coverageAmount}
                                defaultValue = {element.coverageAmount || ""}
                                onChange = {e => handleChange(index, e)} />
                        </Form.Group>
                        </Col>
                        <Col>
                        {
                            index ?
                                <Button variant="primary" type="button" onClick={() => removeFormFields(index)}>Remove</Button>
                                : null
                            }
                        </Col>
                    </Row>
                    // );
                ))
                }
                <Row>
                <div>
                <Button variant="secondary" type="button" onClick={() => addFormFields()}>Add More Coverages</Button>
                {' '}
                <Button variant="primary" type="submit"> Update Plan </Button>
                </div>
                </Row>
            </Form>
        </Container>
    );

}

export default EditBenefits;