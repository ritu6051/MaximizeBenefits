import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function FrontPage_Company() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/Login")
    }
    const addBenefits = () => {
        navigate("/AddBenefits")
    }
    const updateCustomerBenefits = () => {
        navigate("/UpdateBenefits")
    }
    const deleteCustomer = () => {
        navigate("/DeleteCustomer")
    }

    return (
        <div> 
            <h1 id='welcome'>Welcome Insurance Company !!</h1>
            <button onClick={logout} id ='logout'> Logout </button>
            {/* <div className = 'newAcct'> It appears you don't!</div> */}
            <div className = 'newAcct'>What would you like to do next?</div>
            <button onClick={addBenefits} className ='decide'> Add Benefits to your Insurance </button>
            <button onClick={updateCustomerBenefits} className ='decide'> Update Customer Benefits </button>
            <button onClick={deleteCustomer} className ='decide'> Delete Customer Insurance </button>
        </div>
    )
}

export default FrontPage_Company;