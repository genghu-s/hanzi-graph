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
const Search = () =>{
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState<{ nodes: never[]; edges: never[]; }>();

    const ref = React.useRef(null);
    let theme = useContext(ThemeContext);

    const handleSearch = async () => {
        console.log("listener added with Input: " + inputText);
        
        var hop = 1;
        if (inputText.length > 1) {
            hop = 2;
        } else {
            hop = 1;
        }
    
        await drawGraph(inputText, ref, theme, hop)
            .then(((dataFromDB) => setData(dataFromDB)));
    };
    console.log("Data fetched in Search File: ");
    console.log(data);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // handleSearch();
    }, [])

    const handleAdvancedSearch = () => {
        
    };

    return (
        <>
            <div data-toggle="tooltip" title="Please input one or more character for their connections (or explore more functions by clicking 'Advanced Search')">
                请输入一个或多个汉字进行搜索（或者点击“高级搜索”探索更多功能）：
            </div>
            <InputGroup className="searchInputGroup shadow-none">
                <Row className="searchRow shadow-none">
                    <Col className="searchCol shadow-none">
                        <Form.Control placeholder="search..." 
                        className="searchText"
                        value={inputText} 
                        onChange={(e) => setInputText(e.target.value)} /></Col>
                    <Col>
                        <Button variant="primary" data-toggle="tooltip" title="Search" onClick={handleSearch}>搜索</Button></Col>
                    <Col>
                        <Button variant="primary" data-toggle="tooltip" 
                        className="advancedSearchText" title="Advanced Search" onClick={handleAdvancedSearch}>高级搜索</Button></Col>
                </Row>

            </InputGroup>

            <HanziGraph
                graphData={data}
            />
        </>
    );
};

export default Search;