import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import NavBar from '../Common/NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

/**
 * @returns a redirect to the homepage with the customer removed from that company
 */
function DelteCustomer() {
    const navigate = useNavigate();
    const [customerUsername, setCustomerUsername] = useState('');
    const {state} = useLocation();
    const[popUp1, setPopUp1] = useState(false); // Customer not found
    
    const submit = () => {
        setPopUp1(false)
        
        Axios.post("http://localhost:3001/deleteCustomer", {
            insuranceCompanyUsername: state.username,
            customerUsername: customerUsername,
        })
        .then(function(response) {
            if(response.data.redirect === "successfully_unenrolled_customer") {
                navigate("/FrontPage_Company", {state: {username: state.username}})
            } else if(response.data.redirect === "no_customer_found") {
                setPopUp1(true)
            }
        })
    }
    return(
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br/>
            <Row>
                <h3>Delete This Customer's Insurance</h3>
            </Row>
            <br/>
            <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(event) => {
                        setCustomerUsername(event.target.value);
                    }} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={submit}>Delete</Button>
            </Form>
            <br/>
                {popUp1 && (
                    <div class="col-sm">
                        <Alert size="sm" variant="danger">
                            Either this customer is not enrolled in your insurance or the customer doesn't exist
                        </Alert>
                    </div>
                )}
            </Container>

        </Container>
    )
}
export default DelteCustomer;