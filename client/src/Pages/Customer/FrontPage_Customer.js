import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from '../Common/NavBar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function FrontPage_Customer() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/Login")
    }
    const find = () => {
        navigate("/FindInsurance")
    }
    const add = () => {
        navigate("/AddInsurance")
    }
    return (
        <Container>
            <Row>
                <NavBar></NavBar>
            </Row>
            <br />

            <Row>
                <Container>
                    <Form>
                    <div class="col-md-12 text-center">
                    <br/>
                        <h3>Welcome Customer !</h3>
                        <h5>It appears that you don't have insurance!</h5>
                        <h5>Would you like to enroll into an Insurance?</h5>
                    </div>

                    <br/>
                    <br/>

                    <div class="col-md-12 text-center">
                            
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={find}> Find an Insurance for Me  </Button>

                            
                        </div>
                        

                    </Form>
                </Container>
            </Row>
        </Container>

    )
}

export default FrontPage_Customer;

{/* <div>
    <h1 id='welcome'>Welcome Customer!!</h1>
    <button onClick={logout} id='logout'> Logout </button>
    <div className='newAcct'> It appears you don't have insurance!</div>
    <div className='newAcct'>What would you like to do next?</div>
    <button onClick={find} className='decide'> Find an Insurance for Me </button>
</div> */}