import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const[fullName, setFullName] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[userList, setUserList] = useState([]);
    const[goSignal, setGoSignal] = useState('');

    useEffect(() =>{
        Axios.get("http://localhost:3001/read").then((response)=> {
            setUserList(response.data)
        })
    },[])

    const createAccount = () => {
        console.log(username + " inside create account")
        Axios.post("http://localhost:3001/insert", {  
            fullName: fullName,
            username: username,
            password: password, 
        })
        .then(function (response) {
            if (response.data.redirect === 'NotGood') {
                navigate("/Login")

            } else if (response.data.redirect === 'Good'){
                navigate("/LoginSuccess")
            }
        })
    }

    return (
        <div className="whiteBox"> 
        <h1 className = 'mainTitle'> Maximize Benefits </h1> 

        <label className = 'front'> Full Name </label>
        <input 
            type="text" 
            placeholder='Enter full name'
            onChange={(event) => {
                setFullName(event.target.value);
            }}
        />

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
             

        <button id = 'createAccount' onClick={createAccount}> Create Account </button>

        <Link to='/Login'>Already have an account? Click here!</Link>        
        </div>
    );
}

export default Register