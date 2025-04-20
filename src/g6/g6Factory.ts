import  getResultsFromDB  from "../neo4j/neo4jService.ts";
import handleGraph from "./g6Graph.ts";
import getFormedData from './getFormedData.ts';

function formQueryWithKey(myArray: any, keyName: any, hop=2) {
    var formedPara = "MATCH ";
    var returnPara = "RETURN ";
    var query_statement = '';
    var matchRels = [];
    var rels = [];
    for (let i = 0; i < myArray.length; i++) {
        formedPara += `(c${i} {${keyName}:"${myArray[i]}"}),`;
        returnPara += `c${i},`;
    }
    for (let j = 0; j < myArray.length; j++){
        let k = j + 1;
        while(k < myArray.length){
            var matchPara = "OPTIONAL MATCH " + `r${j}${k}=(c${j})-[*1..${hop}]-(c${k})`;
            matchRels.push(matchPara);
            rels.push(`r${j}${k}`);
            k++;
        }
        
    }
    var whenPara = rels.join(' IS NULL OR ') + ' IS NULL THEN \'有的关系是不存在的\'';
    var elsePara = 'ELSE ' + '\'所有关系都存在\'';
    var endPara = 'END AS relationshipStatus,';

    var relationPara = matchRels.join("\n");
    query_statement = formedPara.slice(0, -1) + "\n"  + relationPara + "\n" + returnPara + '\n\t' +'CASE' + '\n\t\t' + 'WHEN ' + whenPara + '\n\t\t' + elsePara + '\n\t' + endPara + '\n\t'+ rels.join(',') + '\n' + 'LIMIT 500';
    console.log("query statement: " + query_statement);
    return query_statement;
}


function singleQuery(userInput: string, hop: number){
    const queryOne = `match(n {name:'${userInput}'}), (m)-[r*1..${hop}]-(n) return m, r, n`;
    return queryOne;
}

async function drawGraph(userInput: string, ref: any, context: any,  hop: number) {
    //document.getElementById(container).innerHTML = "";
    //const userInput = document.getElementById("text").value;
    let records, data;
    if (userInput.length > 1) {
        
        //const myArray = userInput.split(" ");
        const myArray = Array.from(userInput);
        //console.log(myArray);
        records = await getResultsFromDB(formQueryWithKey(myArray, "name", hop));

        data = await getFormedData(records);
        
    } else {
        const queryOne = singleQuery(userInput, hop)
        records = await getResultsFromDB(queryOne);
        data = await getFormedData(records);
    }
    // handleGraph(data.data, ref, context);

    return data.data;
}


export default drawGraph;