import { Form, Col, FloatingLabel, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import drawGraph from "../g6/g6Factory";
import { AdvancedSearchProps } from "../interfaces/AdvancedSearchProps";

// eslint-disable-next-line

const SearchByHops = ({ sendDataToParent }: AdvancedSearchProps) => {
    const [inputText, setInputText] = useState('');
    const [hops, setHops] = useState(0);
    const [data, setData] = useState<{ nodes: never[]; edges: never[]; }>();

    const handleSearchByHops = async () => {
        console.log(inputText + "with hops" + hops);

        if (inputText === null || inputText === undefined || inputText.trim().length === 0) {
            alert("Please enter Chinese Characters to start!");
        }

        if (hops !== 0) {
            await drawGraph(inputText, hops)
                .then((dataFromDB: any) => setData(dataFromDB));
        } else if (inputText.length > 1) {
            await drawGraph(inputText, 2)
                .then((dataFromDB: any) => setData(dataFromDB));
        } else {
            await drawGraph(inputText, 1)
                .then((dataFromDB: any) => setData(dataFromDB));
        }
    }

    useEffect(() => {
        sendDataToParent(data);
    });

    return (
        <>
            <div>
                <Row className="justify-content-md-center">
                    <Col xs lg="3">
                        <FloatingLabel controlId="floatingInputGrid" label="Enter 1 or More Chinese Charaters">
                            <Form.Control type="text" placeholder="Search"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col xs lg="3">
                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Hops"
                        >
                            <Form.Select aria-label="Hops"
                                value={hops}
                                onChange={(e) => setHops(Number(e.target.value))}>
                                <option value="0">Select Hops</option>
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
                    <Col xs="auto">
                        <Button className="hopsBtn" variant="primary" size="lg"
                            onClick={handleSearchByHops}>Search</Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default SearchByHops;