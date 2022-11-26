import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import NavBar from '../Common/NavBar';
import Button from 'react-bootstrap/Button';

function DisplayOfferedInsurances() {
    const navigate = useNavigate();
    const{state} = useLocation();

    const [selectedInsuranceName, setSelectedInsuranceName] = useState('');
    const [selectedPlanName, setSelectedPlanName] = useState('');
    const [selectedYearlyCost, setSelectedYearlyCost] = useState('');
    const [offeredInsurancesList, setOfferedInsurancesList] = useState([]);
    
    function editThis(val1, val2, val3) {
        console.log(val1)
        navigate('/EditBenefits', {state: {insurance: val1, val2: val2, val3: val3, username: state.username}});
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
                <br/>

                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Insurance Name </th>
                        <th> Insurance Type </th>
                        <th> Plan Details </th>
                        {/* <th> Yearly Cost </th>
                        <th> Age </th> */}
                        <th> Coverage Details </th>
                        <th> Edit This </th>
                    </tr>
                </thead>
                <tbody>
                { state.insuranceList.map((val1,key) => {
                    return (
                    <>
                    <tr>
                        <td><b>{val1.insuranceName}</b></td>
                        <td>{val1.insuranceType}</td>
                        
                        { val1.plans.map((val2, key2) => {
                            return (
                                <div> 
                                    <thead>
                                        <th> Plan Name </th>
                                        <th> Yearly Cost </th>
                                        <th> Age </th>
                                    </thead>
                                    <tbody>
                                        <td> {val2.planName} </td>
                                        <td> {val2.yearlyCost} </td>
                                        <td> {val2.age} </td>
                                    </tbody>
                                </div>
                            )})
                        }

                        
                        
                        {/* <td>
                        { val1.plans.map((val2, key2) => {
                            return (
                                <div> 
                                    {val2.planName}
                                </div>
                            )})
                        }
                        </td>  
                        <td>
                        { val1.plans.map((val2, key2) => {
                            return (
                                <div> {val2.yearlyCost} </div>
                            )})
                        }
                        </td>  
                        <td>
                        { val1.plans.map((val2, key2) => {
                            return (
                                <div> {val2.age} </div>
                            )})
                        }
                        </td>  */}
                        <td>
                        {
                            val1.plans.map((val2, key2) => {
                                return (
                                    val2.coverages.map((val3, key3) => {
                                        return (
                                        <div> 
                                            <tr>
                                                <td>
                                                    {val3.coverageName}{": $"}{val3.coverageAmount} {" "}
                                                </td>
                                                {/* <td>
                                                    <Button variant="secondary" type="button" size="sm"
                                                    onClick={() => enrollInThis(val1.insuranceName, val1.insuranceType, val2.planName, val2.yearlyCost, val2.coverages)}>
                                                    Edit
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button variant="secondary" type="button" size="sm"
                                                        onClick={() => enrollInThis(val1.insuranceName, val1.insuranceType, val2.planName, val2.yearlyCost, val2.coverages)}>
                                                        Delete
                                                    </Button>
                                                </td> */}
                                            </tr>
                                        </div>
                                        )
                                    })
                                )
                            })
                        }
                        </td>   
                        <td>
                            
                            <Button variant="primary" type="button" 
                                onClick={() => editThis(val1, val2.planName, val3.coverageName)}>
                                Edit
                            </Button>   
                            
                        </td>         
                    </tr>          
                    </>
                    );
                })
                }
                </tbody>
                </Table>
            </Container>
            </Row>
        </Container>   
    )
}

export default DisplayOfferedInsurances;