import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[popUp1, setPopUp1] = useState(false); // User does not exist, can't login
    const[popUp2, setPopUp2] = useState(false); // User exists, incorrect password

    const loginAccount = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        })
        .then(function (response) {
            if (response.data.redirect === "login_customer_successfully") {
                setPopUp1(false)
                setPopUp2(false)
                navigate("/FrontPage_Customer")
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
        <div className="whiteBox"> 
        <h1> Maximize Benefits </h1> 

        <label className = 'front'> Username </label>
        <input 
            type="text" 
            placeholder='Enter username'
            onChange={(event) => {
                setUsername(event.target.value);
            }}
        />

        <label className = 'front'> Password </label>
        <input 
            type="text" 
            placeholder='Enter password'
            onChange={(event) => {
                setPassword(event.target.value);
            }}
        />

        {popUp1 && (
            <p id='pop'>User does not exist</p>
        )}

        {popUp2 && (
            <p id='pop'> Incorrect Password! Try Again! </p>
        )}
        
        <button id='login' onClick={loginAccount}> Login </button>
        
        <Link to='/Register'>Don't have an account? Register here!</Link>
        </div>
        
        
    );
}

export default Login;