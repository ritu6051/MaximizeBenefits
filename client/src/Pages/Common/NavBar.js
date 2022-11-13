import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../../Images/logo.png'
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function NavBar() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logout = () => {
    setUsername("")
    setPassword("")
    navigate("/Login")
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Maximize Benefits
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Login</Nav.Link>
          <Nav.Link href="#features">Register</Nav.Link>
          <Nav.Link href="#pricing">About Us</Nav.Link>
        </Nav>

        <Nav className="justify-content-end">
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
}

export default NavBar;