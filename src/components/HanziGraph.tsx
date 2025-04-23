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
                    unitRadius: 70,
                    preventOverlap: true,
                    strictRadial: false,
                },
                node: {
                    style: {
                        size: 40,
                        position: 'center',
                        label: true,
                        labelText: d => String(d.name),
                        labelFontSize: 14,
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
                        degree: 0,
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
                        trigger: "hover",
                        enable: true,
                        getContent: (e: any, items: Array<any>) => {
                            return createTooltipContent(e, items[0]);
                        }
                    },
                    {
                        type: 'legend',
                        titleText: '节点 & 关系',
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
                ]
            });
        }

        /** Adaptive window - extract the definition for easy uninstallation */
        const handleAfterLayout = () => {
            graph?.fitView();
        };


        if (data !== undefined && data !== null) {
            graph.setData(data);
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