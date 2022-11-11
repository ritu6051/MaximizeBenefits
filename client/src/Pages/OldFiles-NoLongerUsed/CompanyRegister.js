import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';


function CompanyRegister() {
    const navigate = useNavigate();
    const[fullName, setFullName] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[userList, setUserList] = useState([]);
    const[goSignal, setGoSignal] = useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(() =>{
        Axios.get("http://localhost:3001/read").then((response)=> {
            setUserList(response.data)
        })
    },[])

    const handleOpen = () => {
        setOpen(!open);
      };

    const handleMenuOne = () => {
    // do something
    setOpen(false);
    };

    const handleMenuTwo = () => {
    // do something
    setOpen(false);
    };

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

        <label className = 'front'> Name of Company </label>
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
        <div className="dropdown">
            <button onClick={handleOpen}>Dropdown</button>
            {open ? (
            <ul className="menu">
            <li className="menu-item">
                <button onClick={handleMenuOne}>Menu 1</button>
            </li>
            <li className="menu-item">
                <button onClick={handleMenuTwo}>Menu 2</button>
            </li>
            </ul>
        ) : null}
        </div> 

        <button id = 'createAccount' onClick={createAccount}> Create Account </button>

        <Link to='/Login'>Already have an account? Click here!</Link>        
        </div>
    );
}

export default CompanyRegister;