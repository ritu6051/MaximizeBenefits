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
            if(response.data.redirect === "added_insurance_to_user") {
                navigate("/FrontPage_Customer", {state});
            }
        })
    }

    const no =()=>{
        navigate('/FrontPage_Customer')

    }
    const yes=()=>{
        setInsuranceName("")
        setPlanName("")
        setYearlyCost("")

        
        // Axios.post("http://localhost:3001/deleteMyInsurance", {
        //     username: state.username, 
        //     insuranceName: insuranceName,
        //     planName: planName,
        //     yearlyCost: yearlyCost,
        // })
        // .then(function (response) {
            
        //     navigate("/FrontPage_Customer")
        // })
       
    }
    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/> 
            <Row>
                <Container>
                    <h1> Which insurance would you like to delete?</h1>
                    {/* {state.username}
                    {' '}
                    {state.insuranceList.username}
                    {' '}
                    {state.insuranceList.role}
                    {' '}
                    {state.insuranceList.enrolledIn[0].insuranceName}
                    {' '}
                    {state.insuranceList.enrolledIn[0].planName} */}
                </Container>
            </Row>
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
                                <th> here{state.insuranceList.enrolledIn}there </th>
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