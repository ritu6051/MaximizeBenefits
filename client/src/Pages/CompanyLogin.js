import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function CompanyLogin() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[fullName, setFullName] = useState('');
    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/")
    }
    const find = () => {
        navigate("/FindInsurance")
    }
    const add = () => {
        navigate("/AddInsurance")
    }
    return (
        <div> 
            <h1 id='welcome'>Welcome</h1>
            <button onClick={logout} id ='logout'> Logout </button>
            <div className = 'newAcct'> Which company are you from?</div>
            <input 
            type="text" 
            placeholder='Enter company name'
            onChange={(event) => {
                setFullName(event.target.value);
            }}
        />
        </div>
    )
}

export default CompanyLogin;