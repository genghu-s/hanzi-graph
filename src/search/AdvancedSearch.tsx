import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import SearchByHops from "./SearchByHops";
import SearchCombination from "./SearchCombination";
import FindShortestPaths from "./FindShortestPaths";
import GetCentrality from "./GetCentrality";
import HanziGraph from "../components/HanziGraph";

import "../css/advancedSearch.css";

function AdvancedSearch() {
    const [data, setData] = useState<{ nodes: never[]; edges: never[]; }>();

    const [navEvent, setNavEvent] = useState('searchbyhops');

    const handleSelect = (key: any) => {
        console.log(key);
        if (key === '' || key === undefined) {
            setNavEvent("searchbyhops");
        }
        setNavEvent(key);
    };

    const handleDataFromChild = (dataFromChild) => {
        setData(dataFromChild);
    }

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav fill variant="tabs" defaultActiveKey="searchbyhops" onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="searchbyhops">Search By Hops</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="searchCombination">Combination Search</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="findShortestPaths">Find Shortest Paths</Nav.Link>                    
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="getCentrality">Centrality</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            {navEvent === 'searchbyhops' && <SearchByHops sendDataToParent={handleDataFromChild}/>}
            {navEvent === 'searchCombination' && <SearchCombination sendDataToParent={handleDataFromChild}/>}
            {navEvent === 'findShortestPaths' && <FindShortestPaths />}
            {navEvent === 'getCentrality' && <GetCentrality />}

            <HanziGraph
                graphData={data}
            />
        </>
    );
}

export default AdvancedSearch;