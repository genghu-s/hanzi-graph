const typeConfigs = {
    'CHARACTER': {
        type: 'circle',
        size: 10,
        style: {
            fill: 'lightgreen'
        }
    },
    'PICTOGRAPHIC_RADICAL': {
        type: 'circle',
        size: 10,
        style: {
            fill: 'orange'
        }
    },
    'PHONETIC_RADICAL': {
        type: 'circle',
        size: 10,
        style: {
            fill: 'pink'
        }
    },
    'SEMANTIC_COMPONENT': {
        type: 'circle',
        size: 10,
        style: {
            fill: 'lightblue'
        }
    },
    'COMPONENT': {
        type: 'circle',
        size: 10,
        style: {
            fill: 'gray'
        }
    },
    'INITIAL': {
        type: 'circle',
        size: 10,
        style: {
            fill: 'hotpink'
        }
    },
    'FINAL': {
        type: 'circle',
        size: 10,
        style: {
            fill: 'indianred'
        }
    },
    'TONE': {
        type: 'circle',
        size: 10,
        style: {
            fill: 'palevioletred'
        }
    },
    'COMPONENT_OF': {
        type: 'line',
        style: {
            width: 20,
            stroke: 'gray',
        }
    },
    'SEMANTIC_COMPONENT_OF': {
        type: 'line',
        style: {
            width: 20,
            stroke: 'lightblue',
        }
    },
    'PHONETIC_RADICAL_OF': {
        type: 'line',
        style: {
            width: 20,
            stroke: 'pink',
        }
    },
    'PICTOGRAPHIC_RADICAL_OF': {
        type: 'line',
        style: {
            width: 20,
            stroke: 'orange',
        }
    },
    'INITIAL_OF': {
        type: 'line',
        style: {
            width: 20,
            stroke: 'hotpink',
        }
    },
    'FINAL_OF': {
        type: 'line',
        style: {
            width: 20,
            stroke: 'indianred',
        }
    },
    'TONE_OF': {
        type: 'line',
        style: {
            width: 20,
            stroke: 'palevioletred',
        }
    },
    'TRANFORMED_TO': {
        type: 'line',
        style: {
            width: 20,
            stroke: 'aqua',
        }
    },
};

export default typeConfigs;