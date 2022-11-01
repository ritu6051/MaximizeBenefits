import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[goSignal, setGoSignal] = useState('');

    const loginAccount = () => {
        console.log(username + " inside login account")
        Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,    
        })
        .then(function (response) {
            if (response.data.redirect === 'NotGood') {
                navigate("/LoginSuccess")

            } else if (response.data.redirect === 'Good'){
                navigate("/Login")
            }
        })
        // navigateWhereTo();
    }

    return (
        <div className="App"> 
        <h1> Maximize Benefits </h1> 

        <h3> Username already exists, please login!</h3>

        <label> Username </label>
        <input 
            type="text" 
            placeholder='Enter username'
            onChange={(event) => {
                setUsername(event.target.value);
            }}
        />

        <label> Password </label>
        <input 
            type="text" 
            placeholder='Enter password'
            onChange={(event) => {
                setPassword(event.target.value);
            }}
        />

        <button onClick={loginAccount}> Login </button>
        

        {/* <h1>User List </h1>
        { userList.map((val,key) => {
            return(
            <div key = {key}>
                {"Username: "} {val.username} {" "} 
                <div>
                {"Role: "} {val.role} {" "}
                </div>
            </div>
        );
        })} */}
        </div>
    );
}

export default Login;