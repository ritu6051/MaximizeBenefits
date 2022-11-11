import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

function TestDisplay() {
    const navigate = useNavigate();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[popUp1, setPopUp1] = useState(false); // User does not exist, can't login
    const[popUp2, setPopUp2] = useState(false); // User exists, incorrect password
    const[userList, setUserList] = useState([]);

    const loginAccount = () => {
        Axios.get("http://localhost:3001/testDisplay", {})
        .then(function (response) {
            setUserList(response.data)
            console.log("Here inside TestDisplay")
            console.log(userList[1].fullName + "here")
        })
    }
    
    return (
        
        <div>
            <button id='login' onClick={loginAccount}> Login </button>
        
        <div class="table-data">
            
        <table border="1" >
            <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Role</th>
            </tr>
        {
            // userList.forEach(function(data) {
            //         <tr>
            //     {/* <td>{data[1].fullName}</td> */}
            //     <td>{userList[0].username}</td>
            //     {/* <td>{userList[1].role}</td> */}
            //     </tr>  
            // })

            userList.map((val, key) => {
                return (
                    <tr>
                    <td>{val.fullName}</td>
                    <td>{val.username}</td>
                    <td>{val.role}</td>
                    </tr>
                )
                
                
                
            })


        }
        </table>
        </div>
        </div>
    );
}

export default TestDisplay;