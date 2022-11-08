import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const[fullName, setFullName] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[passwordAgain, setPasswordAgain] = useState('');
    const[role, setRole] = useState('');
    const[userList, setUserList] = useState([]);
    const[popUp1, setPopUp1] = useState(false); // Username already exists, can't create account
    const[popUp2, setPopUp2] = useState(false); // Passwords do not match

    useEffect(() => {
        Axios.get("http://localhost:3001/read").then((response)=> {
            setUserList(response.data)
        })
    },[])

    const createAccount = () => {
        Axios.post("http://localhost:3001/register", {  
            fullName: fullName,
            username: username,
            password: password,
            passwordAgain: passwordAgain,
            role: role,
        })
        .then(function (response) {
            console.log("Redirect msg inside Register.js = " +response.data.redirect)
            if (response.data.redirect === 'username_already_exists') {
                setPopUp1(true)
                setPopUp2(false)
                navigate("/Register")
            } else if (response.data.redirect === "login_customer_successfully") {
                setPopUp1(false)
                setPopUp2(false)
                navigate("/FrontPage_Customer")
            } else if (response.data.redirect === "login_company_successfully") {
                setPopUp1(false)
                setPopUp2(false)
                navigate("/FrontPage_Company")
            } else if(response.data.redirect === "passwords_do_not_match") {
                setPopUp1(false)
                setPopUp2(true)
                navigate("/Register")
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

        <label className = 'front'> Enter Password </label>
        <input 
            type="text" 
            placeholder='Enter password'
            onChange={(event) => {
                setPassword(event.target.value);
            }}
        />

        <label className = 'front'> Enter Password Again </label>
        <input 
            type="text" 
            placeholder='Enter password'
            onChange={(event) => {
                setPasswordAgain(event.target.value);
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

        {popUp1 && (
            <p> Username already exists, click <Link to='/Login'><b>here</b></Link> to login </p>
        )}

        {popUp2 && (
            <p> Passwords do not match, try again! </p>
        )}

        <Link to='/Login'>Already have an account? Click here!</Link>        
        </div>
    );
}

export default Register;