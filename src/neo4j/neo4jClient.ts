// require('dotenv').config();
// import {} from 'dotenv/config' // module

import neo4j from "neo4j-driver";
// const dbConfig = {
//     host: process.env.NEO4J_HOST,
//     neo4j_name: process.env.NEO4J_NAME,
//     password: process.env.NEO4J_PASSWORD
// };
  
const dbConfig = {
    host: "bolt://localhost:7687",
    neo4j_name: "neo4j",
    password: 'password'
};

async function queryNeo4j(query: string) {

    console.log("HOST: " + dbConfig['host']);
    // var neo4j = require('neo4j-driver');
    
    var driver = neo4j.driver(
        dbConfig['host'],
        //改密码
        neo4j.auth.basic(dbConfig['neo4j_name'], dbConfig['password'])
    );

    var session = driver.session({
        //改数据库名
        database: 'neo4j',
        defaultAccessMode: neo4j.session.READ
    });

    return new Promise((resolve, reject) => {
        // Run a Cypher statement, reading the result in a streaming manner as records arrive:
        resolve(session.executeRead(txc => {
            // used transaction will be committed automatically, no need for explicit commit/rollback
          
            var result = txc.run(query)
            console.log(result);
            // at this point it is possible to either return the result or process it and return the
            // result of processing it is also possible to run more statements in the same transaction
            return result
          })); 
    });
}

export { queryNeo4j } ;