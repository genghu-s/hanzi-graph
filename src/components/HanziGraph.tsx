import { useEffect, useState } from "react";
import { Background, Graph, GraphData, GraphEvent } from "@antv/g6";

import "../css/HanziGraph.css";
import createTooltipContent from "./Tooltip";

// 汉
function HanziGraph(graphData: any) {
    const [data, setData] = useState<GraphData | ((prev: GraphData) => GraphData)>();
    
    let graph: Graph | null = null;
    useEffect(() => {            
        setData(graphData.graphData);
        console.log(data);
        if (graph === null) {
            console.log("GRAPH NEW CREATION");
            graph = new Graph({
                container: 'container',
                width: 1200,
                height: 600,
                layout: {
                    type: 'radial',
                    unitRadius: 100,
                    preventOverlap: true,
                    strictRadial: false,
                    linkDistance: 200,
                },
                node: {
                    style: {
                        size: 40,
                        position: 'center',
                        label: true,
                        labelText: d => String(d.name),
                        labelFontSize: 16,
                        labelFill: 'white',
                        labelPlacement: 'center',
                        labelTextDecorationColor: 'black',
                        labelTextDecorationStyle: 'solid',
                        labelBackground: false,
                        labelBackgroundFill: 'black',
                        iconFill: "#fff",
                    }
                },
                edge: {
                    type: (d: any) => d.type, 
                    style: {
                        endArrow: true,
                        label: false,
                        stoke: (d: any) => d.style.stroke,
                        labelText: (d: any) => d.relationshipType,
                        sourceNode: (d: any) => d.source,
                        targetNode: (d: any) => d.target
                    },
                },
                behaviors: [
                    "zoom-canvas",
                    "drag-element",
                    "drag-canvas"
                ],
                autoFit: "center",
                plugins: [
                    {
                        type: "tooltip",
                        key: "tooltip",
                        trigger: "hover",
                        enable: true,
                        getContent: (e: any, items: Array<any>) => {
                            return createTooltipContent(e, items[0]);
                        }
                    },
                    {
                        type: 'legend',
                        titleText: '节点 & 关系 (Node & Relationship)',
                        nodeField: 'legendType',
                        edgeField: 'legendType',
                        trigger: 'click',
                        position: 'top-left',
                        container: 'legend',
                        // className: 'legendCanvas',
                        orientation: 'vertical',
                        height: 600,
                        gridCol: 1,
                        gridRow: 15,
                        itemLabelFontSize: 12,
                    },
                ],       
                transforms: ['process-parallel-edges'],
            });
        }

        /** Adaptive window - extract the definition for easy uninstallation */
        const handleAfterLayout = () => {
            graph?.fitView();
        };

        const legend = document.querySelector('#legend');
        if (data !== undefined && data !== null) {
            graph.setData(data);
            if (legend !== null) {
                legend.style.display= "block";
            }
        } else {
            
            if (legend !== null) {
                legend.style.display= "none";
            }
        }

        graph.render().catch((error) => console.error(error));

        graph.on(GraphEvent.AFTER_LAYOUT, handleAfterLayout);

        // Register mouse actions on the graph
        // graph.on('edge:pointerenter', (evt, item) => {
        //     console.log(evt);
        //     graph.setElementState(item.id, 'hover', true);
        // });

        // graph.on('edge:pointerleave', (evt) => {
        //     console.log(evt);
        // });

        // graph.on('node:pointerenter', (evt) => {
        //     console.log(evt);
        // });

        // graph.on('node:pointerleave', (evt) => {
        //     console.log(evt);
        // });


        return () => {
            const legend = document.querySelector('.g6-legend');
            if (legend !== null) {
                legend.innerHTML = '';
            }
            const container = document.querySelector('#container');
            if (container !== null) {
                container.innerHTML = '';
            }
        }
    });

    return (
        <>
            <div id='container'>
            </div>
            <div id='legend'></div>
        </>
    );
};

export default HanziGraph;