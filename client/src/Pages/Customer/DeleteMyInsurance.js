import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import NavBar from '../Common/NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/esm/Table';

function DeleteMyInsurance(){
    const navigate = useNavigate();
    const{state} = useLocation();
    const[insuranceName, setInsuranceName] = useState('');
    const[planName, setPlanName] = useState('');
    const[yearlyCost, setYearlyCost] = useState('');
    const[insuranceList, setInsuranceList] = useState([]);


    function deleteThis(insuranceName) {
        Axios.post("http://localhost:3001/deleteMyInsurance", {
            username: state.username,
            insuranceName: insuranceName
        }).then((response) => {
            if(response.data.redirect === "successfully_deleted_insurance_by_customer") {
                console.log(response.data.redirect)
                navigate("/FrontPage_Customer", {state: {insuranceList: state.insuranceList, username: state.username}});
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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th> Insurance Name </th>
                                <th> Insurance Type </th>
                                <th> Plan Name </th>
                                <th> Yearly Cost </th>
                                <th> Coverage Details </th>
                                <th> Delete This </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            state.insuranceList.enrolledIn.map((val, key) => {    
                                return (
                                    <>
                                    <tr>
                                        <td>{val.insuranceName}</td>
                                        <td>{val.insuranceType}</td>
                                        <td>{val.planName}</td>
                                        <td>{val.yearlyCost}</td>
                                        <td> 
                                            {
                                                val.coverages.map((val, key) => {
                                                    return (
                                                        <div>{val.coverageName}{": $"}{val.coverageAmount}</div>
                                                    )
                                                })
                                            }
                                            </td>
                                            <td>
                                                <Button variant="primary" type="button" 
                                                onClick={() => deleteThis(val.insuranceName)}>
                                                    Delete
                                                </Button>   
                                            </td>
                                        </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            </Row>
        </Container>
    )
}

export default DeleteMyInsurance;