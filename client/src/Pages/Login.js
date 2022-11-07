import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[goSignal, setGoSignal] = useState('');
    const[popUp, setpopUp] = useState(false);
    const[popUpPassword, setpopUpPassword] = useState(false);

    const loginAccount = () => {
        console.log(username + " inside login account")
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        })
        .then(function (response) {
            
            if (response.data.redirect === 'GoodCustomer') {
                navigate("/LoginSuccessCustomer")
            } else if (response.data.redirect === 'GoodCompany') {
                navigate("/LoginSuccessCompany")
            } else if (response.data.redirect === 'NotGood'){
                console.log("Here")
                navigate("/Login") 
                setpopUp(!popUp)
            } else if (response.data.redirect === 'IncorrectPassword'){
                navigate("/Login") 
                setpopUpPassword(!popUpPassword)
            } else if(response.data.redirect === "Good") {
                console.log("Here")
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

        {popUp && (
            <p id='pop'>User does not exist</p>
        )}

        {popUpPassword && (
            <p id='pop'> Incorrect Password! Try Again! </p>
        )}
        

        <button id='login' onClick={loginAccount}> Login </button>
        </div>
    );
}

export default Login;