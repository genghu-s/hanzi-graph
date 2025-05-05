import { Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Table } from "react-bootstrap";
import { AdvancedSearchProps } from "../interfaces/AdvancedSearchProps";
import { SearchPath } from "../interfaces/SearchPath";
import { useEffect, useState } from "react";
import getFormedData from "../g6/getFormedData";
import getResultsFromDB from "../neo4j/neo4jService";

const FindShortestPaths = ({ sendDataToParent }: AdvancedSearchProps) => {
    const [data, setData] = useState<{ nodes: never[]; edges: never[]; }>();
    const [searchPath, setSearchPath] = useState<SearchPath>(new SearchPath());
    const [recordInfo, setRecordInfo] = useState<any>();

    useEffect(() => {
        sendDataToParent(data);
    });

    const checkIfNodeIsValid = (value: any): boolean => {
        if (searchPath.nodeOne === undefined || searchPath.nodeOne.length !== 1) {
            return false;
        }

        return true;
    }

    const handleSearchShortestPath = async () => {

        if (!checkIfNodeIsValid(searchPath.nodeOne)) {
            alert("Please enter 1 Chinese character in Node 1.");
            return;
        } else if (!checkIfNodeIsValid(searchPath.nodeTwo)) {
            alert("Please enter 1 Chinese character in Node 2.");
            return;
        } else if (searchPath.nodeOne === searchPath.nodeTwo) {
            alert("Node 1 and Node 2 can not be the same. Please enter a different Chinese character.");
            return;
        }
        
        let relationshipTypes = '';

        // Build relationships
        let relationships: Array<string> = [];
        for (let key in searchPath) {
            switch (key) {
                case "isComponentOf":
                    if (searchPath.isComponentOf) {
                        relationships.push("COMPONENT_OF");
                    }
                    break;
                case "isSemanticComponentOf":
                    if (searchPath.isSemanticComponentOf) {
                        relationships.push("SEMANTIC_COMPONENT_OF");
                    }
                    break;
                case "isPictographicRadicalOf":
                    if (searchPath.isPictographicRadicalOf) {
                        relationships.push("PICTOGRAPHIC_RADICAL_OF");
                    }
                    break;
                case "isPhoneticRadicalOf":
                    if (searchPath.isPhoneticRadicalOf) {
                        relationships.push("PHONETIC_RADICAL_OF");
                    }
                    break;
                case "isInitialOf":
                    if (searchPath.isInitialOf) {
                        relationships.push("INITIAL_OF");
                    }
                    break;
                case "isFinalOf":
                    if (searchPath.isFinalOf) {
                        relationships.push("FINAL_OF");
                    }
                    break;
                case "isToneOf":
                    if (searchPath.isToneOf) {
                        relationships.push("TONE_OF");
                    }
                    break;
                case "isTransformedTo":
                    if (searchPath.isTransformedTo) {
                        relationships.push("TRANSFORMED_TO");
                    }
                    break;
            }
        }

        if (relationships.length > 0) {
            relationshipTypes = ":" + relationships[0];
        }
        for (let i = 1; i < relationships.length; i++) {
            relationshipTypes += " | " + relationships[i];
        }

        
        const queryStatement = `
            MATCH (a {name: '${searchPath.nodeOne}'}), (b {name: '${searchPath.nodeTwo}'})
            MATCH paths = allShortestPaths((a)-[${relationshipTypes}*]-(b))
            RETURN
                length(paths) AS hopCount,
                [node IN nodes(paths) | node.name] AS pathNodes,
                [rel IN relationships(paths) | type(rel)] AS pathRels, paths, a, b
        `;

        console.log(queryStatement);
        const records = await getResultsFromDB(queryStatement);
        const rawData = await getFormedData(records);
        setRecordInfo(records.records);
        setData(rawData.data);
    }

    return (
        <>
        <Container className="shortestPathSearchContainer">
            <Row className="justify-content-md-center nodeRow">
                <Col xs lg="3"><InputGroup.Text className="nodeLabel">节点 (node)</InputGroup.Text></Col>
                <Col xs lg="1">
                <Form.Label htmlFor="nodeOne">Node 1</Form.Label>
                <Form.Control id="nodeOne" type="text" placeholder=""
                    value={searchPath.nodeOne}
                    onChange={(e) => setSearchPath({...searchPath, nodeOne: e.target.value})} />
                </Col>
                <Col xs lg="1">
                <Form.Label htmlFor="nodeTwo">Node 2</Form.Label>
                <Form.Control id="nodeTwo" type="text" placeholder=""
                    value={searchPath.nodeTwo}
                    onChange={(e) => setSearchPath({...searchPath, nodeTwo: e.target.value})} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs lg="3"><InputGroup.Text>COMPONENT_OF</InputGroup.Text></Col>
                <Col xs="auto"><InputGroup.Checkbox
                    checked={searchPath.isComponentOf}
                    onChange={(e) => setSearchPath({...searchPath, isComponentOf: e.target.checked})}
                    aria-label="COMPONENT_OF" /></Col>
                <Col xs lg="1"></Col>
                <Col xs lg="3"><InputGroup.Text>SEMANTIC_COMPONENT_OF</InputGroup.Text></Col>
                <Col xs="auto"><InputGroup.Checkbox
                    checked={searchPath.isSemanticComponentOf}
                    onChange={(e) => setSearchPath({...searchPath, isSemanticComponentOf: e.target.checked})}
                    aria-label="SEMANTIC_COMPONENT_OF" /></Col>
            </Row>
            
            <Row className="justify-content-md-center">
                <Col xs lg="3"><InputGroup.Text>PICTOGRAPHIC_RADICAL_OF</InputGroup.Text></Col>
                <Col xs="auto"><InputGroup.Checkbox
                    checked={searchPath.isPictographicRadicalOf}
                    onChange={(e) => setSearchPath({...searchPath, isPictographicRadicalOf: e.target.checked})}
                    aria-label="PICTOGRAPHIC_RADICAL_OF" /></Col>
                <Col xs lg="1"></Col>
                <Col xs lg="3"><InputGroup.Text>PHONETIC_RADICAL_OF</InputGroup.Text></Col>
                <Col xs="auto"><InputGroup.Checkbox
                    checked={searchPath.isPhoneticRadicalOf}
                    onChange={(e) => setSearchPath({...searchPath, isPhoneticRadicalOf: e.target.checked})}
                    aria-label="PHONETIC_RADICAL_OF" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs lg="3"><InputGroup.Text>INITIAL_OF</InputGroup.Text></Col>
                <Col xs="auto"><InputGroup.Checkbox
                    checked={searchPath.isInitialOf}
                    onChange={(e) => setSearchPath({...searchPath, isInitialOf: e.target.checked})}
                    aria-label="INITIAL_OF" /></Col>
                <Col xs lg="1"></Col>
                <Col xs lg="3"><InputGroup.Text>FINAL_OF</InputGroup.Text></Col>
                <Col xs="auto"><InputGroup.Checkbox
                    checked={searchPath.isFinalOf}
                    onChange={(e) => setSearchPath({...searchPath, isFinalOf: e.target.checked})}
                    aria-label="FINAL_OF" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs lg="3"><InputGroup.Text>TONE_OF</InputGroup.Text></Col>
                <Col xs="auto"><InputGroup.Checkbox
                    checked={searchPath.isToneOf}
                    onChange={(e) => setSearchPath({...searchPath, isToneOf: e.target.checked})}
                    aria-label="TONE_OF" /></Col>
                <Col xs lg="1"></Col>
                <Col xs lg="3"><InputGroup.Text>TRANSFORMED_TO</InputGroup.Text></Col>
                <Col xs="auto"><InputGroup.Checkbox
                    checked={searchPath.isTransformedTo}
                    onChange={(e) => setSearchPath({...searchPath, isTransformedTo: e.target.checked})}
                    aria-label="TRANSFORMED_TO" /></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs lg="7"></Col>
                <Col xs lg="1">
                    <Button className="hopsBtn" variant="primary" size="lg"
                        onClick={handleSearchShortestPath}>Search</Button>
                </Col>
                
            </Row>
        </Container>
        {recordInfo !== undefined && recordInfo !== '' && <div>
            <h2>所有的最短路径</h2>
        <Table responsive>
            <thead>
                <tr>
                <th>序号(Number)</th>
                <th>节点(Node)</th>
                <th>关系(relationship)</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: recordInfo.length }).map((_, index) => (
                    <tr>
                        <td key={index + 1}>
                            {index + 1}
                        </td>
                        <td>
                           {recordInfo[index]._fields[1].join(" , ")} 
                        </td>
                        
                        <td>
                           {recordInfo[index]._fields[2].join(" , ")} 
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
        </div>}
        </>
    );
};

export default FindShortestPaths;