import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  // const[foodName, setFoodName] = useState('');
  // const[foodAge, setFoodAge] = useState(0);

  const[fullName, setFullName] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[role, setRole] = useState('');
  const[userList, setUserList] = useState([]);

  useEffect(() =>{
    Axios.get("http://localhost:3001/read").then((response)=> {
      setUserList(response.data)
    })

  },[])

  const createAccount = () => {
    Axios.post("http://localhost:3001/insert", {
      fullName: fullName,
      username: username,
      password: password,    
      role: role,
    });
  }

  return (
    <div className="App"> 
      <h1> Maximize Benefits </h1> 

      <label> Full Name </label>
      <input 
        type="text" 
        onChange={(event) => {
          setFullName(event.target.value);
        }}
      />

      <label> Username </label>
      <input 
        type="text" 
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <label> Password </label>
      <input 
        type="text" 
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <label> Role </label>
      <div>
        <input 
          type="radio" name="role" value="customer" id="c" 
          onChange={(event) => {
            setRole(event.target.value);
          }} 
        />
      </div>
      <div>
        <input 
          type="radio" name="role" value="insurancecompany" id="i" 
          onChange={(event) => {
            setRole(event.target.value);
          }}
        />
      </div>

      <button onClick={createAccount}> Create Account </button>

      <h1>User List </h1>
      { userList.map((val,key) => {
        return(
          <div key = {key}>
            {"Username: "} {val.username} {" "} 
            <div>
              {"Role: "} {val.role} {" "}
            </div>
        </div>
      );
    })}

    </div>
  );
}

export default App;
