import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function LoginSuccess() {
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
            <h1> Welcome!! You are successfully logged in. </h1>
            <button onClick={logout}> Logout </button>
        </div>
        
    )
}

export default LoginSuccess;