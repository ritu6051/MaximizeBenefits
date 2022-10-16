import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setvehicleModel] = useState("");

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      vehicleMake: vehicleMake,
      vehicleModel: vehicleModel,
    });
  };

  return (
    <div className="App">
      <h1>Register Vehicle</h1>
      <label>Vehicle Make</label>
      <input type="text" onChange={(event) => {
        setVehicleMake(event.target.value);
      }}
      />
      <label>Vehicle Model</label>      
      <input type="text" onChange={(event) => {
        setvehicleModel(event.target.value);
      }}
      />
      <button onClick={addToList}>Add To List</button>
    </div>
  );
}

export default App;
