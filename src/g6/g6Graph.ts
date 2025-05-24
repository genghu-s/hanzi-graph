import { Graph } from '@antv/g6';

function handleGraph(data: any, ref: any) {
    // const legend = new Legend(context, {
    //     data: legendData,
    //     align: 'center',
    //     layout: 'vertical', // vertical
    //     position: 'bottom',
    //     vertiSep: 12,
    //     horiSep: 24,
    //     offsetY: -24,
    //     padding: [4, 16, 8, 16],
    //     containerStyle: {
    //         fill: '#ccc',
    //         // lineWidth: 1
    //     },
    //     type: 'legend',
    //     title: 'Legend (click to filter)',
    //     titleConfig: {
    //         position: 'center',
    //         offsetX: 50,
    //         offsetY: 5,
    //     },
    //     filter: {
    //         enable: true,
    //         multiple: true,
    //         trigger: 'click',
    //         graphActiveState: 'activeByLegend',
    //         graphInactiveState: 'inactiveByLegend',
    //         filterFunctions: {
    //             'CHARACTER': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'CHARACTER') return true;
    //                 return false
    //             },
    //             'PICTOGRAPHIC_RADICAL': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'PICTOGRAPHIC_RADICAL') return true;
    //                 return false
    //             },
    //             'PHONETIC_RADICAL': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'PHONETIC_RADICAL') return true;
    //                 return false
    //             },
    //             'SEMANTIC_COMPONENT': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'SEMANTIC_COMPONENT') return true;
    //                 return false
    //             },
    //             'COMPONENT': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'COMPONENT') return true;
    //                 return false
    //             },
    //             'INITIAL': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'INITIAL') return true;
    //                 return false
    //             },
    //             'FINAL': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'FINAL') return true;
    //                 return false
    //             },
    //             'TONE': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'TONE') return true;
    //                 return false
    //             },
    //             'COMPONENT_OF': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'COMPONENT_OF') return true;
    //                 return false
    //             },
    //             'SEMANTIC_COMPONENT_OF': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'SEMANTIC_COMPONENT_OF') return true;
    //                 return false
    //             },
    //             'PHONETIC_RADICAL_OF': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'PHONETIC_RADICAL_OF') return true;
    //                 return false
    //             },
    //             'PICTOGRAPHIC_RADICAL_OF': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'PICTOGRAPHIC_RADICAL_OF') return true;
    //                 return false
    //             },
    //             'INITIAL_OF': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'INITIAL_OF') return true;
    //                 return false
    //             },
    //             'FINAL_OF': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'FINAL_OF') return true;
    //                 return false
    //             },
    //             'TONE_OF': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'TONE_OF') return true;
    //                 return false
    //             },
    //             'TRANSFORMED_TO': (d: { legendType: string; }) => {
    //                 if (d.legendType === 'TRANSFORMED_TO') return true;
    //                 return false
    //             },
    //         }
    //     }
    // });

    // Set graph properties
    const graph = new Graph({
        container: ref.current,
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

    graph.setData(data);
    graph.render();
}

export default handleGraph;