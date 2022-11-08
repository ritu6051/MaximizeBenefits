import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function FindInsurance() {
    const navigate = useNavigate();
    const[budget, setBudget] = useState('');
    const[age, setAge] = useState('');
    const[popUp, setpopUp] = useState(false);
    const [open, setOpen] = React.useState(false);

    const nextPage = () => {
        // do something
    }
    
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

    return (
        <div className="whiteBox"> 
        <h1> Please Enter Criteria </h1> 

        <div className="dropdown">
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

        <button id='next' onClick={nextPage}> Next </button>
        </div>
    );
}

export default FindInsurance;