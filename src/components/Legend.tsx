import { Legend, RuntimeContext } from "@antv/g6";
import typeConfigs from "../configs/typeConfigs";

const LegendContent = (context: RuntimeContext, edge: any) => {
    
     // Set legend data
     const legendData = {
        nodes: [{
            id: 'CHARACTER',
            label: 'CHARACTER',
            order: 0,
            ...typeConfigs['CHARACTER']
        }, {
            id: 'PICTOGRAPHIC_RADICAL',
            label: 'PICTOGRAPHIC_RADICAL',
            order: 1,
            ...typeConfigs['PICTOGRAPHIC_RADICAL']
        }, {
            id: 'PHONETIC_RADICAL',
            label: 'PHONETIC_RADICAL',
            order: 2,
            ...typeConfigs['PHONETIC_RADICAL']
        }, {
            id: 'SEMANTIC_COMPONENT',
            label: 'SEMANTIC_COMPONENT',
            order: 3,
            ...typeConfigs['SEMANTIC_COMPONENT']
        }, {
            id: 'COMPONENT',
            label: 'COMPONENT',
            order: 4,
            ...typeConfigs['COMPONENT']
        }, {
            id: 'INITIAL',
            label: 'INITIAL',
            order: 5,
            ...typeConfigs['INITIAL']
        }, {
            id: 'FINAL',
            label: 'FINAL',
            order: 6,
            ...typeConfigs['FINAL']
        }, {
            id: 'TONE',
            label: 'TONE',
            order: 7,
            ...typeConfigs['TONE']
        }],
        edges: [{
            id: 'COMPONENT_OF',
            label: 'COMPONENT_OF',
            order: 0,
            ...typeConfigs['COMPONENT_OF']
        }, {
            id: 'SEMANTIC_COMPONENT_OF',
            label: 'SEMANTIC_COMPONENT_OF',
            order: 1,
            ...typeConfigs['SEMANTIC_COMPONENT_OF']
        }, {
            id: 'PHONETIC_RADICAL_OF',
            label: 'PHONETIC_RADICAL_OF',
            order: 3,
            ...typeConfigs['PHONETIC_RADICAL_OF']
        }, {
            id: 'PICTOGRAPHIC_RADICAL_OF',
            label: 'PICTOGRAPHIC_RADICAL_OF',
            order: 2,
            ...typeConfigs['PICTOGRAPHIC_RADICAL_OF']
        }, {
            id: 'INITIAL_OF',
            label: 'INITIAL_OF',
            order: 4,
            ...typeConfigs['INITIAL_OF']
        }, {
            id: 'FINAL_OF',
            label: 'FINAL_OF',
            order: 5,
            ...typeConfigs['FINAL_OF']
        }, {
            id: 'TONE_OF',
            label: 'TONE_OF',
            order: 6,
            ...typeConfigs['TONE_OF']
        }, {
            id: 'TRANFORMED_TO',
            label: 'TRANFORMED_TO',
            order: 7,
            ...typeConfigs['TRANFORMED_TO']
        }]
    };
    
    const legend = new Legend(context, {
        data: legendData,
        align: 'center',
        layout: 'vertical', // vertical
        position: 'bottom',
        vertiSep: 12,
        horiSep: 24,
        offsetY: -24,
        padding: [4, 16, 8, 16],
        containerStyle: {
            fill: '#ccc',
            // lineWidth: 1
        },
        type: 'legend',
        title: 'Legend (click to filter)',
        titleConfig: {
            position: 'center',
            offsetX: 50,
            offsetY: 5,
        },
        filter: {
            enable: true,
            multiple: true,
            trigger: 'click',
            graphActiveState: 'activeByLegend',
            graphInactiveState: 'inactiveByLegend',
            filterFunctions: {
                'CHARACTER': (d: { legendType: string; }) => {
                    if (d.legendType === 'CHARACTER') return true;
                    return false
                },
                'PICTOGRAPHIC_RADICAL': (d: { legendType: string; }) => {
                    if (d.legendType === 'PICTOGRAPHIC_RADICAL') return true;
                    return false
                },
                'PHONETIC_RADICAL': (d: { legendType: string; }) => {
                    if (d.legendType === 'PHONETIC_RADICAL') return true;
                    return false
                },
                'SEMANTIC_COMPONENT': (d: { legendType: string; }) => {
                    if (d.legendType === 'SEMANTIC_COMPONENT') return true;
                    return false
                },
                'COMPONENT': (d: { legendType: string; }) => {
                    if (d.legendType === 'COMPONENT') return true;
                    return false
                },
                'INITIAL': (d: { legendType: string; }) => {
                    if (d.legendType === 'INITIAL') return true;
                    return false
                },
                'FINAL': (d: { legendType: string; }) => {
                    if (d.legendType === 'FINAL') return true;
                    return false
                },
                'TONE': (d: { legendType: string; }) => {
                    if (d.legendType === 'TONE') return true;
                    return false
                },
                'COMPONENT_OF': (d: { legendType: string; }) => {
                    if (d.legendType === 'COMPONENT_OF') return true;
                    return false
                },
                'SEMANTIC_COMPONENT_OF': (d: { legendType: string; }) => {
                    if (d.legendType === 'SEMANTIC_COMPONENT_OF') return true;
                    return false
                },
                'PHONETIC_RADICAL_OF': (d: { legendType: string; }) => {
                    if (d.legendType === 'PHONETIC_RADICAL_OF') return true;
                    return false
                },
                'PICTOGRAPHIC_RADICAL_OF': (d: { legendType: string; }) => {
                    if (d.legendType === 'PICTOGRAPHIC_RADICAL_OF') return true;
                    return false
                },
                'INITIAL_OF': (d: { legendType: string; }) => {
                    if (d.legendType === 'INITIAL_OF') return true;
                    return false
                },
                'FINAL_OF': (d: { legendType: string; }) => {
                    if (d.legendType === 'FINAL_OF') return true;
                    return false
                },
                'TONE_OF': (d: { legendType: string; }) => {
                    if (d.legendType === 'TONE_OF') return true;
                    return false
                },
                'TRANSFORMED_TO': (d: { legendType: string; }) => {
                    if (d.legendType === 'TRANSFORMED_TO') return true;
                    return false
                },
            }
        }
    });

    return legend;
};

export default LegendContent;