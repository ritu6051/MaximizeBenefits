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
 * @returns a page that allows insurance companies to add benefits, where they can input 
 * the type, yearly cost, max age, plan name, and a list of coverages with their costs
 */
function AddBenefits() {
    const navigate = useNavigate();

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[insuranceType, setInsuranceType] = useState('');
    const[insuranceName, setInsuranceName] = useState('');
    const[planName, setPlanName] = useState('');
    const[yearlyCost, setYearlyCost] = useState('');
    const[maxAge, setMaxAge] = useState('');
    const [formValues, setFormValues] = useState([{coverageName: "", coverageAmount : ""}])
    const[popUp1, setPopUp1] = useState(false); // Insurance already exists, can't create another
    const{state} = useLocation();

    const[alreadyExistsType, setAlreadyExistsType] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3001/insertInsurancePlan", {  
            insuranceName: state.username,
            insuranceType: insuranceType,
            planName: planName,
            yearlyCost: yearlyCost,
            maxAge: maxAge,
            coverageDetails: formValues,
        })
        .then(function(response) {
            console.log("Redirect msg inside AddBenefits.js = " +response.data.redirect)
            if (response.data.redirect === 'insurance_already_exists') {
                setAlreadyExistsType(response.data.insuranceType)
                setPopUp1(true)
                // navigate("/Register")
            } else if (response.data.redirect === 'new_insurance_added_successfully') {
                console.log("new_insurance_added_successfully")
                navigate("/FrontPage_Company", {state})
            }
        })
    }

    const handleInsuranceType = event =>{
        console.log(event.target.value);
        setInsuranceType(event.target.value);
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
                                value={insuranceType}
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
                                    placeholder="Plan Name"
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
                                    placeholder="Yearly Cost"
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
                                    placeholder="Max Age"
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
                <Button variant="primary" type="submit"> Add Plan </Button>
                </div>
                </Row>
            </Form>
            <br/>
            {popUp1 && (
                <Alert variant="danger">
                    An insurance of type {alreadyExistsType} already exists. Please go to the Add More Plans tab!
                </Alert>
            )}
        </Container>
    );

}

export default AddBenefits;