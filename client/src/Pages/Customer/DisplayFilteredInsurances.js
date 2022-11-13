import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';

function TestDisplay() {
    const navigate = useNavigate();
    const{state} = useLocation();

    return (
        <>
        <h1>Insurance List </h1>
        <table border="1" >
            <tr>
                <th>Insurance Name</th>
                <th>Insurance Type</th>
                <th> Plan Name </th>
                <th> Yearly Cost </th>
                <th> Coverage Details </th>
            </tr>
            { 
            state.insuranceList.map((val,key) => {
            if(Number(val.plans.yearlyCost) <= state.budget && Number(val.plans.age) <= state.maxAge) {   
                
                return (
                    <tr>
                        <td><b>{val.insuranceName}</b></td>
                        <td>{val.insuranceType}</td>
                        <td>{val.plans.planName}</td>
                        <td>{val.plans.yearlyCost}</td>

                        <td>
                        {val.plans.coverages.map((val, key) => {
                            return (
                                <div>{val.coverageName}{": $"}{val.coverageAmount}</div>
                            )
                        })}
                        </td>
                        <td> Enroll in this</td>
                    </tr>          
                );
            }
            })
        }
        </table>
        </>  
    )
}

export default TestDisplay;
{/* <div key = {key}>
{"Insurance Name: "} {val.insuranceName} {" "}
<div>
{"Type: "} {val.insuranceType} {" "}
</div> 
<div>
{"Yearly Cost: "} {val.plans.yearlyCost} {" "}
</div>
</div> */}