import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation} from 'react-router-dom';
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
    const{state} = useLocation();
    
    const logout = () => {
        setUsername("")
        setPassword("")
        navigate("/Login")
    }
    const find = () => {
        // navigate("/FindInsurance")
        navigate('/FindInsurance', {state});
    }

    const deleteMyInsurance = () => {
        // navigate("/FindInsurance")
        Axios.post("http://localhost:3001/getUserInsurances", {
            username: state.username
        })
        .then((response) => {
            console.log(response.data)
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
                            {/* <h5>It appears that you don't have insurance!</h5> */}
                            {/* <h5>Would you like to enroll into an Insurance?</h5> */}

                            <h5>What would you like to do? </h5>
                        </div>

                        <br/>
                        <br/>

                        <div class="col-md-12 text-center">  
                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={find}> Find an Insurance for Me  </Button>

                            <br/>
                            <br/>

                            <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={deleteMyInsurance}> Delete My Insurance  </Button>


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



// import React, { useState } from 'react';
// import { useNavigate, useLocation} from 'react-router-dom';
// import Container from 'react-bootstrap/esm/Container';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import NavBar from '../Common/NavBar';
// import Row from 'react-bootstrap/esm/Row';
// import Col from 'react-bootstrap/esm/Col';

// function FrontPage_Customer() {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const{state} = useLocation();
//     console.log(state.username)
//     const logout = () => {
//         setUsername("")
//         setPassword("")
//         navigate("/Login")
//     }
//     const find = () => {
//         // navigate("/FindInsurance")
//         navigate('/FindInsurance', {state});
//     }
//     const add = () => {
//         navigate("/AddInsurance")
//     }
//     return (
//         <Container>
//             <Row>
//                 <NavBar></NavBar>
//             </Row>
            
//             <br/>

//             <Row>
//                 <Container>
//                     <Form>
//                         <div class="col-md-12 text-center">
//                         <br/>
//                             <h3>Welcome Customer !</h3>
//                             <h5>It appears that you don't have insurance!</h5>
//                             <h5>Would you like to enroll into an Insurance?</h5>
//                         </div>

//                         <br/>
//                         <br/>

//                         <div class="col-md-12 text-center">  
//                             <Button variant="secondary" size="lg" type="button" class="btn btn-secondary btn-lg btn-block" onClick={find}> Find an Insurance for Me  </Button>
//                         </div>    
//                     </Form>
//                 </Container>
//             </Row>
//         </Container>

//     )
// }

// export default FrontPage_Customer;

// {/* <div>
//     <h1 id='welcome'>Welcome Customer!!</h1>
//     <button onClick={logout} id='logout'> Logout </button>
//     <div className='newAcct'> It appears you don't have insurance!</div>
//     <div className='newAcct'>What would you like to do next?</div>
//     <button onClick={find} className='decide'> Find an Insurance for Me </button>
// </div> */}