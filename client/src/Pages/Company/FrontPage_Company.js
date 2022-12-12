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
import Wallpaper from '../../Images/MaximizeBenefitsLogo.png'

/**
 * @returns the company home page that displays buttons that allow a company to add benefits,
 * add more plans, update benefits, and delete customer
 */
function FrontPage_Company() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imgPath, setImgPath] = useState('');
    const{state} = useLocation();
    const[popUp1, setPopUp1] = useState(false); // Insurance company already offers insurances
    const[popUp2, setPopUp2] = useState(false); // No insurances offered to edit
    const photo = require(`../../Images/BrandImages/${state.username}.png`);
    console.log(photo)
    
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
        setPopUp2(false)
        Axios.post("http://localhost:3001/getOfferedInsurances", {
            username: state.username,
        })
        .then((response) => {
            console.log(response.data.redirect)
            if(response.data.redirect === "no_insurances_offered") {
                setPopUp2(true)
            } else {
                navigate('/DisplayOfferedInsurances', {state: {insuranceList: response.data, username: state.username}});
            }
            
        })
    }

    const addMorePlans = () => {
        navigate('/AddMorePlans', {state});
    }

    const deleteCustomer = () => {
        console.log("Here")
        navigate("/DeleteCustomer", {state: {username: state.username}})
    }

    return (
        
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <Row>
                <Col>
                <Container>
                <Form>
                    <div class="col-lg-6">
                    <br/>
                        <b><h1 class="display-6"> Welcome </h1></b>
                        <p class="lead text-muted mb-0">Please Select an Option Below</p>
                    </div>

                    <br/>
                    <br/>

                    <div class="col-sm">
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
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={deleteCustomer}> Delete Insurance for Customer </Button>
                        </Col>
                    </div>
                </Form>
                
                <br/>
                {popUp1 && (
                    <div class="col-sm">
                        <Alert size="sm" variant="danger">
                            An insurance is already offered. Please go to the Edit/Remove tab or Add More Plans to existing insurances tab!
                        </Alert>
                    </div>
                )}
                {popUp2 && (
                    <Alert size="lg" variant="danger">
                        No insurances offered! Please go to the Add a New Insurance tab!
                    </Alert>
                )}   
                </Container>
                </Col>
                <Col>
                <Row>
                    <div class="">
                        <div class="container py-5">
                            <div class="row h-100 align-items-center py-5">
                                <div class="col-lg-6 d-none d-lg-block">
                                    <img src={photo}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row> 
                </Col>
            </Row>
        </Container>
        
    )
}

export default FrontPage_Company;

