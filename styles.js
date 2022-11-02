"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parameterInput = exports.slider = exports.anotherSliderContainer = exports.subSliderContainer = exports.sliderContainer = exports.parameterContainer = exports.dynamicSpark = exports.mainBackground = void 0;
const merge_styles_1 = require("@fluentui/merge-styles");
exports.mainBackground = (0, merge_styles_1.mergeStyles)({
    position: 'relative',
});
exports.dynamicSpark = (0, merge_styles_1.mergeStyles)({
    position: 'absolute',
    height: '100%',
    width: '100%',
});
//Three.js parameters
exports.parameterContainer = (0, merge_styles_1.mergeStyles)({
    padding: '20px',
    backgroundColor: '#DEDEDE',
    borderStyle: 'solid',
});
exports.sliderContainer = (0, merge_styles_1.mergeStyles)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
});
exports.subSliderContainer = (0, merge_styles_1.mergeStyles)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: '0 10px 10px 0',
    backgroundColor: 'rgb(181,176,176)',
    padding: '10px',
    borderRadius: '10px',
    justifyContent: 'space-between'
});
exports.anotherSliderContainer = (0, merge_styles_1.mergeStyles)({
    width: '150px',
    border: '2px solid black'
});
exports.slider = (0, merge_styles_1.mergeStyles)({});
exports.parameterInput = (0, merge_styles_1.mergeStyles)({
    width: '75px'
});
