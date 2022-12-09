import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from '../Common/NavBar';
import Row from 'react-bootstrap/esm/Row';

/**
 * @returns homepage that displays two options to either find an insurance or view, edit, or delete 
 * an existing insurance
 */
function FrontPage_Customer() {
    
    const navigate = useNavigate();
    const {state} = useLocation();
    
    const findInsurance = () => {
        navigate('/FindInsurance', {state: {username: state.username}});
    }

    const deleteMyInsurance = () => {
        Axios.post("http://localhost:3001/getUserInsurances", {
            username: state.username
        })
        .then((response) => {
            navigate('/DeleteMyInsurance', {state: {insuranceList: response.data, username: state.username}});
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
                    <Form>
                        <div class="col-md-12 text-center">
                        <br/>
                            <h3><b>Welcome {state.username}!</b></h3>
                            <h5>What would you like to do? </h5>
                        </div>
                        <br/>
                        <br/>
                        <div class="col-md-12 text-center">  
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={findInsurance}> 
                                Find an Insurance for Me  
                            </Button>
                            <br/>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={deleteMyInsurance}> 
                                View/Edit/Delete My Insurance
                            </Button>
                        </div>    
                    </Form>
                </Container>
            </Row>
        </Container>
    )
}

export default FrontPage_Customer;
