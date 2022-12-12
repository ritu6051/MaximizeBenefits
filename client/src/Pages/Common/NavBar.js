import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../../Images/logo.png'
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * @returns the navigation bar at the top of the page with the logo, name, about us,
 * login, and register redirects 
 */
function NavBar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/AboutUs")
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
        <div class="container"><a href="#" class="navbar-brand d-flex align-items-center"><strong>MaximizeBenefits</strong></a>
            <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item active">
                      <a onClick={logout} class="nav-link font-italic"> Logout </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default NavBar;