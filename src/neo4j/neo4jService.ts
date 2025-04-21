// const queryNeo4j = require('./neo4jClient.js');

import { queryNeo4j } from './neo4jClient.ts';


async function getResultsFromDB(query: string) {
    return await queryNeo4j(query).then(records => {
        return records;
    })
    .catch(error => {
        console.error('Error fetching data from Neo4j:', error);
    })
    .finally(() => {
        console.log('Query Finished!');
    });;
};

export default  getResultsFromDB ;