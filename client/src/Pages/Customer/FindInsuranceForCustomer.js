import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function FindInsurance() {
    const navigate = useNavigate();
    const[budget, setBudget] = useState('');
    const[age, setAge] = useState('');
    const[popUp, setpopUp] = useState(false);
    const[userList, setUserList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [fruit, setFruit] = useState("Select a fruit")
    const test = []
    
    const findInsurances = () => {
        Axios.get("http://localhost:3001/findInsurances")
        .then((response) => {
            setUserList(response.data)
            console.log("UserList Here = " +userList)
            navigate("/TestDisplay")
        })
        // .then(function (response) {
        //     setUserList(response.data.redirect)
        //     console.log("UserList = " +response.data.redirect)
        // })
    }
    
    const selectInsurance = () => {
        //do something
        console.log("Here")
    }

    return (
        <div className="whiteBox"> 
        <h1> Please Enter Criteria </h1> 

        {/* <div className="dropdown">
            <button onClick={handleOpen}>What kind of insurance?</button>
            {open ? (
            <ul className="menu">
                <li className="menu-item">
                    <button onClick={handleMenuOne}>Health</button>
                </li>
                <li className="menu-item">
                    <button onClick={handleMenuTwo}>Dental</button>
                </li>
                <li className="menu-item">
                    <button onClick={handleMenuTwo}>Auto</button>
                </li>
            </ul>
        ) : null}
        </div>  */}

        <div className="dropdown">
        <select id = "insuranceTypeList" onClick={selectInsurance}>  
            <option> --- What kind of insurance? --- </option>  
            <option> Health </option>  
            <option> Dental </option>  
            <option> Auto </option>
        </select>  
        </div> 

        <label className = 'front'> What is your budget? (Max) </label>
        <input 
            type="number" 
            placeholder='Enter budget'
            onChange={(event) => {
                setBudget(event.target.value);
            }}
        />

        <label className = 'front'> What is your age? </label>
        <input 
            type="number" 
            placeholder='Enter age'
            onChange={(event) => {
                setAge(event.target.value);
            }}
        />

        {/* <select id = "insuranceTypeList" onClick={selectInsurance}>  
            <option> --- What kind of insurance? --- </option>
            {userList.map(function(element){
                <option> {element} </option>
            })};
        </select>   */}

        <div className="dropdown">
        <select id = "insuranceTypeList" onClick={selectInsurance}>  
            <option> --- What kind of insurance? --- </option>  
            {
                userList.map((val) => {
                    <option key={val}> {val + " "} </option>
                })
            }
        </select>  
        </div> 

        <button id='next' onClick={findInsurances}> Next </button>
        </div>
    );
}

export default FindInsurance;