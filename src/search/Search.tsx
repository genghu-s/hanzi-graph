import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../css/search.css";

import HanziGraph from '../components/HanziGraph.tsx';
import drawGraph from '../g6/g6Factory.ts';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    
    const inputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<{ nodes: never[]; edges: never[]; }>();
    const handleSearch = async () => {
        var hop = 1;
        if (inputRef.current && inputRef.current.value.length > 1) {
            hop = 2;
        } else {
            hop = 1;
        }
    
        if (inputRef.current) {
            await drawGraph(inputRef.current.value, hop)
                .then((dataFromDB) => setData(dataFromDB));
        }
    };

    const handleWriter = () => {
        if (inputRef.current && inputRef.current.value && inputRef.current.value.length > 0) {
            const character = inputRef.current.value[0];
            console.log(character);
            navigate(`/write/${character}`);
        } else {
            navigate(`/write/字`);
        }
    }


    console.log("Data fetched in Search File: ");
    console.log(data);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // handleSearch();
    }, [])

    const handleAdvancedSearch = () => {
        navigate('/advancedsearch');
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
                        ref={inputRef} /></Col>
                    <Col>
                        <Button variant="primary" data-toggle="tooltip" title="Search" onClick={handleSearch}>搜索</Button></Col>
                    <Col>
                        <Button variant="primary" data-toggle="tooltip" title="Practice Writing" onClick={handleWriter}>写一写</Button></Col>
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