import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Axios from 'axios';

import NavBar from '../Common/NavBar';
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

    const loginAccount = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        })
        .then(function (response) {
            if (response.data.redirect === "login_customer_successfully") {
                setPopUp1(false)
                setPopUp2(false)
                navigate('/FrontPage_Customer', {state: {username: username}});
            } else if (response.data.redirect === 'login_company_successfully') {
                setPopUp1(false)
                setPopUp2(false)
                navigate("/FrontPage_Company", {state: {username: username}});
            } else if (response.data.redirect === 'user_does_not_exist') {
                setPopUp1(true)
                setPopUp2(false)
                navigate("/Login")
            } else if (response.data.redirect === 'incorrect_password') {
                setPopUp1(false)
                setPopUp2(true)
                navigate("/Login")
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
                        <p> Incorrect Password! Try Again! </p>
                    </Alert>
                )}

                <Link to='/Register'>Don't have an account? Register here!</Link>
            </Container>
        </Container>
    );
}
export default Login;