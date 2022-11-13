import NavBar from '../Common/NavBar';
import BrandImage from './BrandImage';
import RegistrationForm from './RegistrationForm';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

function Register() {


    return (
        <Container>

                <Row>
                    <NavBar></NavBar>
                </Row>

                <br />

                <Row>
                    <Col>
                        <BrandImage></BrandImage>
                    </Col>
                    <Col>
                        <RegistrationForm></RegistrationForm>
                    </Col>
                </Row>

        </Container>
    );
}

export default Register;