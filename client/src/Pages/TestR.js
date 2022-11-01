import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function TestR() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/")
    }
    return (
        <div> 
            <h1> Welcome!! You have successfully created an account. </h1>
            <button onClick={logout}> Logout </button>
        </div>
        
    )
}

export default TestR;