import { ParseResult } from 'papaparse';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { usePapaParse } from 'react-papaparse';

const GetCentrality =  () => {
    const [fileData, setFileData] = useState('');
    const [tableData, setTableData] = useState<any[]>();
    const { readString } = usePapaParse();

    useEffect(() => {
        fetch('../../public/all_nodes_export.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log("GOT THE DATA!");
            setFileData(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });

    useEffect(() => {
        if (fileData) {
            // Redirect to another page after reading the string
            readString(fileData, {
                worker: true,
                complete: (results) => {
                    setTableData(results.data);
                    console.log(tableData);
                },
            });
        }
      }, [fileData]);

    return (
        <>
            <div id='centrality'>
                {tableData !== null && tableData !== undefined &&
                <Table responsive>
                <thead>
                    <tr>
                    <th>{tableData[0][0]}</th>
                    <th>{tableData[0][1]}</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: tableData.length - 1 }).map((_, index) => (
                        <tr>
                            <td>
                                {tableData[index+1][0]} 
                            </td>
                            
                            <td>
                                {tableData[index+1][1]} 
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>}
            </div>
        </>
    );
};

export default GetCentrality;