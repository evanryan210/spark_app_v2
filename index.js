import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import { useWindowSize } from './useWindowSize';
import Slider from '@mui/material/Slider';
import { PerspectiveCamera, Scene, BufferGeometry, LineSegments, LineBasicMaterial, Vector3, WebGLRenderer } from 'three';
import { useHotkeys } from 'react-hotkeys-hook';
// import './resources/Three'
const useSpark = (mainRef, rValue, shells, sliderValueX, rotation, pulseRate, translateX, translateY, numberOfLines, backgroundColor, alpha, elementHeight, elementWidth) => {
    const windowSize = useWindowSize();
    useEffect(() => {
        // if (!THREE.Supports.webgl) {
        //     document.getElementById("oldie").style.display = "block";
        // }
        let r = rValue, mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, camera, scene, renderer, stats;
        const lines = [];
        const scales = [];
        init();
        const interval = setInterval(loop, 3000 / 60);
        function init() {
            var container;
            container = mainRef.current;
            //mainRef.current?.appendChild(container);
            // camera = new THREE.Camera(80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
            camera = new PerspectiveCamera(80, elementWidth / elementHeight, 1, 3000);
            camera.position.z = 1000;
            scene = new Scene();
            //This array is the layers of the sphere, delete a subArray to remove a layer
            var i, line, vector1, vector2, material, p, 
            // parameters = [[0.25, 0xff7700, 1, 2], [0.5, 0xff9900, 1, 1], [0.75, 0xffaa00, 0.75, 1], [1, 0xffaa00, 0.5, 1], [1.25, 0x000833, 0.8, 1],
            // [3.0, 0xaaaaaa, 0.75, 2], [3.5, 0xffffff, 0.5, 1], [4.5, 0xffffff, 0.25, 1], [5.5, 0xffffff, 0.125, 1]],
            // parameters = [[0.25, 0xff7700, 1, 2], [0.5, 0xff9900, 1, 1], [0.75, 0xffaa00, 0.75, 1], [1, 0xffaa00, 0.5, 1], [1.25, 0x000833, 0.8, 1],
            // [3.0, 0xaaaaaa, 0.75, 2], [3.5, 0xffffff, 0.5, 1], [4.5, 0xffffff, 0.25, 1], [5.5, 0xffffff, 0.125, 1]],
            parameters = shells, 
            //geometry = new THREE.Geometry();
            geometry = new BufferGeometry();
            const points = [];
            for (i = 0; i < numberOfLines; ++i) {
                vector1 = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
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
                material = new LineBasicMaterial({ color: p[1], opacity: p[2], linewidth: 30 /* p[3]*/ });
                //LJ:line = new THREE.Line(geometry, material, THREE.LinePieces);
                //line = new THREE.LineSegments(geometry, material);
                lines.push(line = new LineSegments(geometry, material /*THREE.LinePieces*/));
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
            renderer = new WebGLRenderer({
                //LJ: Added
                antialias: true
            });
            //REMEMBER for tomorrow: Change translateMods to multiply by the size of the number given in setSize, make the parent div size be the setSize
            renderer.setSize(elementWidth, elementHeight);
            if (container)
                container.innerHTML = '';
            container === null || container === void 0 ? void 0 : container.appendChild(renderer.domElement);
            let xTranslateMod = (translateX - 50) / 100 * elementWidth;
            let yTranslateMod = (translateY - 50) / 100 * elementHeight;
            renderer.setViewport(xTranslateMod, yTranslateMod, elementWidth, elementHeight);
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
export const Spark = (props) => {
    //BUTTON TO ADD DEFAULT SHELL
    const [rValue, setRValue] = useState('1000');
    const [shells, setShells] = useState([[...newBaseShell]]);
    const [sliderValueX, setSliderValueX] = useState(50);
    const [rotation, setRotation] = useState(1);
    const [pulseRate, setPulseRate] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [translateX, setTranslateX] = useState(50);
    const [translateY, setTranslateY] = useState(50);
    const [numberOfLines, setNumberOfLines] = useState(1500);
    const [backgroundColor, setBackgroundColor] = useState(0xffffff);
    const [alpha, setAlpha] = useState(0);
    const [elementHeight, setElementHeight] = useState(100);
    const [elementWidth, setElementWidth] = useState(100);
    useHotkeys('ctrl+i', () => setIsOpen(!isOpen), [isOpen]);
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entry) => {
            console.log('Entry');
            console.log(entry[0].contentBoxSize[0]);
            setElementWidth(entry[0].contentBoxSize[0].inlineSize + 40);
            setElementHeight(entry[0].contentBoxSize[0].blockSize + 40);
        });
        const cleanUpResizeListener = () => {
            resizeObserver.disconnect();
        };
        if (props.parentElementRef.current)
            resizeObserver.observe(props.parentElementRef.current);
        return cleanUpResizeListener;
    }, []);
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
    const mainRef = useRef(null);
    useSpark(mainRef, Number(rValue), shells, sliderValueX, rotation, pulseRate, translateX, translateY, numberOfLines, backgroundColor, alpha, elementHeight, elementWidth);
    return (_jsxs("div", Object.assign({ className: styles.mainBackground }, { children: [isOpen && _jsxs("div", Object.assign({ className: styles.parameterContainer }, { children: [_jsxs("div", Object.assign({ style: { display: 'flex', flexDirection: 'row' } }, { children: [_jsxs("label", Object.assign({ htmlFor: 'rVal' }, { children: [" Universal Radius Scale", _jsx("input", { style: { width: '60px' }, value: rValue, id: 'rVal', onInput: (ev) => {
                                            setRValue(ev.currentTarget.value);
                                        } })] })), _jsxs("div", Object.assign({ style: { width: '200px' } }, { children: [_jsx("p", { children: "Translate X" }), _jsx("input", { type: 'number', value: translateX, onInput: (ev) => {
                                            setTranslateX(Number(ev.currentTarget.value));
                                        }, style: { width: '40px' } }), _jsx(Slider, { value: translateX, size: 'small', min: 0, max: 100, className: styles.slider, onChange: (ev, value) => {
                                            setTranslateX(value);
                                        } })] }), 'translateX'), _jsxs("div", Object.assign({ style: { width: '200px' } }, { children: [_jsx("p", { children: "Translate Y" }), _jsx("input", { type: 'number', value: translateY, onInput: (ev) => {
                                            setTranslateY(Number(ev.currentTarget.value));
                                        }, style: { width: '40px' } }), _jsx(Slider, { value: translateY, size: 'small', min: 0, max: 100, className: styles.slider, onChange: (ev, value) => {
                                            setTranslateY(value);
                                        } })] }), 'translateY'), _jsxs("div", Object.assign({ className: styles.anotherSliderContainer }, { children: [_jsx("p", { children: "Background Color: " }), _jsx("input", { type: 'color', value: '#' + backgroundColor.toString(16), onChange: (ev) => {
                                            console.log(backgroundColor);
                                            let hexValue = parseInt(ev.currentTarget.value.substring(1), 16);
                                            setBackgroundColor(hexValue);
                                        } })] }), 'backgroundColor'), _jsxs("div", Object.assign({ className: styles.anotherSliderContainer }, { children: [_jsx("p", { children: "Alpha: " }), _jsx("input", { className: styles.parameterInput, value: alpha, onInput: (ev) => {
                                            setAlpha(Number(ev.currentTarget.value));
                                        } })] }), 'alpha')] }), 'universalParams'), _jsx("button", Object.assign({ onClick: addDefaultShell }, { children: "Add shell" })), _jsx("br", {}), _jsx("div", Object.assign({ className: styles.sliderContainer }, { children: shells.map((shell, index) => {
                            return (_jsxs("div", Object.assign({ className: styles.subSliderContainer }, { children: [_jsx("h2", { children: 'Shell: ' + (index + 1) }), _jsxs("div", Object.assign({ className: styles.anotherSliderContainer }, { children: [_jsx("p", { children: "Scale:" }), _jsx("input", { value: shell[0] * 100, onInput: (ev) => {
                                                    shell[0] = Number(ev.currentTarget.value) / 100;
                                                    setShells([...shells]);
                                                }, className: styles.parameterInput }), _jsx(Slider, { size: 'small', className: styles.slider, onChange: (ev, value) => {
                                                    shell[0] = value / 100;
                                                    setShells([...shells]);
                                                }, min: 0, max: 100, value: shell[0] * 100 })] }), 'scale'), _jsxs("div", Object.assign({ className: styles.anotherSliderContainer }, { children: [_jsx("p", { children: "Opacity:" }), _jsx("input", { className: styles.parameterInput, value: shell[2] * 100, onInput: (ev) => {
                                                    shell[2] = Number(ev.currentTarget.value) / 100;
                                                    setShells([...shells]);
                                                } }), _jsx(Slider, { size: 'small', className: styles.slider, onChange: (ev, value) => {
                                                    shell[2] = value / 100;
                                                    setShells([...shells]);
                                                }, min: 0, max: 100, value: shell[2] * 100 })] }), 'opacity'), _jsxs("div", Object.assign({ className: styles.anotherSliderContainer }, { children: [_jsx("p", { children: "Rev Speed" }), _jsx("input", { type: 'number', value: rotation, onInput: (ev) => {
                                                    setRotation(Number(ev.currentTarget.value));
                                                }, className: styles.parameterInput }), _jsx(Slider, { size: 'small', className: styles.slider, value: rotation, onChange: (ev, value) => {
                                                    setRotation(value);
                                                }, min: 0, max: 20 })] }), 'revSpeed'), _jsxs("div", Object.assign({ className: styles.anotherSliderContainer }, { children: [_jsx("p", { children: "Pulse Rate:" }), _jsx("input", { type: 'number', value: pulseRate, onInput: (ev) => {
                                                    setPulseRate(Number(ev.currentTarget.value));
                                                }, className: styles.parameterInput }), _jsx(Slider, { value: pulseRate, size: 'small', min: 0, max: 100, className: styles.slider, onChange: (ev, value) => {
                                                    setPulseRate(value);
                                                } })] }), 'pulseRate'), _jsxs("div", Object.assign({ className: styles.anotherSliderContainer }, { children: [_jsx("p", { children: "Vectors" }), _jsx("input", { type: 'number', value: numberOfLines, onInput: (ev) => {
                                                    setNumberOfLines(Number(ev.currentTarget.value));
                                                }, className: styles.parameterInput }), _jsx(Slider, { value: numberOfLines, size: 'small', min: 0, max: 4000, className: styles.slider, onChange: (ev, value) => {
                                                    setNumberOfLines(value);
                                                } })] }), 'vectors'), _jsxs("div", Object.assign({ className: styles.anotherSliderContainer }, { children: [_jsx("p", { children: "Color: " }), _jsx("input", { type: 'color', value: '#' + shell[1].toString(16), onChange: (ev) => {
                                                    let hexValue = parseInt(ev.currentTarget.value.substring(1), 16);
                                                    shell[1] = Number(hexValue);
                                                    setShells([...shells]);
                                                } })] }), 'color'), _jsx("a", Object.assign({ style: { cursor: 'pointer' }, onClick: () => {
                                            removeShell(index);
                                        } }, { children: "\u2716" }))] }), `shell_${index}`));
                        }) }), 'sliderContainer')] }), 'parameterBox'), _jsx("div", { className: styles.dynamicSpark, ref: mainRef }, 'dynamicSpark')] })));
};
