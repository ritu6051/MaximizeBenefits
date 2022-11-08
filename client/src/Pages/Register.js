import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const[fullName, setFullName] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[role, setRole] = useState('');
    const[userList, setUserList] = useState([]);
    const[goSignal, setGoSignal] = useState('');
    const[popUp, setpopUp] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/read").then((response)=> {
            setUserList(response.data)
        })
    },[])

    const createAccount = () => {
        Axios.post("http://localhost:3001/insert", {  
            fullName: fullName,
            username: username,
            password: password,
            role: role,
        })
        .then(function (response) {
            if (response.data.redirect === 'NotGood') {
                navigate("/Register")
                setpopUp(!popUp)

            } else if (response.data.redirect === 'Good1'){
                navigate("/FrontPage_Customer")
            } else if (response.data.redirect === 'Good2'){
                navigate("/FrontPage_Company")
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

        <label className = 'front'> Select your Role </label>
        <div className = 'text'>
            <label className = 'roleNames'>
                <input 
                    type="radio" 
                    name="role" 
                    value="customer" 
                    onChange={(event) => {
                        setRole(event.target.value);
                    }} 
                />
            </label>
            <label className = 'roleNames' id = 'b'>Customer</label>
        </div>
        <div className = 'text'>
            <label className = 'roleNames'>
                <input 
                    type="radio" 
                    name="role"
                    value="insurancecompany"
                    onChange={(event) => {
                        setRole(event.target.value);
                    }}
                />
            </label>
            <label className = 'roleNames' id = 'b'>Insurance Company</label>
        </div>
             
        <button id = 'createAccount' onClick={createAccount}> Create Account </button>

        {popUp && (
            <p> Username already exists, click <Link to='/Login'><b>here</b></Link> to login! </p>
        )}

        <Link to='/Login'>Already have an account? Click here!</Link>        
        </div>
    );
}

export default Register;