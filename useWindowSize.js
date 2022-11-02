"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = exports.DeviceSize = void 0;
const react_1 = require("react");
//type DeviceSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
var DeviceSize;
(function (DeviceSize) {
    DeviceSize[DeviceSize["xSmall"] = 0] = "xSmall";
    DeviceSize[DeviceSize["small"] = 1] = "small";
    DeviceSize[DeviceSize["medium"] = 2] = "medium";
    DeviceSize[DeviceSize["large"] = 3] = "large";
    DeviceSize[DeviceSize["xLarge"] = 4] = "xLarge";
})(DeviceSize = exports.DeviceSize || (exports.DeviceSize = {}));
//takes the width and returns he device size as text
const calcDeviceSize = (w) => {
    if (w < 600) {
        return DeviceSize.xSmall;
    }
    else if (w >= 600 && w < 768) {
        return DeviceSize.small;
    }
    else if (w >= 768 && w < 992) {
        return DeviceSize.medium;
    }
    else if (w >= 992 && w < 1200) {
        return DeviceSize.large;
    }
    else {
        return DeviceSize.xLarge;
    }
};
const useWindowSize = () => {
    const body = document.getElementsByTagName('body')[0];
    let [width, setWidth] = (0, react_1.useState)(body.clientWidth);
    let [height, setHeight] = (0, react_1.useState)(body.clientHeight);
    let [deviceSize, setDeviceSize] = (0, react_1.useState)(calcDeviceSize(body.clientWidth));
    const clockRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        let eventListener = () => {
            const w = body.clientWidth;
            const h = body.clientHeight;
            //creates variable to capture device size of each screen resize 
            clearTimeout(clockRef.current);
            clockRef.current = setTimeout(() => {
                setWidth(w);
                setHeight(h);
                const deviceSize = calcDeviceSize(w);
                setDeviceSize(deviceSize);
            }, 300);
        };
        window.addEventListener('resize', eventListener);
        const cleanup = () => {
            window.removeEventListener('resize', eventListener);
        };
        return cleanup;
    }, []);
    return ({
        width,
        height,
        deviceSize
    });
};
exports.useWindowSize = useWindowSize;
