import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function FindInsurance() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[goSignal, setGoSignal] = useState('');
    const[popUp, setpopUp] = useState(false);
    const [open, setOpen] = React.useState(false);

    const nextPage = () => {
        // console.log(username + " inside login account")
        // Axios.post("http://localhost:3001/login", {
        // username: username,
        // password: password,    
        // })
        // .then(function (response) {
        //     console.log(response.data.redirect)
        //     if (response.data.redirect === 'Good') {
        //         navigate("/LoginSuccess")

        //     } else if (response.data.redirect === 'NotGood'){
        //         navigate("/Login") 
        //         setpopUp(!popUp)
        //     }
        // })
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

        <button id='next' onClick={nextPage}> Next </button>
        </div>
    );
}

export default FindInsurance;