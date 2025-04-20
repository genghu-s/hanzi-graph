import { useEffect, useState } from "react";
import { Graph, GraphData } from "@antv/g6";
import { Neo4jNode } from "../interfaces/Neo4jNode";

// 汉
function HanziGraph(graphData: any) {
    const [data, setData] = useState<GraphData | ((prev: GraphData) => GraphData)>();

    let graph: Graph | null = null;

    useEffect(() => {            
        setData(graphData.graphData);
        console.log(data);
        if (graph === null) {
            graph = new Graph({
                container: 'container',
                width: 1200,
                height: 800,
                layout: {
                    type: 'radial',
                    unitRadius: 70,
                    preventOverlap: true,
                    strictRadial: false,
                },
                node: {
                    style: {
                        position: 'center',
                        style: {
                            labelText: (d: Neo4jNode) => d?.properties?.name,
                            labelBackground: true,
                            iconText: (d: Neo4jNode) => d?.properties?.name,
                            iconFill: "#fff",
                        },
                    }
                },
                edge: {
                    style: {
                        endArrow: true,
                    }
                },
                behaviors: [
                    "zoom-canvas",
                    "drag-element",
                    {
                        type: "drag-canvas",
                        enable: (event: { shiftKey: boolean; targetType: string; }) => {
                            return (
                                event.shiftKey === false && event.targetType === "canvas"
                            );
                        },
                    },

                    {
                        type: "click-select",
                        enable: (e: { metaKey: any; ctrlKey: any; shiftKey: any; }) => {
                            if (e?.metaKey || e?.ctrlKey || e.shiftKey) {
                                return false;
                            }
                            return true;
                        },
                        multiple: true,
                    },
                    {
                        type: "hover-activate",
                        degree: 1,
                    },
                    {
                        type: "lasso-select",
                        trigger: ["shift"],
                    }
                ],

                autoFit: "center",
                plugins: [
                    {
                        type: "tooltip",
                        key: "tooltip",
                        trigger: "hover"
                    }
                ]
            });
        }


        if (data !== undefined && data !== null) {
            graph.setData(data);
        }
          
        graph.render();

        return () => {
            const element = document.querySelector('#container');
            if (element !== null) {
                element.innerHTML = '';
            }
        }
    });

    return (
        <>
            <div id='container'>
            </div>
        </>
    );
};

export default HanziGraph;