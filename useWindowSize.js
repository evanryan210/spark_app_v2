import { useEffect, useRef, useState } from 'react';
//type DeviceSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export var DeviceSize;
(function (DeviceSize) {
    DeviceSize[DeviceSize["xSmall"] = 0] = "xSmall";
    DeviceSize[DeviceSize["small"] = 1] = "small";
    DeviceSize[DeviceSize["medium"] = 2] = "medium";
    DeviceSize[DeviceSize["large"] = 3] = "large";
    DeviceSize[DeviceSize["xLarge"] = 4] = "xLarge";
})(DeviceSize || (DeviceSize = {}));
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
export const useWindowSize = () => {
    const body = document.getElementsByTagName('body')[0];
    let [width, setWidth] = useState(body.clientWidth);
    let [height, setHeight] = useState(body.clientHeight);
    let [deviceSize, setDeviceSize] = useState(calcDeviceSize(body.clientWidth));
    const clockRef = useRef();
    useEffect(() => {
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
