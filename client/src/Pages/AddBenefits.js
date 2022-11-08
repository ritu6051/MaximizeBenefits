import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function AddBenefits() {
    const navigate = useNavigate();
    const[popUp, setpopUp] = useState(false);
    const [open, setOpen] = React.useState(false);

    const addInsuranceBenefits = () => {
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

    const handleMenuThree = () => {
        // do something
        setOpen(false);
        };




    return (
        <div className="whiteBox"> 
        <h1 className = 'mainTitle'> Insurance Benefits </h1> 

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
                    <button onClick={handleMenuThree}>Auto</button>
                </li>
            </ul>
        ) : null}
        </div> 
        <label className = 'front'> Insurance Name </label>
        <input 
            type="text" 
            placeholder='Enter Insurance Name'
            // onChange={(event) => {
            //     setUsername(event.target.value);
            // }}
        />

        <label className = 'front'> Cost </label>
        <input 
            type="text" 
            placeholder='Enter Insurance Cost'
            // onChange={(event) => {
            //     setPassword(event.target.value);
            // }}
        />

        <label className = 'front'> Age </label>
        <input 
            type="text" 
            placeholder='Enter Age Range'
            // onChange={(event) => {
            //     setPassword(event.target.value);
            // }}
        />
    
        <button onClick={addInsuranceBenefits} className ='decide'> Add Benefits </button>       
        </div>

    );
}

export default AddBenefits;