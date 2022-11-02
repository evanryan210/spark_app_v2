"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spark = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styles = __importStar(require("./styles"));
const useWindowSize_1 = require("./useWindowSize");
const Slider_1 = __importDefault(require("@mui/material/Slider"));
const THREE = __importStar(require("three"));
// import './resources/Three'
//colors, pulse rate, #of shells
const useSpark = (mainRef, rValue, shells, sliderValueX, rotation, pulseRate, translateX, translateY, numberOfLines, backgroundColor, alpha) => {
    const windowSize = (0, useWindowSize_1.useWindowSize)();
    (0, react_1.useEffect)(() => {
        // if (!THREE.Supports.webgl) {
        //     document.getElementById("oldie").style.display = "block";
        // }
        let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight, r = rValue, mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, camera, scene, renderer, stats;
        const lines = [];
        const scales = [];
        init();
        const interval = setInterval(loop, 3000 / 60);
        function init() {
            var container;
            container = mainRef.current;
            //mainRef.current?.appendChild(container);
            // camera = new THREE.Camera(80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
            camera = new THREE.PerspectiveCamera(80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
            camera.position.z = 1000;
            scene = new THREE.Scene();
            //This array is the layers of the sphere, delete a subArray to remove a layer
            var i, line, vector1, vector2, material, p,
                // parameters = [[0.25, 0xff7700, 1, 2], [0.5, 0xff9900, 1, 1], [0.75, 0xffaa00, 0.75, 1], [1, 0xffaa00, 0.5, 1], [1.25, 0x000833, 0.8, 1],
                // [3.0, 0xaaaaaa, 0.75, 2], [3.5, 0xffffff, 0.5, 1], [4.5, 0xffffff, 0.25, 1], [5.5, 0xffffff, 0.125, 1]],
                // parameters = [[0.25, 0xff7700, 1, 2], [0.5, 0xff9900, 1, 1], [0.75, 0xffaa00, 0.75, 1], [1, 0xffaa00, 0.5, 1], [1.25, 0x000833, 0.8, 1],
                // [3.0, 0xaaaaaa, 0.75, 2], [3.5, 0xffffff, 0.5, 1], [4.5, 0xffffff, 0.25, 1], [5.5, 0xffffff, 0.125, 1]],
                parameters = shells,
                //geometry = new THREE.Geometry();
                geometry = new THREE.BufferGeometry();
            const points = [];
            for (i = 0; i < numberOfLines; ++i) {
                vector1 = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                vector1.normalize();
                vector1.multiplyScalar(r);
                vector2 = vector1.clone();
                vector2.multiplyScalar(Math.random() * 0.09 + 1);
                //LJ: geometry.vertices.push(new THREE.Vertex(vector1));
                //LJ: geometry.vertices.push(new THREE.Vertex(vector2));
                points.push(vector1);
                points.push(vector2);
                points.push();
            }
            geometry.setFromPoints(points);
            for (i = 0; i < parameters.length; ++i) {
                p = parameters[i];
                material = new THREE.LineBasicMaterial({ color: p[1], opacity: p[2], linewidth: 30 /* p[3]*/ });
                //LJ:line = new THREE.Line(geometry, material, THREE.LinePieces);
                //line = new THREE.LineSegments(geometry, material);
                lines.push(line = new THREE.LineSegments(geometry, material /*THREE.LinePieces*/));
                line.scale.x = line.scale.y = line.scale.z = p[0];
                //LJ: line.originalScale = p[0];
                scales.push(p[0]);
                line.rotation.y = Math.random() * Math.PI;
                line.updateMatrix();
                // line.position.x = 400
                // line.position.y = -400
                //LJ:scene.addObject(line);
                scene.add(line);
            }
            renderer = new THREE.WebGLRenderer({
                //LJ: Added
                antialias: true
            });
            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
            if (container)
                container.innerHTML = '';
            container === null || container === void 0 ? void 0 : container.appendChild(renderer.domElement);
            let xTranslateMod = (translateX - 50) / 100 * SCREEN_WIDTH;
            let yTranslateMod = (translateY - 50) / 100 * SCREEN_HEIGHT;
            renderer.setViewport(xTranslateMod, yTranslateMod, SCREEN_WIDTH, SCREEN_HEIGHT);
            renderer.setClearColor(backgroundColor, alpha);
            /*
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            container.appendChild(stats.domElement);
            */
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, { passive: false });
        }
        function onDocumentMouseMove(event) {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        }
        function onDocumentTouchStart(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
            }
        }
        function onDocumentTouchMove(event) {
            if (event.touches.length == 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
            }
        }
        // camera.position.x = 1000;
        // camera.position.y = 1000;
        //
        function loop() {
            //  camera.position.x += ( mouseX - camera.position.x ) * .05;
            //  camera.position.y += (- mouseY + 200 - camera.position.y) * .05;
            camera.updateMatrix();
            renderer.render(scene, camera);
            var time = new Date().getTime() * 0.0001;
            // for (var i = 0; i < scene.objects.length; i++) {
            //     //Rotation controller
            //     scene.objects[i].rotation.y = time * (i < 4 ? i + 1 : - (i + 1)) * rotation;
            //     if (i < 5)
            //         scene.objects[i].scale.x =
            //             scene.objects[i].scale.y =
            //             scene.objects[i].scale.z =
            //             (scene.objects[i].originalScale * (i / 5 + 1) * (1 + 0.5 * Math.sin(7 * time * pulseRate)));
            // }
            for (var i = 0; i < lines.length; i++) {
                //Rotation controller
                lines[i].rotation.y = time * (i < 4 ? i + 1 : -(i + 1)) * rotation;
                if (i < shells.length) {
                    lines[i].scale.x =
                        lines[i].scale.y =
                        lines[i].scale.z =
                        (scales[i] * (i / 5 + 1) * (1 + 0.5 * Math.sin(7 * time * pulseRate / 20)));
                }
            }
            //stats.update();
        }
        const cleanUp = () => {
            clearInterval(interval);
        };
        return cleanUp;
    }, [rValue, windowSize.width, windowSize.height, shells, mainRef, sliderValueX, rotation, pulseRate, translateX, translateY, numberOfLines, backgroundColor, alpha]);
};
const newBaseShell = [0.25, 0xff7700, 1, 2];
const Spark = () => {
    //BUTTON TO ADD DEFAULT SHELL
    const [rValue, setRValue] = (0, react_1.useState)('1000');
    const [shells, setShells] = (0, react_1.useState)([[...newBaseShell]]);
    const [sliderValueX, setSliderValueX] = (0, react_1.useState)(50);
    const [rotation, setRotation] = (0, react_1.useState)(1);
    const [pulseRate, setPulseRate] = (0, react_1.useState)(1);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [translateX, setTranslateX] = (0, react_1.useState)(50);
    const [translateY, setTranslateY] = (0, react_1.useState)(50);
    const [numberOfLines, setNumberOfLines] = (0, react_1.useState)(1500);
    const [backgroundColor, setBackgroundColor] = (0, react_1.useState)(0xffffff);
    const [alpha, setAlpha] = (0, react_1.useState)(0);
    const addDefaultShell = () => {
        setShells((existingShells) => [...existingShells, [...newBaseShell]]);
        console.log(shells.length);
    };
    const removeShell = (index) => {
        shells.splice(index, index + 1);
        setShells((existingShells) => [...existingShells]);
    };
    // const addCustomShell = (ev: any) => {
    //     setShells((prevParameters) => [...prevParameters, [aValue as number, Number(color), Number(bValue), Number(cValue)]]);
    //     ev.preventDefault();
    // }
    const handleSliderChangeX = (ev, value, activeThumb) => {
        setSliderValueX(value * 10);
    };
    // const handleAValueChange: ((event: Event, value: number | number[], activeThumb: number) => void) | undefined = (ev, value) => {
    //     setAValue(value as number)
    //     console.log(shells)
    // }
    const mainRef = (0, react_1.useRef)(null);
    useSpark(mainRef, Number(rValue), shells, sliderValueX, rotation, pulseRate, translateX, translateY, numberOfLines, backgroundColor, alpha);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.mainBackground }, {
        children: [(0, jsx_runtime_1.jsx)("button", Object.assign({
            onClick: () => {
                setIsOpen(!isOpen);
                console.log(isOpen);
            }
        }, { children: "Settings" })), isOpen && (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.parameterContainer }, {
            children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: 'flex', flexDirection: 'row' } }, {
                children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: 'rVal' }, {
                    children: [" Universal Radius Scale", (0, jsx_runtime_1.jsx)("input", {
                        style: { width: '60px' }, value: rValue, id: 'rVal', onInput: (ev) => {
                            setRValue(ev.currentTarget.value);
                        }
                    })]
                })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { width: '200px' } }, {
                    children: [(0, jsx_runtime_1.jsx)("p", { children: "Translate X" }), (0, jsx_runtime_1.jsx)("input", {
                        type: 'number', value: translateX, onInput: (ev) => {
                            setTranslateX(Number(ev.currentTarget.value));
                        }, style: { width: '40px' }
                    }), (0, jsx_runtime_1.jsx)(Slider_1.default, {
                        value: translateX, size: 'small', min: 0, max: 100, className: styles.slider, onChange: (ev, value) => {
                            setTranslateX(value);
                        }
                    })]
                })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { width: '200px' } }, {
                    children: [(0, jsx_runtime_1.jsx)("p", { children: "Translate Y" }), (0, jsx_runtime_1.jsx)("input", {
                        type: 'number', value: translateY, onInput: (ev) => {
                            setTranslateY(Number(ev.currentTarget.value));
                        }, style: { width: '40px' }
                    }), (0, jsx_runtime_1.jsx)(Slider_1.default, {
                        value: translateY, size: 'small', min: 0, max: 100, className: styles.slider, onChange: (ev, value) => {
                            setTranslateY(value);
                        }
                    })]
                })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.anotherSliderContainer }, {
                    children: [(0, jsx_runtime_1.jsx)("p", { children: "Background Color: " }), (0, jsx_runtime_1.jsx)("input", {
                        type: 'color', value: '#' + backgroundColor.toString(16), onChange: (ev) => {
                            console.log(backgroundColor);
                            let hexValue = parseInt(ev.currentTarget.value.substring(1), 16);
                            setBackgroundColor(hexValue);
                        }
                    })]
                })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.anotherSliderContainer }, {
                    children: [(0, jsx_runtime_1.jsx)("p", { children: "Alpha: " }), (0, jsx_runtime_1.jsx)("input", {
                        className: styles.parameterInput, value: alpha, onInput: (ev) => {
                            setAlpha(Number(ev.currentTarget.value));
                        }
                    })]
                }))]
            })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: addDefaultShell }, { children: "Add shell" })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.sliderContainer }, {
                children: shells.map((shell, index) => {
                    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.subSliderContainer }, {
                        children: [(0, jsx_runtime_1.jsx)("h2", { children: 'Shell: ' + (index + 1) }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.anotherSliderContainer }, {
                            children: [(0, jsx_runtime_1.jsx)("p", { children: "Scale:" }), (0, jsx_runtime_1.jsx)("input", {
                                value: shell[0] * 100, onInput: (ev) => {
                                    shell[0] = Number(ev.currentTarget.value) / 100;
                                    setShells([...shells]);
                                }, className: styles.parameterInput
                            }), (0, jsx_runtime_1.jsx)(Slider_1.default, {
                                size: 'small', className: styles.slider, onChange: (ev, value) => {
                                    shell[0] = value / 100;
                                    setShells([...shells]);
                                }, min: 0, max: 100, value: shell[0] * 100
                            })]
                        })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.anotherSliderContainer }, {
                            children: [(0, jsx_runtime_1.jsx)("p", { children: "Opacity:" }), (0, jsx_runtime_1.jsx)("input", {
                                className: styles.parameterInput, value: shell[2] * 100, onInput: (ev) => {
                                    shell[2] = Number(ev.currentTarget.value) / 100;
                                    setShells([...shells]);
                                }
                            }), (0, jsx_runtime_1.jsx)(Slider_1.default, {
                                size: 'small', className: styles.slider, onChange: (ev, value) => {
                                    shell[2] = value / 100;
                                    setShells([...shells]);
                                }, min: 0, max: 100, value: shell[2] * 100
                            })]
                        })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.anotherSliderContainer }, {
                            children: [(0, jsx_runtime_1.jsx)("p", { children: "Rev Speed" }), (0, jsx_runtime_1.jsx)("input", {
                                type: 'number', value: rotation, onInput: (ev) => {
                                    setRotation(Number(ev.currentTarget.value));
                                }, className: styles.parameterInput
                            }), (0, jsx_runtime_1.jsx)(Slider_1.default, {
                                size: 'small', className: styles.slider, value: rotation, onChange: (ev, value) => {
                                    setRotation(value);
                                }, min: 0, max: 20
                            })]
                        })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.anotherSliderContainer }, {
                            children: [(0, jsx_runtime_1.jsx)("p", { children: "Pulse Rate:" }), (0, jsx_runtime_1.jsx)("input", {
                                type: 'number', value: pulseRate, onInput: (ev) => {
                                    setPulseRate(Number(ev.currentTarget.value));
                                }, className: styles.parameterInput
                            }), (0, jsx_runtime_1.jsx)(Slider_1.default, {
                                value: pulseRate, size: 'small', min: 0, max: 100, className: styles.slider, onChange: (ev, value) => {
                                    setPulseRate(value);
                                }
                            })]
                        })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.anotherSliderContainer }, {
                            children: [(0, jsx_runtime_1.jsx)("p", { children: "Vectors" }), (0, jsx_runtime_1.jsx)("input", {
                                type: 'number', value: numberOfLines, onInput: (ev) => {
                                    setNumberOfLines(Number(ev.currentTarget.value));
                                }, className: styles.parameterInput
                            }), (0, jsx_runtime_1.jsx)(Slider_1.default, {
                                value: numberOfLines, size: 'small', min: 0, max: 4000, className: styles.slider, onChange: (ev, value) => {
                                    setNumberOfLines(value);
                                }
                            })]
                        })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.anotherSliderContainer }, {
                            children: [(0, jsx_runtime_1.jsx)("p", { children: "Color: " }), (0, jsx_runtime_1.jsx)("input", {
                                type: 'color', value: '#' + shell[1].toString(16), onChange: (ev) => {
                                    let hexValue = parseInt(ev.currentTarget.value.substring(1), 16);
                                    shell[1] = Number(hexValue);
                                    setShells([...shells]);
                                }
                            })]
                        })), (0, jsx_runtime_1.jsx)("a", Object.assign({
                            style: { cursor: 'pointer' }, onClick: () => {
                                removeShell(index);
                            }
                        }, { children: "\u2716" }))]
                    })));
                })
            }))]
        })), (0, jsx_runtime_1.jsx)("div", { className: styles.dynamicSpark, ref: mainRef })]
    })));
};
exports.Spark = Spark;
