import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import NavBar from '../Common/NavBar';

function TestDisplay() {
    const navigate = useNavigate();
    const{state} = useLocation();

    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/>
            <Row>
            <Container>
                <h1> List of Insurances </h1>
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
                                <td> Enroll in this</td>
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
