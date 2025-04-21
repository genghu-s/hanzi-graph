import typeConfigs from "./typeConfigs";

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

export default legendData;