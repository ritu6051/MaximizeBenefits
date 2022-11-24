import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import NavBar from '../Common/NavBar';
import Button from 'react-bootstrap/Button';

function DisplayFilteredInsurances() {
    const navigate = useNavigate();
    const{state} = useLocation();
    const [selectedInsuranceName, setSelectedInsuranceName] = useState('');
    const [selectedPlanName, setSelectedPlanName] = useState('');
    const [selectedYearlyCost, setSelectedYearlyCost] = useState('');
    const [selectedCoverages, setSelectedCoverages] = useState([]);
    
    function enrollInThis(selectedInsuranceName, selectedInsuranceType, selectedPlanName, selectedYearlyCost, selectedCoverages) {
        const plans = [{insuranceName: selectedInsuranceName, insuranceType: selectedInsuranceType, planName: selectedPlanName, yearlyCost: selectedYearlyCost, coverages: selectedCoverages}]

        Axios.post("http://localhost:3001/addInsuranceToUser", {
            username: state.username,
            plans: plans
        }).then((response) => {
            if(response.data.redirect === "added_insurance_to_user") {
                navigate("/FrontPage_Customer")
            }
        })
    }

    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/>
            <Row>
            <Container>
                <h1> List of Insurances </h1>
                <h2> {state.username} </h2>
                <br/>

                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Insurance Name </th>
                        <th> Insurance Type </th>
                        <th> Plan Name </th>
                        <th> Yearly Cost </th>
                        <th> Coverage Details </th>
                        <th> Enroll In This </th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.insuranceList.map((val1,key) => {
                        return (
                            <>
                            {
                                val1.plans.map((val2, key) => {
                                    
                                    if(Number(val2.yearlyCost) <= state.budget && Number(val2.age) >= state.maxAge) { 
                                        // console.log("Insurance Name = " +val1.insuranceName)
                                        // console.log("Insurance Type = " +val1.insuranceType)
                                        // console.log("Plan Name = " +val2.planName)
                                        // console.log("Yearly Cost = " +val2.yearlyCost)
                                        // console.log("Coverage Name = " +val2.coverages[0].coverageName)
                                        return (
                                            <tr>
                                                <td><b>{val1.insuranceName}</b></td>
                                                <td>{val1.insuranceType}</td>
                                                <td>{val2.planName}</td>
                                                <td>{"$"}{val2.yearlyCost}</td>
                                            
                                                <td>
                                                {
                                                    val2.coverages.map((val3, key) => {
                                                        return (
                                                            <div>{val3.coverageName}{": $"}{val3.coverageAmount}</div>
                                                        )
                                                    })
                                                }
                                                </td>
                                                <td>
                                                    <Button variant="primary" type="button" 
                                                        onClick={() => enrollInThis(val1.insuranceName, val1.insuranceType, val2.planName, val2.yearlyCost, val2.coverages)}>
                                                        Enroll
                                                    </Button>   
                                                </td>
                                            </tr>          
                                        );
                                    }
                                })
                            }
                            </>
                        );
                    })
                }
                <tr>
                    <td> Here </td>
                </tr>
                </tbody>
                </Table>
            </Container>
            </Row>
        </Container>
        
    )
}

export default DisplayFilteredInsurances;