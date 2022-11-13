import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Benefit(element, index, removeFormFields, handleChange) {
    return (
        <>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formCoverageName">
                        <Form.Control
                            type="text"
                            placeholder="Coverage Name"
                            defaultValue={element.coverageName || ""}
                            onChange={e => handleChange(index, e)} />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="formCoverageAmount">
                        <Form.Control
                            type="number"
                            placeholder="Coverage Amount"
                            defaultValue={element.coverageAmount || ""}
                            onChange={e => handleChange(index, e)} />
                    </Form.Group>
                </Col>

                <Col>
                    {
                        index ?
                            <Button variant="primary" type="button" onClick={() => removeFormFields(index)}>Remove</Button>
                            : null
                    }
                </Col>

            </Row>

        </>

    );
}

export default Benefit;