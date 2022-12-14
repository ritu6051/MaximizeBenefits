import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Axios from 'axios';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

/**
 * @returns Login page with text boxes for a user to enter their username and password, 
 * displays pop ups when the user does not exist or if the inputted password is not correct
 */
function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [popUp1, setPopUp1] = useState(false); // User does not exist, can't login
    const [popUp2, setPopUp2] = useState(false); // User exists, incorrect password
    const [popUp3, setPopUp3] = useState(false); // Empty fields

    const loginAccount = () => {
        setPopUp1(false)
        setPopUp2(false)
        setPopUp3(false)

        if(!username || !password) {
            setPopUp3(true)
        } else {
            Axios.post("http://localhost:3001/login", {
                username: username,
                password: password,
            })
            .then(function (response) {
                if (response.data.redirect === "login_customer_successfully") {
                    navigate('/FrontPage_Customer', {state: {username: username}});
                } else if (response.data.redirect === 'login_company_successfully') {
                    navigate("/FrontPage_Company", {state: {username: username}});
                } else if (response.data.redirect === 'user_does_not_exist') {
                    setPopUp1(true)
                } else if (response.data.redirect === 'incorrect_password') {
                    setPopUp2(true)
                }
            })
        }
    }

    return (
        <Container>
            <Row>
            <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
                <div class="container"><a href="#" class="navbar-brand d-flex align-items-center"><strong>MaximizeBenefits</strong></a>
                <div id="navbarSupportedContent" class="collapse navbar-collapse">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item active">
                            <a href="AboutUs" class="nav-link font-italic"> About Us </a>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
            </Row>
            <br/>
            <Row>
                <h3> Login </h3>
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

                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }} />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={loginAccount}>
                        Login
                    </Button>
                </Form>
                
                <br/>

                {popUp1 && (
                    <Alert variant="danger">
                        User does not exist <Link to='/Register'><b>here</b></Link> to Register.
                    </Alert>
                )}

                {popUp2 && (
                    <Alert variant="danger">
                        Incorrect Password! Try Again!
                    </Alert>
                )}

                {popUp3 && (
                    <Alert variant="danger">
                        Please enter all fields!
                    </Alert>
                )}

                <Link to='/Register'>Don't have an account? Register here!</Link>
            </Container>
        </Container>
    );
}
export default Login;