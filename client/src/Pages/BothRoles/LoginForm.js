import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function LoginForm() {
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
                navigate("/FrontPage_Company")
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

        // {popUp1 && (
        //     <p id='pop'>User does not exist</p>
        // )}

        // {popUp2 && (
        //     <p id='pop'> Incorrect Password! Try Again! </p>
        // )}

        // <button id='login' onClick={loginAccount}> Login </button>

        // <Link to='/Register'>Don't have an account? Register here!</Link>
        // </div>
    );
}

export default LoginForm;