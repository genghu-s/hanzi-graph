const CharColorMap = new Map();
/**
 * Leveling color sequence
 * "CHARACTER",
 * "PICTOGRAPHIC_RADICAL" 
 * "PHONETIC_RADICAL",
 * "SEMANTIC_COMPONENT",
 * "COMPONENT",
 */

CharColorMap.set("CHARACTER", {seq: 0});
CharColorMap.set("PICTOGRAPHIC_RADICAL", {seq: 1});
CharColorMap.set("PHONETIC_RADICAL", {seq: 2});
CharColorMap.set("SEMANTIC_COMPONENT", {seq: 3});
CharColorMap.set("COMPONENT", {seq: 4});
CharColorMap.set("INITIAL", {seq: 5});
CharColorMap.set("FINAL", {seq: 6});
CharColorMap.set("TONE", {seq: 7});

const LineColorMap = new Map();
LineColorMap.set("COMPONENT_OF", "gray");
LineColorMap.set("SEMANTIC_COMPONENT_OF", "lightblue");
LineColorMap.set("PHONETIC_RADICAL_OF", "pink");
LineColorMap.set("PICTOGRAPHIC_RADICAL_OF", "orange");
LineColorMap.set("INITIAL_OF", "hotpink");
LineColorMap.set("FINAL_OF", "indianred");
LineColorMap.set("TONE_OF", "palevioletred");
LineColorMap.set("TRANSFORMED_TO", "aqua");

const NodeColorMap = new Map();
NodeColorMap.set(0, {style: {lineWidth: 2, fill: "lightgreen", actived: {fill: "lightgreen"}}});
NodeColorMap.set(1, {style: {lineWidth: 2, fill: "orange", actived: {fill: "orange"}}});
NodeColorMap.set(2, {style: {lineWidth: 2, fill: "pink", actived: {fill: "pink"}}});
NodeColorMap.set(3, {style: {lineWidth: 2, fill: "lightblue", actived: {fill: "lightblue"}}});
NodeColorMap.set(4, {style: {lineWidth: 2, fill: "gray", actived: {fill: "gray"}}});
NodeColorMap.set(5, {style: {lineWidth: 2, fill: "hotpink", actived: {fill: "hotpink"}}});
NodeColorMap.set(6, {style: {lineWidth: 2, fill: "indianred", actived: {fill: "indianred"}}});
NodeColorMap.set(7, {style: {lineWidth: 2, fill: "palevioletred", actived: {fill: "palevioletred"}}});

export { CharColorMap, NodeColorMap, LineColorMap };