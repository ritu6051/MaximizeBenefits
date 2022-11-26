import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from '../Common/NavBar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function FrontPage_Company() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const{state} = useLocation();

    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/Login")
    }
    const addBenefits = () => {
        navigate('/AddBenefits', {state});
    }
    const updateCustomerBenefits = () => {
        navigate("/UpdateBenefits")
    }
    const deleteCustomer = () => {
        navigate("/DeleteCustomer")
    }
    const addOrEdit = () => {
        Axios.post("http://localhost:3001/getOfferedInsurances", {
            username: state.username,
        })
        .then((response) => {
            console.log(state.username)
            console.log(response.data)
            navigate('/DisplayOfferedInsurances', {state: {insuranceList: response.data, username: state.username}});
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
                        <h3>Welcome Insurance Company !! </h3>
                        <h5>What would you like to do next?</h5>
                    </div>

                    <br/>
                    <br/>

                    <div class="col-md-12 text-center">
                        <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={addBenefits}> Add a New Insurance </Button>
                        <br/>
                        <Col>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={addOrEdit}> Edit / Remove Plans / Insurances </Button>
                        </Col>
                        <Col>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={addBenefits}> Add More Plans to Existing Insurance </Button>
                        </Col>
                        <Col>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={updateCustomerBenefits}> Update Customer Benefits </Button>
                        </Col>
                        <Col>
                            <br/>
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={deleteCustomer}> Delete Insurance for Customer </Button>
                        </Col>
                    </div>
                            
                </Form>
                </Container>
            </Row>
        </Container>
    )
}

export default FrontPage_Company;


// <div> 
// <h1 id='welcome'>Welcome Insurance Company !!</h1>
// <button onClick={logout} id ='logout'> Logout </button>
// {/* <div className = 'newAcct'> It appears you don't!</div> */}
// <div className = 'newAcct'>What would you like to do next?</div>
// <button onClick={addBenefits} className ='decide'> Add a New Insurance </button>
// <button onClick={addBenefits} className ='decide'> Add New Plans to an Existing Insurance </button>
// <button onClick={addBenefits} className ='decide'> Edit/Remove an Existing Insurance </button>
// <button onClick={updateCustomerBenefits} className ='decide'> Update Customer Benefits </button>
// {/* <button onClick={deleteCustomer} className ='decide'> Delete Customer Insurance </button> */}
// </div>