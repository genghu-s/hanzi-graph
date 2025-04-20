import { isNode, isRelationship, Node } from "neo4j-driver";
import { Neo4jNode } from "../interfaces/Neo4jNode";
import { CharColorMap, LineColorMap, NodeColorMap } from "./staticMaps";

function getFormedData(records: any) {
    const nodeMap = new Map();
    const edgeMap = new Map();
    const data = {
        // 点集
        nodes: [],
        // 边集
        edges: [],
        // 表示一条从 node1 节点连接到 node2 节点的边
    };

    function addNode(arr: any, item: any) {
        const found = arr.some((el: { id: any; }) => el.id === item.id);
        if (!found) arr.push(item);
        nodeMap.set(item.id, true);
    };

    function addEdge(arr: any, edge: any) {
        const key = edge.source + "-" + edge.target + "-" + edge.relationshipType;
        if (!edgeMap.has(key)) {
            arr.push(edge);
            edgeMap.set(key, true);
        }
    }

    function getNodeStyle(labels: any) {
        let defaultSeq = 7;
        labels.forEach((label: any) => {
            if (CharColorMap.get(label).seq < defaultSeq) {
                defaultSeq = CharColorMap.get(label).seq;
            }
        })
        return NodeColorMap.get(defaultSeq).style;
    }

    function getLegendType(labels: any) {
        let defaultLegendSeq = 7;
        let defaultLegendType = 'TONE';
        labels.forEach((label: any) => {
            if (CharColorMap.get(label).seq < defaultLegendSeq) {
                defaultLegendSeq = CharColorMap.get(label).seq;
                defaultLegendType = label;
            }
        })
        return defaultLegendType;
    }

    function buildNode(neo4jNode: Node) {

        const lookupNode = {
            'CHARACTER': {
                id: neo4jNode.identity.toString(),
                label: neo4jNode.properties.name,
                labels: neo4jNode.labels,
                meaning1: neo4jNode.properties.meaning_hygx,
                meaning2: neo4jNode.properties.meaning_bdbk,
                structure: neo4jNode.properties.structure,
                level: neo4jNode.properties.hsk_level,
                method: neo4jNode.properties.method,
                name: neo4jNode.properties.name,
                pinyin: neo4jNode.properties.pinyin,
                sc_meaning: neo4jNode.properties.sc_meaning,
                pr_meaning: neo4jNode.properties.pr_meaning,
                legendType: getLegendType(neo4jNode.labels),
                style: getNodeStyle(neo4jNode.labels)
            },
            'PICTOGRAPHIC_RADICAL': {
                id: neo4jNode.identity.toString(),
                cid: neo4jNode.properties.cid,
                label: neo4jNode.properties.name,
                labels: neo4jNode.labels,
                alias: neo4jNode.properties.alias,
                name: neo4jNode.properties.name,
                pinyin: neo4jNode.properties.pinyin,
                pr_meaning: neo4jNode.properties.pr_meaning,
                legendType: getLegendType(neo4jNode.labels),
                style: getNodeStyle(neo4jNode.labels)
            },
            'PHONETIC_RADICAL': {
                id: neo4jNode.identity.toString(),
                cid: neo4jNode.properties.cid,
                label: neo4jNode.properties.name,
                labels: neo4jNode.labels,
                name: neo4jNode.properties.name,
                pinyin: neo4jNode.properties.pinyin,
                is_character: neo4jNode.properties.is_character,
                legendType: getLegendType(neo4jNode.labels),
                style: getNodeStyle(neo4jNode.labels)
            },
            'SEMANTIC_COMPONENT': {
                id: neo4jNode.identity.toString(),
                cid: neo4jNode.properties.cid,
                label: neo4jNode.properties.name,
                labels: neo4jNode.labels,
                name: neo4jNode.properties.name,
                is_character: neo4jNode.properties.is_character,
                sc_meaning: neo4jNode.properties.sc_meaning,
                legendType: getLegendType(neo4jNode.labels),
                style: getNodeStyle(neo4jNode.labels)
            },
            'INITIAL': {
                id: neo4jNode.identity.toString(),
                label: neo4jNode.properties.name,
                labels: neo4jNode.labels,
                name: neo4jNode.properties.name,
                legendType: getLegendType(neo4jNode.labels),
                style: getNodeStyle(neo4jNode.labels)
            },
            'FINAL': {
                id: neo4jNode.identity.toString(),
                label: neo4jNode.properties.name,
                labels: neo4jNode.labels,
                name: neo4jNode.properties.name,
                first_tone: neo4jNode.properties.first,
                second_tone: neo4jNode.properties.second,
                third_tone: neo4jNode.properties.third,
                fourth_tone: neo4jNode.properties.fourth,
                legendType: getLegendType(neo4jNode.labels),
                style: getNodeStyle(neo4jNode.labels)
            },
            'TONE': {
                id: neo4jNode.identity.toString(),
                label: neo4jNode.properties.name,
                labels: neo4jNode.labels,
                name: neo4jNode.properties.name,
                english_name: neo4jNode.properties.english_name,
                legendType: getLegendType(neo4jNode.labels),
                style: getNodeStyle(neo4jNode.labels)
            },
            'COMPONENT': {
                id: neo4jNode.identity.toString(),
                label: neo4jNode.properties.name,
                labels: neo4jNode.labels,
                name: neo4jNode.properties.name,
                legendType: getLegendType(neo4jNode.labels),
                style: getNodeStyle(neo4jNode.labels)
            }
            
          };
        
        const label = neo4jNode.labels[0] as keyof typeof lookupNode;;
        const node = lookupNode[label] || 'SOMETHING IS WRONG!';
        addNode(data.nodes, node);
    };

    function buildEdge(neo4jEdge: any) {
        let edge = {
            source: neo4jEdge.start.toString(),
            target: neo4jEdge.end.toString(),
            relationshipType: neo4jEdge.type,
            legendType: neo4jEdge.type,
            style: {
                stroke: LineColorMap.get(neo4jEdge.type),
                endArrow: {
                    fill: LineColorMap.get(neo4jEdge.type),
                }
            }
        };
        addEdge(data.edges, edge);
    };

    records.records.forEach((record: any) => {
        //console.log("record: " + Object.values(record.toObject()));
        Object.values(record.toObject()).map(async (v) => {
            if (v != null){
                if (isNode(v)) {
                    buildNode(v);
                } else if (isRelationship(v)) {
                    buildEdge(v);
                } else if (v instanceof Array && v.length > 0) {
                    if (isRelationship(v[0])) {
                        buildEdge(v[0]);
                    }
                } else if (v.hasOwnProperty('segments')) {
                    console.log("Record in getFromedData: ");
                    console.log(v);
                    // for (let i = 0; i < v['segments'].length; i++) {
                    //     if (v.segments[i].hasOwnProperty('relationship') && isRelationship(v.segments[i].relationship)) {
                    //         buildNode(v.segments[i].start);
                    //         buildNode(v.segments[i].end);
                    //         buildEdge(v.segments[i].relationship);
                    //     }
                    // }
                }
            }
        });
    });
    console.log("data: " + Object.values(data.nodes));
    console.log("nodeMap: " + Array.from(nodeMap.keys()));
    console.log("edgeMap: " + Array.from(edgeMap.keys()));
    return {
        "data": data,
        "nodeMap": nodeMap,
        "edgeMap": edgeMap
    };
}

export default getFormedData;