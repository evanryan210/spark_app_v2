import { mergeStyles } from '@fluentui/merge-styles';
export const mainBackground = mergeStyles({
    position: 'absolute',
});
export const dynamicSpark = mergeStyles({
    height: '100%',
    width: '100%',
});
//Three.js parameters
export const parameterContainer = mergeStyles({
    padding: '20px',
    backgroundColor: '#DEDEDE',
    borderStyle: 'solid',
});
export const sliderContainer = mergeStyles({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
});
export const subSliderContainer = mergeStyles({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: '0 10px 10px 0',
    backgroundColor: 'rgb(181,176,176)',
    padding: '10px',
    borderRadius: '10px',
    justifyContent: 'space-between'
});
export const anotherSliderContainer = mergeStyles({
    width: '150px',
    border: '2px solid black'
});
export const slider = mergeStyles({});
export const parameterInput = mergeStyles({
    width: '75px'
});
