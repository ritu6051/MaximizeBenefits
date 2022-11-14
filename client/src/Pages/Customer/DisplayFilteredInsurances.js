import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import NavBar from '../Common/NavBar';
import Button from 'react-bootstrap/Button';

function TestDisplay() {
    const navigate = useNavigate();
    const{state} = useLocation();
    const [selectedInsuranceName, setSelectedInsuranceName] = useState('');
    const [selectedPlanName, setSelectedPlanName] = useState('');
    const [enrollValues, setEnrollValues] = useState([{insuranceName: "", planName : ""}])

    function enrollInThis(insuranceName, planName) {
        setSelectedInsuranceName(insuranceName)
        setSelectedPlanName(planName)
        setEnrollValues({insuranceName: selectedInsuranceName, planName: selectedPlanName})
        console.log(insuranceName)
        console.log(planName)
        console.log("Username = " +state.username)
    }

    Axios.post("http://localhost:3001/addInsuranceToUser", {
        selectedInsuranceName: selectedInsuranceName,
        selectedPlanName: selectedPlanName,
        username: state.username,
        enrolledIn: enrollValues
    }).then((response) => {
        console.log("Display Filtered + "+response.username)
    })

    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/>
            <Row>
            <Container>
                <h1> List of Insurances </h1>
                {console.log(state.username)}
                <br/>

                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Insurance Name </th>
                        <th> Insurance Type </th>
                        <th> Plan Name </th>
                        <th> Yearly Cost </th>
                        <th> Coverage Details </th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.insuranceList.map((val,key) => {
                        if(Number(val.plans.yearlyCost) <= state.budget && Number(val.plans.age) <= state.maxAge) { 
                            return (
                                <tr>
                                    <td><b>{val.insuranceName}</b></td>
                                    <td>{val.insuranceType}</td>
                                    <td>{val.plans.planName}</td>
                                    <td>{"$"}{val.plans.yearlyCost}</td>
                                
                                    <td>
                                    {
                                        val.plans.coverages.map((val, key) => {
                                            return (
                                                <div>{val.coverageName}{": $"}{val.coverageAmount}</div>
                                            )
                                        })
                                    }
                                    </td>
                                    <td>
                                        <Button variant="primary" type="button" 
                                            onClick={() => enrollInThis(val.insuranceName, val.plans.planName)}>
                                            Enroll
                                        </Button>   
                                    </td>
                                </tr>          
                            );
                        }
                    })
                }
                </tbody>
                </Table>
            </Container>
            </Row>
        </Container>
        
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
