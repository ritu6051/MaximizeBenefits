import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from '../Common/NavBar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/Alert';

/**
 * @returns the company home page that displays buttons that allow a company to add benefits,
 * add more plans, update benefits, and delete customer
 */
function FrontPage_Company() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const{state} = useLocation();
    const[popUp1, setPopUp1] = useState(false); // Insurance company already offers insurances

    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/Login")
    }
    const addBenefits = () => {
        setPopUp1(false)
        Axios.post("http://localhost:3001/getOfferedInsurances", {
            username: state.username,
        })
        .then((response) => {
            if (response.data.redirect === "no_insurances_offered") {
                navigate('/AddBenefits', {state});
            } else {
                console.log("Insurances already offered")
                setPopUp1(true)
            }
        })
    }

    const editOrRemove = () => {
        Axios.post("http://localhost:3001/getOfferedInsurances", {
            username: state.username,
        })
        .then((response) => {
            navigate('/DisplayOfferedInsurances', {state: {insuranceList: response.data, username: state.username}});
        })
    }

    const addMorePlans = () => {
        navigate('/AddMorePlans', {state});
    }

    const updateCustomerBenefits = () => {
        navigate("/UpdateBenefits")
    }

    const deleteCustomer = () => {
        navigate("/DeleteCustomer")
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
                    <div class="col-md-12 text-center">
                    <br/>
                        <h3>Welcome Insurance Company !! </h3>
                        <h5>What would you like to do next?</h5>
                    </div>

                    <br/>
                    <br/>

                    <div class="col-md-12 text-center">
                        <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={addBenefits}> Add a New Insurance </Button>
                        <br/>
                        <Col>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={editOrRemove}> Edit / Remove Plans / Insurances </Button>
                        </Col>
                        <Col>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={addMorePlans}> Add More Plans to Existing Insurance </Button>
                        </Col>
                        <Col>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={updateCustomerBenefits}> Update Customer Benefits </Button>
                        </Col>
                        <Col>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={deleteCustomer}> Delete Insurance for Customer </Button>
                        </Col>
                    </div>
                            
                </Form>
                <br/>
                {popUp1 && (
                    <Alert variant="danger">
                        An insurance is already offered. Please go to the Edit/Remove tab or Add More Plans to existing insurances tab!
                    </Alert>
                )}
                </Container>
            </Row>
        </Container>
    )
}

export default FrontPage_Company;