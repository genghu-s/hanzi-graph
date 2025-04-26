import { Form, Col, FloatingLabel, Row } from "react-bootstrap";
import HanziGraph from "../components/HanziGraph";
import { useState } from "react";

const SearchByHops = () => {
    return (
        <>
            <div>
            <Row className="g-2">
                <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Enter 1 or More Chinese Charaters">
                    <Form.Control type="text" placeholder="Search" />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Hops"
                    >
                    <Form.Select aria-label="Hops">
                        <option>Select Hops</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            </div>
            
        </>
    );
};

export default SearchByHops;