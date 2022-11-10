import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function DisplayInsurances() {
    const navigate = useNavigate();
    const[insuranceType, setInsuranceType] = useState('');
    const[insuranceName, setInsuranceName] = useState('');
    const[cost, setCost] = useState('');
    const[Age, setAge] = useState('');
    const[Offerings, setOfferings] = useState('');
    const[userList, setUserList] = useState([]);

    useEffect(() =>{
    Axios.get("http://localhost:3001/print").then((response)=> {
      setUserList(response.data)
    })
    },[])

    return(
        <div>
            <h1>User List</h1>
            { userList.map((val,key) => {
            return(
            <div key = {key}>
                {"Insurance Type: "} {val.insuranceType} {" "} 
                {"Cost: "} {val.cost} {" "}
            </div>
            );
            })}
        </div>
    )
}

export default DisplayInsurances;






//   return(
    // <>
        
         
    {/* </> */}
//   )