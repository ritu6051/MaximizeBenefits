import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import NavBar from '../Common/NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FindInsuranceForCustomer() {
    const navigate = useNavigate();
    const[insuranceTypeList, setInsuranceTypeList] = useState([]);

    const[insuranceType, setInsuranceType] = useState('');
    const[budget, setBudget] = useState('');
    const[maxAge, setMaxAge] = useState('');
    const{state} = useLocation();
    
    // Getting the insurance types available from the database
    Axios.get("http://localhost:3001/getAvailableInsuranceTypes").then((response) => {
        setInsuranceTypeList(response.data)
    })

    const findInsurances = () => {
        Axios.post("http://localhost:3001/testFilter", {
            insuranceType: insuranceType,
            budget: budget,
            maxAge: maxAge
        })
        .then((response) => {
            navigate('/DisplayFilteredInsurances', {state: {insuranceList: response.data, budget: budget, maxAge: maxAge, username: state.username}});
        })
    }

    const handleInsuranceType = event => {
        console.log("Insurance type inside FindInsurance = " +event.target.value);
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

                    <Button variant="primary" type="button" onClick={findInsurances}>Search</Button>
                    </Form>
                </Container>
            </Row>
        </Container>
    );
}

export default FindInsuranceForCustomer;
