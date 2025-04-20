import React, { createContext, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../css/search.css";

import HanziGraph from '../components/HanziGraph.tsx';
import drawGraph from '../g6/g6Factory.ts';


const ThemeContext = createContext(null);
function Search() {
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState<{ nodes: never[]; edges: never[]; }>();
    const ref = React.useRef(null);
    let theme = useContext(ThemeContext);

    const handleSearch = async () => {
        console.log("listener added");
        
        var hop = 1;
        if (inputText.length > 1) {
            hop = 2;
        } else {
            hop = 1;
        }
    
        const dataFromDB = await drawGraph(inputText, ref, theme, hop);
        setData(dataFromDB);
        console.log("Data fetched in Search File: ");
        console.log(data);
    };

    const handleAdvancedSearch = () => {
        
    };

    return (
        <>
            <div data-toggle="tooltip" title="Please input one or more character for their connections (or explore more functions by clicking 'Advanced Search')">
                请输入一个或多个汉字进行搜索（或者点击“高级搜索”探索更多功能）：
            </div>
            <InputGroup className="searchInputGroup">
                <Row>
                    <Col xs="auto" >
                        <Form.Control placeholder="search..." 
                        value={inputText} 
                        onChange={(e) => setInputText(e.target.value)} /></Col>
                    <Col xs="auto" >
                        <Button variant="primary" data-toggle="tooltip" title="Search" onClick={handleSearch}>搜索</Button></Col>
                    <Col xs="auto" >
                        <Button variant="primary" data-toggle="tooltip" title="Advanced Search" onClick={handleAdvancedSearch}>高级搜索</Button></Col>
                </Row>

            </InputGroup>

            <HanziGraph
                data={data}
            />
        </>
    );
}

export default Search