import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import NavBar from '../Common/NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DelteCustomer(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const{state} = useLocation();
    const[insuranceName, setInsuranceName] = useState('');
    const[planName, setPlanName] = useState('');
    const[yearlyCost, setYearlyCost] = useState('');
    

    const submit =()=>{
        setInsuranceName("")
        setPlanName("")
        setYearlyCost("")

        Axios.post("http://localhost:3001/deleteCustomer", {
            username: username,
            insuranceName: insuranceName,
            planName: planName,
            yearlyCost: yearlyCost, 
        })
        .then(function (response) {
            
            navigate("/FrontPage_Company")
        })

    }



    return(
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/>
            <Row>
                <h3>Delete A Customer</h3>
            </Row>
            <br/>
            <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={submit}>Login</Button>
            </Form>

            </Container>

        </Container>
    )
}
export default DelteCustomer;