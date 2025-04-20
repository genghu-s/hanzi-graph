import { useEffect, useState } from "react";
import { Graph } from "@antv/g6";

function HanziGraph(data: any) {
    const [graphData, setgraphData] = useState(data);
    let graph: Graph | null = null;

    useEffect(() => {
        setgraphData(data);
        console.log(data);
        if (data.data !== undefined) {
            graph = new Graph({
                container: 'container',
                width: 1200,
                height: 800,
                // modes: {
                //     default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
                // },
                // plugins: [legend],
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
                            fill: 'white'
                        },
                    }
                },
                edge: {
                    type: 'triangle'
                }
            });

            graph.setData(data.data);
            graph.render();
        }
    }, [data]);

    return (
        <>
            <div id='container'>
            </div>
        </>
    );
};

export default HanziGraph;