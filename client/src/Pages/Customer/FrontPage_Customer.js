import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function FrontPage_Customer() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/Login")
    }
    const find = () => {
        navigate("/FindInsurance")
    }
    const add = () => {
        navigate("/AddInsurance")
    }
    return (
        <div> 
            <h1 id='welcome'>Welcome Customer!!</h1>
            <button onClick={logout} id ='logout'> Logout </button>
            <div className = 'newAcct'> It appears you don't have insurance!</div>
            <div className = 'newAcct'>What would you like to do next?</div>
            <button onClick={find} className ='decide'> Find an Insurance for Me </button>
            {/* <button onClick={add} className ='decide'> Add my Insurance and See My Benefits </button> */ //WE DONT HAVE THIS 
            } 
        </div>
    )
}

export default FrontPage_Customer;