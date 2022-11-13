import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Benefit from './Benefit';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from '../Common/NavBar';


function AddBenefits() {
    const navigate = useNavigate();

    // ----------- Start of states -----------
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [insuranceType, setInsuranceType] = useState('');
    const [insuranceName, setInsuranceName] = useState('');
    const [planName, setPlanName] = useState('');
    const [yearlyCost, setYearlyCost] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [formValues, setFormValues] = useState([{ coverageName: "", coverageAmount: "" }])
    const [plans, setPlans] = useState([{ planName: "", yearlyCost: "", maxAge: "", coverages: formValues }])
    const [popUp1, setPopUp1] = useState(false); // Insurance already exists, can't create another

    const handleFormSubmit = (event) => {
        // setPlans([{planName: planName, yearlyCost: yearlyCost, maxAge: maxAge, coverages: formValues}])
        event.preventDefault();

        Axios.post("http://localhost:3001/insertInsurancePlan", {
            insuranceName: insuranceName,
            insuranceType: insuranceType,
            planName: planName,
            yearlyCost: yearlyCost,
            maxAge: maxAge,
            coverageDetails: formValues,
            plans: plans
        })
            .then(function (response) {
                console.log("Redirect msg inside AddInsurance.js = " + response.data.redirect)
                if (response.data.redirect === 'insurance_already_exists') {
                    setPopUp1(true)
                    // navigate("/Register")
                } else if (response.data.redirect === 'new_insurance_added_successfully') {
                    console.log("new_insurance_added_successfully")
                    navigate("/FrontPage_Company")
                }
            })
    }

    const handleInsuranceType = event => {
        console.log(event.target.value);
        setInsuranceType(event.target.value);
    }

    const addFormFields = () => {
        setFormValues([...formValues, { coverageName: "", coverageAmount: "" }])
    }

    const handleChange = (i, e) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }


  
    // ----------- End of functions -----------

    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>

            <br />

            <Form onSubmit={handleFormSubmit}>
                <div className="whiteBox">
                    <h3 className='mainTitle'> Insurance Benefits </h3>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formInsuranceName">
                                <Form.Label>Insurance Name</Form.Label>
                                <Form.Select
                                    onChange={handleInsuranceType}>
                                    <option value=""> Select Insurance Type </option>
                                    <option value="Health" selected> Health </option>
                                    <option value="Home"> Home </option>
                                    <option value="Auto"> Auto </option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formInsuranceName">
                                <Form.Label>Insurance Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Insurance Name"
                                    onChange={(event) => {
                                        setInsuranceName(event.target.value);
                                    }} />
                            </Form.Group>
                        </Col>
                    </Row>





                    <Row>
                        <h3 className='mainTitle'> Add Plans </h3>
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


                    {
                        formValues.map((element, index) => (
                            Benefit(element, index, removeFormFields, handleChange)
                        ))
                    }

                    <Row>
                        <div>
                        <Button variant="secondary" type="button" onClick={() => addFormFields()}>Add</Button>
                        {' '}
                        <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Row>
                    {popUp1 && (
                        <p> Insurance already exists </p>
                    )}

                </div>
            </Form>
        </Container>
    );

}

export default AddBenefits;