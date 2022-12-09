import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Axios from 'axios';

import NavBar from '../Common/NavBar';
import BrandImage from '../Common/BrandImage';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

/**
 * @returns Register page with text boxes for a user to enter their full name, username,
 * password, password again, and role (customer or insurance company), displays pop up if
 * the user already exists and if the passwords don't match
 */
function Register() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [role, setRole] = useState('');
    const [popUp1, setPopUp1] = useState(false); // Username already exists, can't create account
    const [popUp2, setPopUp2] = useState(false); // Passwords do not match

    const createAccount = () => {
        Axios.post("http://localhost:3001/register", {
            fullName: fullName,
            username: username,
            password: password,
            passwordAgain: passwordAgain,
            role: role,
        })
        .then(function (response) {
            console.log("Redirect msg inside Register.js = " + response.data.redirect)
            if (response.data.redirect === 'username_already_exists') {
                setPopUp1(true)
                setPopUp2(false)
                navigate("/Register")
            } else if (response.data.redirect === "login_customer_successfully") {
                setPopUp1(false)
                setPopUp2(false)
                navigate("/FrontPage_Customer")
            } else if (response.data.redirect === "login_company_successfully") {
                setPopUp1(false)
                setPopUp2(false)
                navigate("/FrontPage_Company")
            } else if (response.data.redirect === "passwords_do_not_match") {
                setPopUp1(false)
                setPopUp2(true)
                navigate("/Register")
            }
        })
    }
    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/>
            <Row>
                <Col>
                    <BrandImage></BrandImage>
                </Col>
                <Col>
                    <Container>
                        <Form>
                            <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Full Name"
                                onChange={(event) => {
                                    setFullName(event.target.value);
                                }} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPasswordAgain">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat Password"
                                onChange={(event) => {
                                    setPasswordAgain(event.target.value);
                                }} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSelectRole">
                            <Form.Label>Select Your Role</Form.Label>
                            <Form.Check
                                type="radio"
                                value="customer"
                                label="Customer"
                                name="nameSelectRole"
                                onChange={(event) => {
                                    setRole(event.target.value);
                                }} />
                            <Form.Check
                                type="radio"
                                value="insurancecompany"
                                label="Insurance Company"
                                name="nameSelectRole"
                                onChange={(event) => {
                                    setRole(event.target.value);
                                }} />
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={createAccount}>
                                Create Account
                            </Button>
                        </Form>
                        
                        <br/>

                        {popUp1 && (
                            <Alert variant="danger"> 
                                Username already exists, click <Link to='/Login'><b>here</b></Link> to login.
                            </Alert>
                        )}

                        {popUp2 && (
                            <Alert variant="danger"> 
                                <p> Passwords do not match, try again! </p>
                            </Alert>
                        )}
                        
                        <Link to='/Login'>Already have an account? Click here!</Link>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;