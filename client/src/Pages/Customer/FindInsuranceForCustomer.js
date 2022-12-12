import {useNavigate, Link, useLocation} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import NavBar from '../Common/LogoutNavBar';

/**
 * @returns a page that asks the user to type in a type, budget, and age to search through insurances
 */
function FindInsuranceForCustomer() {
    
    const navigate = useNavigate();
    const [insuranceTypeList, setInsuranceTypeList] = useState([]);
    const [insuranceType, setInsuranceType] = useState('');
    const [budget, setBudget] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const {state} = useLocation();
    const [popUp1, setPopUp1] = useState(false); // Already enrolled in that type
    const [popUp2, setPopUp2] = useState(false); // Empty fields
    
    Axios.get("http://localhost:3001/getAvailableInsuranceTypes").then((response) => {
        setInsuranceTypeList(response.data)
    })

    const findInsurances = () => {
        setPopUp2(false)
        if(!insuranceType || !budget || !maxAge) {
            setPopUp2(true)
        } else {
            Axios.post("http://localhost:3001/getInsurancesThatFitUserCriteria", {
                insuranceType: insuranceType,
                budget: budget,
                maxAge: maxAge
            })
            .then((response) => {
                if(!popUp1) {
                    navigate('/DisplayFilteredInsurances', {state: {insuranceList: response.data, budget: budget, maxAge: maxAge, username: state.username}});
                }
            })
        }
    }

    const handleUpgrade = () => {
        setPopUp2(false)
        if(!insuranceType || !budget || !maxAge) {
            setPopUp2(true)
        } else {
            Axios.post("http://localhost:3001/getInsurancesThatFitUserCriteria", {
                insuranceType: insuranceType,
                budget: budget,
                maxAge: maxAge
            })
            .then((response) => {
                navigate('/UpgradeInsurance', {state: {insuranceList: response.data, budget: budget, maxAge: maxAge, username: state.username}});
            })
        }
    }

    const handleInsuranceType = (event) => {
        setPopUp1(false)
        console.log("Insurance type = " +event.target.value)
        Axios.post("http://localhost:3001/getEnrolledInsuranceTypes", {
            username: state.username
        }).then((response) => {
            for(var i = 0; i<response.data.length; i++)  {
                if(event.target.value === response.data[i]) {
                    console.log(response.data[i])
                    setPopUp1(true)
                    setInsuranceType(event.target.value);
                }
            }
        })        
        setInsuranceType(event.target.value);
    }

    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/>
            <Row>
                <Container>
                    <Form>

                    <h3> Please Enter Criteria </h3>
                    <br/>
                    
                    <Form.Group className="mb-3" controlId="formInsuranceType">
                    <Form.Label>Insurance Type</Form.Label>
                    <Form.Select
                        onChange={handleInsuranceType}>
                        <option value=""> Select Insurance Type </option>
                        {
                            insuranceTypeList.map((val, key) => {
                                return (
                                    <option key={key}> {val} </option>
                                ) 
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBudget">
                    <Form.Label>Please Enter Budget</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Budget"
                        onChange={(event) => {
                            setBudget(event.target.value);
                        }} />               
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAge">
                    <Form.Label>Please Enter Age</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Age"
                        onChange={(event) => {
                            setMaxAge(event.target.value);
                        }} />
                    </Form.Group>
                    <br/>

                    <Button variant="primary" type="button" onClick={findInsurances}>
                        Search
                    </Button>
                    </Form>
                    <br/>
                    {popUp1 && (
                        <Alert variant="danger">
                            You are already enrolled in {insuranceType} insurance.
                            Click <Button onClick={handleUpgrade}>here</Button> to change to a different insurance!
                        </Alert>
                    )}
                    {popUp2 && (
                        <Alert variant="danger">
                            Please enter all fields
                        </Alert>
                    )}
                </Container>
            </Row>
        </Container>
    );
}

export default FindInsuranceForCustomer;
