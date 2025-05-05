import { useState, useEffect } from "react";
import { AdvancedSearchProps } from "../interfaces/AdvancedSearchProps";
import { InputGroup, Form, Row, Col, Container, Button } from "react-bootstrap";
import { SearchComb } from "../interfaces/SearchComb";
import getFormedData from "../g6/getFormedData";
import getResultsFromDB from "../neo4j/neo4jService";

const SearchCombination = ({ sendDataToParent }: AdvancedSearchProps) => {
    const [data, setData] = useState<{ nodes: never[]; edges: never[]; }>();
    const [searchComb, setSearchComb] = useState<SearchComb>(new SearchComb());

    useEffect(() => {
        sendDataToParent(data);
    });

    const characterSelected = (value: boolean) => {
        console.log("Selected clicked: " + value);
        setSearchComb({ ...searchComb, character: { userInput: "", isChecked: value } });
    }

    const componentSelected = (value: boolean) => {
        console.log("Component clicked");
        setSearchComb({ ...searchComb, component: { userInput: "", isChecked: value } });
    }

    const semanticComponentSelected = (value: boolean) => {
        console.log("Semantic Component clicked");
        setSearchComb({ ...searchComb, semanticComponent: { userInput: "", isChecked: value } });
    }

    const pictographicRadicalSelected = (value: boolean) => {
        console.log("Pictographic Radical clicked");
        setSearchComb({ ...searchComb, pictographicRadical: { userInput: "", isChecked: value } });
    }

    const phoneticRadicalSelected = (value: boolean) => {
        console.log("Phonetic Radical clicked");
        setSearchComb({ ...searchComb, phoneticRadical: { userInput: "", isChecked: value } });
    }

    const initialSelected = (value: boolean) => {
        console.log("Initial clicked");
        setSearchComb({ ...searchComb, initial: { userInput: "", isChecked: value } });
    }

    const finalSelected = (value: boolean) => {
        console.log("Final clicked");
        setSearchComb({ ...searchComb, final: { userInput: "", isChecked: value } });
    }

    const handleSearchCombination = async () => {
        console.log("Search clicked");

        let queryStatement = '';
        let ret = 'RETURN ';
        let isQueryValid = false;
        for (let key in searchComb) {
            console.log(`${key}: ${(searchComb as any)[key]}`);
            switch (key) {
                case "character":
                    if (searchComb.character.isChecked
                        && searchComb.character.userInput !== undefined
                        && searchComb.character.userInput !== '') {
                        if (!isQueryValid) {
                            isQueryValid = true;
                        }
                        if (searchComb.character.userInput.length > 1) {
                            for (let c = 0; c < searchComb.character.userInput.length; c++) {
                                queryStatement = queryStatement + `MATCH (ch${c}:CHARACTER {name:'${searchComb.character.userInput[c]}'})` + '\n';
                                queryStatement = queryStatement + `MATCH r1${c} = (ch${c})-[]->(o)` + '\n';
                                ret = ret + `ch${c}, r1${c}` + ',';
                            }
                        } else {
                            queryStatement = queryStatement + `MATCH (ch:CHARACTER {name:'${searchComb.character.userInput}'})` + '\n';
                            queryStatement = queryStatement + `MATCH r1 = (ch)-[]->(o)` + '\n';
                            ret = ret + 'ch, r1' + ',';

                        }
                    }
                    break;
                case "component":
                    if (searchComb.component.isChecked
                        && searchComb.component.userInput !== undefined
                        && searchComb.component.userInput !== '') {
                        if (!isQueryValid) {
                            isQueryValid = true;
                        }  
                        if (searchComb.component.userInput.length > 1) {
                            for (let c=0; c<searchComb.component.userInput.length; c++){
                                queryStatement = queryStatement +  `MATCH (co${c}:COMPONENT {name:'${searchComb.component.userInput[c]}'})` + '\n';
                                queryStatement = queryStatement + `MATCH r2${c} = (co${c})-[]->(o)` + '\n';
                                ret = ret + `co${c}, r2${c}` + ',';
                              }
                        } else {
                            queryStatement = queryStatement +  `MATCH (co:COMPONENT {name:'${searchComb.component.userInput}'})` + '\n';
                            queryStatement = queryStatement + `MATCH r2 = (co)-[]->(o)` + '\n';
                            ret = ret + 'co, r2' + ',';
                        }
                    }
                    break;
                case "semanticComponent":
                    if (searchComb.semanticComponent.isChecked
                        && searchComb.semanticComponent.userInput !== undefined
                        && searchComb.semanticComponent.userInput !== '') {
                        if (!isQueryValid) {
                            isQueryValid = true;
                        }  
                            
                        queryStatement = queryStatement +  `MATCH (sc:SEMANTIC_COMPONENT {name:'${searchComb.semanticComponent.userInput}'})` + '\n';
                        queryStatement = queryStatement + `MATCH r3 = (sc)-[]->(o)` + '\n';
                        ret = ret + 'sc, r3' + ',';
                    }
                    break;
                case "pictographicRadical":
                    if (searchComb.pictographicRadical.isChecked
                        && searchComb.pictographicRadical.userInput !== undefined
                        && searchComb.pictographicRadical.userInput !== '') {
                        if (!isQueryValid) {
                            isQueryValid = true;
                        }  
                        queryStatement = queryStatement +  `MATCH (pr:PICTOGRAPHIC_RADICAL {name:'${searchComb.pictographicRadical.userInput}'})` + '\n';
                        queryStatement = queryStatement + `MATCH r4 = (pr)-[]->(o)` + '\n';
                        ret = ret + 'pr, r4' + ',';
                    }
                    break;
                case "phoneticRadical":
                    if (searchComb.phoneticRadical.isChecked
                        && searchComb.phoneticRadical.userInput !== undefined
                        && searchComb.phoneticRadical.userInput !== '') {
                        if (!isQueryValid) {
                            isQueryValid = true;
                        }  
                        queryStatement = queryStatement +  `MATCH (ph:PHONETIC_RADICAL {name:'${searchComb.phoneticRadical.userInput}'})` + '\n';
                        queryStatement = queryStatement + `MATCH r5 = (ph)-[]->(o)` + '\n';
                        ret = ret + 'ph, r5' + ',';
                    }
                    break;
                case "initial":
                    if (searchComb.initial.isChecked
                        && searchComb.initial.userInput !== undefined
                        && searchComb.initial.userInput !== '') {
                        if (!isQueryValid) {
                            isQueryValid = true;
                        }  
                        queryStatement = queryStatement +  `MATCH (i:INITIAL {name:'${searchComb.initial.userInput}'})` + '\n';
                        queryStatement = queryStatement + `MATCH r6 = (i)-[]->(o)` + '\n';
                        ret = ret + 'i, r6' + ',';
                    }
                    break;
                case "final":
                    if (searchComb.final.isChecked
                        && searchComb.final.userInput !== undefined
                        && searchComb.final.userInput !== '') {
                        if (!isQueryValid) {
                            isQueryValid = true;
                        }  
                        queryStatement = queryStatement +  `MATCH (f:FINAL {name:'${searchComb.final.userInput}'})` + '\n';
                        queryStatement = queryStatement + `MATCH r7 = (f)-[]->(o)` + '\n';
                        ret = ret + 'f, r7' + ',';
                    }
                    break;
                case "tone":
                    if (searchComb.tone !== undefined
                        && searchComb.tone !== '') {
                        queryStatement = queryStatement +  `MATCH (t:TONE {alias: '${searchComb.tone}'})` + '\n';
                        queryStatement = queryStatement + `MATCH r8 = (t)-[]->(o)` + '\n';
                        ret = ret + 't, r8' + ',';
                    }
                    break;
            }
        }

        if (!isQueryValid) {
            alert("Please select search combination to start!");
            return;
        }
        queryStatement = queryStatement + ret + 'o';
        console.log(queryStatement);
        const records = await getResultsFromDB(queryStatement);
        const rawData = await getFormedData(records);
        setData(rawData.data);
    }

    return (
        <>
            <Container className="combinationSearchContainer">
                <Row className="justify-content-md-center">
                    <Col xs lg="3"><InputGroup.Text>汉字 (CHARACTER)</InputGroup.Text></Col>
                    <Col xs="auto"><InputGroup.Checkbox
                        checked={searchComb?.character.isChecked}
                        onChange={(e) => characterSelected(e.target.checked)}
                        aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3"><Form.Control disabled={!searchComb?.character.isChecked}
                        value={searchComb.character.userInput}
                        onChange={(e) => setSearchComb({ ...searchComb, character: { ...searchComb.character, userInput: e.target.value } })}
                        aria-label="Input Character" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="3"><InputGroup.Text>部件 (COMPONENT)</InputGroup.Text></Col>
                    <Col xs="auto"><InputGroup.Checkbox
                        checked={searchComb?.component.isChecked}
                        onChange={(e) => componentSelected(e.target.checked)} aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3"><Form.Control disabled={!searchComb?.component.isChecked}
                        value={searchComb.component.userInput}
                        onChange={(e) => setSearchComb({ ...searchComb, component: { ...searchComb.component, userInput: e.target.value } })}
                        aria-label="Input Component" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="3"><InputGroup.Text>义符 (SEMANTIC COMPONENT)</InputGroup.Text></Col>
                    <Col xs="auto"><InputGroup.Checkbox
                        checked={searchComb?.semanticComponent.isChecked}
                        onChange={(e) => semanticComponentSelected(e.target.checked)} aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3"><Form.Control disabled={!searchComb?.semanticComponent.isChecked}
                        value={searchComb.semanticComponent.userInput}
                        onChange={(e) => setSearchComb({ ...searchComb, semanticComponent: { ...searchComb.semanticComponent, userInput: e.target.value } })}
                        aria-label="Input Semantic Component" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="3"><InputGroup.Text>形旁 (PICTOGRAPHIC RADICAL)</InputGroup.Text></Col>
                    <Col xs="auto"><InputGroup.Checkbox
                        checked={searchComb?.pictographicRadical.isChecked}
                        onChange={(e) => pictographicRadicalSelected(e.target.checked)} aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3"><Form.Control disabled={!searchComb?.pictographicRadical.isChecked}
                        value={searchComb.pictographicRadical.userInput}
                        onChange={(e) => setSearchComb({ ...searchComb, pictographicRadical: { ...searchComb.pictographicRadical, userInput: e.target.value } })}
                        aria-label="Input Pictographic Radical" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="3"><InputGroup.Text>声旁 (PHONETIC RADICAL)</InputGroup.Text></Col>
                    <Col xs="auto"><InputGroup.Checkbox
                        checked={searchComb?.phoneticRadical.isChecked}
                        onChange={(e) => phoneticRadicalSelected(e.target.checked)} aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3"><Form.Control disabled={!searchComb?.phoneticRadical.isChecked}
                        value={searchComb.phoneticRadical.userInput}
                        onChange={(e) => setSearchComb({ ...searchComb, phoneticRadical: { ...searchComb.phoneticRadical, userInput: e.target.value } })}
                        aria-label="Input Phonetic Radical" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="3"><InputGroup.Text>声母 (INITIAL)</InputGroup.Text></Col>
                    <Col xs="auto"><InputGroup.Checkbox
                        checked={searchComb?.initial.isChecked}
                        onChange={(e) => initialSelected(e.target.checked)}
                        aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3"><Form.Control disabled={!searchComb?.initial.isChecked}
                        value={searchComb.initial.userInput}
                        onChange={(e) => setSearchComb({ ...searchComb, initial: { ...searchComb.initial, userInput: e.target.value } })} aria-label="Input Initial" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="3"><InputGroup.Text>韵母 (FINAL)</InputGroup.Text></Col>
                    <Col xs="auto"><InputGroup.Checkbox
                        checked={searchComb?.final.isChecked}
                        onChange={(e) => finalSelected(e.target.checked)}
                        aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3"><Form.Control disabled={!searchComb?.final.isChecked}
                        value={searchComb.final.userInput}
                        onChange={(e) => setSearchComb({ ...searchComb, final: { ...searchComb.final, userInput: e.target.value } })}
                        aria-label="Input Final" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="3"><InputGroup.Text>声调 (TONE)</InputGroup.Text></Col>
                    <Col xs="auto" className="hiddenComponent"><InputGroup.Checkbox aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3">
                        <Form.Select
                            value={searchComb.tone}
                            onChange={(e) => setSearchComb({ ...searchComb, tone: e.target.value })} aria-label="请选择声调 (Please select tone)">
                            <option>请选择声调 (Please select tone)</option>
                            <option value="0">轻声 (Neutral) </option>
                            <option value="1">一声 (First) </option>
                            <option value="2">二声 (Second) </option>
                            <option value="3">三声 (Third) </option>
                            <option value="4">四声 (Forth) </option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="justify-content-md-center"> 
                    <Col xs lg="1"></Col>
                    <Col xs="auto" className="hiddenComponent"><InputGroup.Checkbox aria-label="Checkbox for following text input" /></Col>
                    <Col xs="auto" className="hiddenComponent"><InputGroup.Checkbox aria-label="Checkbox for following text input" /></Col>
                    <Col xs lg="3"></Col>
                    <Col xs lg="1">
                        <Button className="hopsBtn" variant="primary" size="lg"
                            onClick={handleSearchCombination}>Search</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SearchCombination;