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

    useEffect(() =>{
        Axios.get("http://localhost:3001/read").then((response)=> {
            setUserList(response.data)
        })
    },[])

    // useEffect(() =>{
    //     Axios.get("http://localhost:3001/getGoSignal").then((response)=> {
    //         setGoSignal(response.data)
    //     })
    //     console.log("Inside useEffect" +goSignal)
    // },'')

    // const navigateWhereTo = () => {
    //     console.log("Inside create Account, before if " +goSignal+ " here")
    //     if(goSignal === "Good") {
    //         console.log("Inside if statement, before navigate")
    //         navigate("/TestR")
    //     }
    //     else if(goSignal === "NotGood"){
    //         navigate("/Login")
    //     }
    // }

    // var goSignalAns = ""
    const createAccount = () => {
        console.log(username + " inside create account")
        Axios.post("http://localhost:3001/insert", {
        fullName: fullName,
        username: username,
        password: password,    
        role: role,
        })
        .then(function (response) {
            if (response.data.redirect === 'NotGood') {
                // goSignalAns = "Not Good"
                navigate("/Login")

            } else if (response.data.redirect === 'Good'){
                // goSignalAns = "Good"
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

        <label className = 'front'> Role </label>
        <div className = 'text'>
            <label className = 'roleNames'>
                <input type="radio" name="role" value="customer" 
                onChange={(event) => {
                    setRole(event.target.value);
                }} 
                />
            </label>
            <label className = 'roleNames' id = 'b'>Customer</label>

        </div>
        <div className = 'text'>
            <label className = 'roleNames'>
                <input  type="radio" name="role" value="insurancecompany"
                onChange={(event) => {
                    setRole(event.target.value);
                }}
                />
            </label>
            <label className = 'roleNames' id = 'b'>Insurance Company</label>
        </div>
             

        <button id = 'createAccount' onClick={createAccount}> Create Account </button>

        <Link to='/Login'>Already have an account? Click here!</Link>        

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

export default Register