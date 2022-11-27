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

    const [username, setUsername] = useState('');
    
    const [selectedInsuranceName, setSelectedInsuranceName] = useState('');
    const [selectedPlanName, setSelectedPlanName] = useState('');
    const [selectedYearlyCost, setSelectedYearlyCost] = useState('');
    const [offeredInsurancesList, setOfferedInsurancesList] = useState([]);
    
    
    function editThis(val1, val2, coverages) {
        console.log(val1.insuranceName)
        console.log(val2.planName)
        console.log(coverages[0].coverageName)
        navigate('/EditBenefits', {state: {val1: val1, val2: val2, coverages: coverages, insuranceList: state.insuranceList, username: state.username}});
    }

    function deleteThis(username, val1, val2, coverages) {
        console.log(username)
        Axios.post("http://localhost:3001/deleteOfferedInsurance", {  
            username: username,
            planName: val2.planName,
        })
        .then(function(response) {
            navigate("/FrontPage_Company", {state: {username: state.username}})
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
                <h1> List of Insurances {state.username}</h1>
                <br/>

                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Insurance Name </th>
                        <th> Insurance Type </th>
                        <th> Plan Name </th>
                        <th> Yearly Cost </th>
                        <th> Age </th>
                        <th> Coverage Details </th>
                        <th> Edit or Delete </th>
                    </tr>
                </thead>
                <tbody>
                { state.insuranceList.map((val1,key) => {
                    return (
                    <>
                        { val1.plans.map((val2, key) => {
                            return (
                                    <tr>
                                        <td><b>{val1.insuranceName}</b></td>
                                        <td>{val1.insuranceType}</td>
                                        <td>{val2.planName}</td>
                                        <td>{"$"}{val2.yearlyCost}</td>
                                        <td>{"$"}{val2.age}</td>
                                            
                                        <td>
                                            { val2.coverages.map((val3, key) => {
                                                return (
                                                    <div> {val3.coverageName}{": $"}{val3.coverageAmount} </div>
                                                )
                                            })
                                            }
                                        </td>
                                        <td>
                                            <Button variant="primary" type="button" 
                                                onClick={() => editThis(val1, val2, val2.coverages)}>
                                                Edit
                                            </Button>
                                            {' '}
                                            <Button variant="primary" type="button" 
                                                onClick={() => deleteThis(state.username, val1, val2, val2.coverages)}>
                                                Delete
                                            </Button>   
                                        </td>
                                    </tr>          
                                );
                        })
                        }
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