import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

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

    var goSignalAns = ""
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
                goSignalAns = "Not Good"
                navigate("/Login")

            } else if (response.data.redirect === 'Good'){
                goSignalAns = "Good"
                navigate("/TestR")
            }
        })
        // navigateWhereTo();
    }

    return (
        <div className="App"> 
        <h1> Maximize Benefits </h1> 

        <label> Full Name </label>
        <input 
            type="text" 
            placeholder='Enter full name'
            onChange={(event) => {
                setFullName(event.target.value);
            }}
        />

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

        <label> Role </label>
        <div>
            <input 
            type="radio" name="role" value="customer" id="c" 
            onChange={(event) => {
                setRole(event.target.value);
            }} 
            />
            <label for="c"> Customer </label>
        </div>
        <div>
            <input 
            type="radio" name="role" value="insurancecompany" id="i" 
            placeholder='Insurance Company'
            onChange={(event) => {
                setRole(event.target.value);
            }}
            />
            <label for="c"> Insurance Company </label>
        </div>

        <button onClick={createAccount}> Create Account </button>
        

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