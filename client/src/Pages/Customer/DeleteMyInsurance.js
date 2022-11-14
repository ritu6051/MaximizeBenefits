import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import NavBar from '../Common/NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DeleteMyInsurance(){
    const navigate = useNavigate();
    const{state} = useLocation();
    const[insuranceName, setInsuranceName] = useState('');
    const[planName, setPlanName] = useState('');
    const[yearlyCost, setYearlyCost] = useState('');
    // const [selectedPlan, setSelectedPlan] = useState([]);

    // const [enrollValues, setEnrollValues] = useState([{insuranceName: "", planName : "", yearlyCost: ""}])

    const no =()=>{
        navigate('/register')

    }
    const yes=()=>{
        setInsuranceName("")
        setPlanName("")
        setYearlyCost("")

        Axios.post("http://localhost:3001/deleteMyInsurance", {
            username: state.username, 
            insuranceName: insuranceName,
            planName: planName,
            yearlyCost: yearlyCost,


        })
        .then(function (response) {
        })
       
    }








    return(
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>

            <br/> 

            <Row>
                <Container>
                    <Row>
                    <Form>
                    <div class="col-md-12 text-center">
                        <br/>
                        <h3>Would you like to delete your insurance? </h3>
                    </div>

                    <br/>
                    <br/>

                    <div class="col-md-12 text-center">  
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={no}> No </Button>

                            <br/>
                            <br/>

                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={yes}> Yes  </Button>
                    
                    </div>


                    </Form>
                </Row>
                </Container>
            </Row>

        </Container>

    )

}
export default DeleteMyInsurance;