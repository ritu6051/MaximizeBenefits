import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import NavBar from '../Common/NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/esm/Table';

/**
 * @returns a page that has text boxes where the user must input the name, type, yearly cost, max age, 
 * plan name, and coverage of the insurance that they would like to delete from their account
 */
function DeleteMyInsurance() {
    const navigate = useNavigate();
    const {state} = useLocation();
    
    function deleteThis(insuranceName) {
        Axios.post("http://localhost:3001/deleteMyInsurance", {
            username: state.username,
            insuranceName: insuranceName
        }).then((response) => {
            if(response.data.redirect === "successfully_deleted_insurance_by_customer") {
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
                                        <td>{"$"}{val.yearlyCost}</td>
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