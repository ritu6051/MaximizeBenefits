import React, { useState, useEffect } from 'react';
import NavBar from '../Common/NavBar';
import LoginForm from './LoginForm';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';



function Login() {


    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>

            <br />

            <Row>
                <h3> Login </h3>
            </Row>

            <br />

            <Row>
                <LoginForm></LoginForm>
            </Row>
        </Container>

    );
}

export default Login;