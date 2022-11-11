import React, { useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import { DeviceSize, useWindowSize } from './useWindowSize';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import {PerspectiveCamera, Scene, BufferGeometry, LineSegments, LineBasicMaterial, Vector3, WebGLRenderer } from 'three'
import { renderIntoDocument } from 'react-dom/test-utils';
import { Color } from 'three';
import { useHotkeys } from 'react-hotkeys-hook';
import { height } from '@mui/system';



// import './resources/Three'

const useSpark = (mainRef: React.RefObject<HTMLDivElement>, rValue: number, shells: Shell[], sliderValueX: number, rotation: number, pulseRate: number, translateX: number, translateY: number, numberOfLines: number, backgroundColor: number, alpha: number, elementHeight: number, elementWidth: number) => {
    const windowSize = useWindowSize();
    useEffect(() => {
        // if (!THREE.Supports.webgl) {
        //     document.getElementById("oldie").style.display = "block";
        // }

        let 
            r = rValue,

            mouseX = 0, mouseY = 0,

            windowHalfX = window.innerWidth / 2,
            windowHalfY = window.innerHeight / 2,

            camera: any, scene: THREE.Scene, renderer: THREE.WebGLRenderer,

            stats;


        const lines: THREE.LineSegments[] = [];
        const scales: number[] = [];

        init();
        const interval = setInterval(loop, 3000 / 60);

        function init() {

            var container;

            container = mainRef.current
            //mainRef.current?.appendChild(container);


            // camera = new THREE.Camera(80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
            camera = new PerspectiveCamera(80, elementWidth / elementHeight, 1, 3000);

            camera.position.z = 1000;

            scene = new Scene();

            //This array is the layers of the sphere, delete a subArray to remove a layer
            var i, line: any, vector1, vector2, material, p,
                // parameters = [[0.25, 0xff7700, 1, 2], [0.5, 0xff9900, 1, 1], [0.75, 0xffaa00, 0.75, 1], [1, 0xffaa00, 0.5, 1], [1.25, 0x000833, 0.8, 1],
                // [3.0, 0xaaaaaa, 0.75, 2], [3.5, 0xffffff, 0.5, 1], [4.5, 0xffffff, 0.25, 1], [5.5, 0xffffff, 0.125, 1]],

                // parameters = [[0.25, 0xff7700, 1, 2], [0.5, 0xff9900, 1, 1], [0.75, 0xffaa00, 0.75, 1], [1, 0xffaa00, 0.5, 1], [1.25, 0x000833, 0.8, 1],
                // [3.0, 0xaaaaaa, 0.75, 2], [3.5, 0xffffff, 0.5, 1], [4.5, 0xffffff, 0.25, 1], [5.5, 0xffffff, 0.125, 1]],
                parameters = shells,
                //geometry = new THREE.Geometry();
                geometry = new BufferGeometry()


            const points: Vector3[] = []
            for (i = 0; i < numberOfLines; ++i) {

                vector1 = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                vector1.normalize();
                vector1.multiplyScalar(r);

                vector2 = vector1.clone();
                vector2.multiplyScalar(Math.random() * 0.09 + 1);

                //LJ: geometry.vertices.push(new THREE.Vertex(vector1));
                //LJ: geometry.vertices.push(new THREE.Vertex(vector2));
                points.push(vector1);
                points.push(vector2); points.push()

            }
            geometry.setFromPoints(points);


            for (i = 0; i < parameters.length; ++i) {
                p = parameters[i];

                material = new LineBasicMaterial({ color: p[1], opacity: p[2], linewidth: 30/* p[3]*/ });
                //LJ:line = new THREE.Line(geometry, material, THREE.LinePieces);
                //line = new THREE.LineSegments(geometry, material);
                lines.push(
                    line = new LineSegments(geometry, material /*THREE.LinePieces*/));
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
                container.innerHTML = ''
            container?.appendChild(renderer.domElement);


            let xTranslateMod = (translateX - 50)/100 * elementWidth
            let yTranslateMod = (translateY - 50)/100 * elementHeight

            renderer.setViewport(xTranslateMod, yTranslateMod, elementWidth, elementHeight)
            renderer.setClearColor(backgroundColor, alpha)
            

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

        function onDocumentMouseMove(event: any) {

            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;

        }

        function onDocumentTouchStart(event: any) {

            if (event.touches.length > 1) {

                // event.preventDefault();

                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
            }

        }

        function onDocumentTouchMove(event: any) {

            if (event.touches.length == 1) {

                // event.preventDefault();

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

                lines[i].rotation.y = time * (i < 4 ? i + 1 : - (i + 1)) * rotation;
                if (i < shells.length) {
                    lines[i].scale.x =
                        lines[i].scale.y =
                        lines[i].scale.z =
                        (scales[i] * (i / 5 + 1) * (1 + 0.5 * Math.sin(7 * time * pulseRate/20)));

                }
            }

            //stats.update();

        }

        const cleanUp = () => {
            clearInterval(interval);
        }
        return cleanUp;
    }, [rValue, elementWidth, elementHeight, shells, mainRef, sliderValueX, rotation, pulseRate, translateX, translateY, numberOfLines, backgroundColor, alpha])
}

type Shell = [
    number,
    number,
    number,
    number,
]

const newBaseShell: Shell = [0.35, 0xff7700, 1, 2];

interface Spark {
    scale: number,
    height?: number;
    width?: number;
    parentElementRef: React.MutableRefObject<HTMLElement | null>;
    pulseRate?: number;
}


export const Spark = (props: Spark) => {


    //BUTTON TO ADD DEFAULT SHELL
    const [rValue, setRValue] = useState<number>(props.scale);
    const [shells, setShells] = useState<Shell[]>([[...newBaseShell]]);
    const [sliderValueX, setSliderValueX] = useState<number | number[]>(50);
    const [rotation, setRotation] = useState<number>(1);
    const [pulseRate, setPulseRate] = useState(props.pulseRate);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [translateX, setTranslateX] = useState<number>(50)
    const [translateY, setTranslateY] = useState<number>(50)
    const [numberOfLines, setNumberOfLines] = useState<number>(1500)
    const [backgroundColor, setBackgroundColor] = useState<number>(0xffffff)
    const [alpha, setAlpha] = useState<number>(0)
    const [elementHeight, setElementHeight] = useState(props.height)
    const [elementWidth, setElementWidth] = useState(props.width)

    useHotkeys('ctrl+i', () => setIsOpen(!isOpen), [isOpen])

    useEffect(() =>{
        console.log('version 1.0.3')
        console.log('i ran on first pass')
        const resizeObserver = new ResizeObserver((entry)=>{
            let count = 0;
            console.log('I ran inside my observer')
            count++;
            setElementWidth(entry[0].contentBoxSize[0].inlineSize + 40)
            setElementHeight(entry[0].contentBoxSize[0].blockSize + 40)
        })
        const cleanUpResizeListener = () =>{
            resizeObserver.disconnect()
        }
        if(props.parentElementRef.current)
            resizeObserver.observe(props.parentElementRef.current)
        return cleanUpResizeListener;
    },[elementHeight, elementWidth])



    const addDefaultShell = () => {
        setShells((existingShells) => [...existingShells, [...newBaseShell]]);
        console.log(shells.length)
    }
    const removeShell = (index: number) =>{
        shells.splice(index, index+1);
        setShells((existingShells) =>[...existingShells]);
    }
    // const addCustomShell = (ev: any) => {
    //     setShells((prevParameters) => [...prevParameters, [aValue as number, Number(color), Number(bValue), Number(cValue)]]);
    //     ev.preventDefault();
    // }
    const handleSliderChangeX: ((event: Event, value: number | number[], activeThumb: number) => void) | undefined = (ev, value, activeThumb) => {
        setSliderValueX(value as number * 10)
    }
    // const handleAValueChange: ((event: Event, value: number | number[], activeThumb: number) => void) | undefined = (ev, value) => {
    //     setAValue(value as number)
    //     console.log(shells)
    // }

    const mainRef = useRef<HTMLDivElement>(null);


    

    useSpark(mainRef, rValue, shells, sliderValueX as number, rotation as number, pulseRate as number, translateX as number, translateY as number, numberOfLines as number, backgroundColor as number, alpha as number, elementHeight as number, elementWidth as number)
    
    return (
        <div className={styles.mainBackground}>
            {/* button was here */}

            {/* Parameter Box */}
            <div key='parameterBox' className={isOpen? styles.parameterContainerOpen : styles.parameterContainerClosed}>
                <div key='universalParams' style={{ display: 'flex', flexDirection: 'row' }}>

                    <label htmlFor='rVal'> Universal Radius Scale
                        <input style={{ width: '60px' }} value={rValue} id='rVal' onInput={(ev) => {
                            setRValue(Number(ev.currentTarget.value))
                        }}></input>
                    </label>
                    <div key='translateX' style={{width:'200px'}}>
                        <p>Translate X</p>
                        <input type='number' value={translateX} onInput={(ev) => {
                            setTranslateX(Number(ev.currentTarget.value))
                        }} style={{ width: '40px' }}></input>
                        <Slider value={translateX} size='small' min={0} max={100} className={styles.slider} onChange={(ev, value) => {
                            setTranslateX(value as number)
                        }} />
                    </div>
                    <div key='translateY' style={{width:'200px'}}>
                        <p>Translate Y</p>
                        <input type='number' value={translateY} onInput={(ev) => {
                            setTranslateY(Number(ev.currentTarget.value))
                        }} style={{ width: '40px' }}></input>
                        <Slider value={translateY} size='small' min={0} max={100} className={styles.slider} onChange={(ev, value) => {
                            setTranslateY(value as number)
                        }} />
                    </div>
                    <div key='backgroundColor' className={styles.anotherSliderContainer}>
                        <p>Background Color: </p>
                        <input type='color' value={'#' + backgroundColor.toString(16)} onChange={(ev) => {
                            console.log(backgroundColor)
                            let hexValue = parseInt(ev.currentTarget.value.substring(1), 16)
                            setBackgroundColor(hexValue)
                        }}></input>
                    </div>
                    <div key='alpha' className={styles.anotherSliderContainer}>
                        <p>Alpha: </p>
                        <input className={styles.parameterInput} value={alpha} onInput={(ev) => {
                            setAlpha(Number(ev.currentTarget.value))
                        }}></input>
                    </div>
                </div>
                <button onClick={addDefaultShell}>Add shell</button><br />
                <div key='sliderContainer' className={styles.sliderContainer}>
                    {shells.map((shell, index) => {
                        return (
                            <div key={`shell_${index}`}className={styles.subSliderContainer}>
                                <h2>{'Shell: ' + (index + 1)}</h2>

                                <div key='scale' className={styles.anotherSliderContainer}>
                                    <p>Scale:</p>
                                    <input value={shell[0] * 100} onInput={(ev) => {
                                        shell[0] = Number(ev.currentTarget.value) / 100
                                        setShells([...shells])
                                    }} className={styles.parameterInput}></input>
                                    <Slider size='small' className={styles.slider} onChange={(ev, value) => {
                                        shell[0] = value as number / 100;
                                        setShells([...shells])
                                    }} min={0} max={100} value={shell[0] * 100} />
                                </div>

                                <div key='opacity' className={styles.anotherSliderContainer}>
                                    <p>Opacity:</p>
                                    <input className={styles.parameterInput} value={shell[2] * 100} onInput={(ev) => {
                                        shell[2] = Number(ev.currentTarget.value) / 100
                                        setShells([...shells])
                                    }}></input>
                                    <Slider size='small' className={styles.slider} onChange={(ev, value) => {
                                        shell[2] = value as number / 100;
                                        setShells([...shells])
                                    }} min={0} max={100} value={shell[2] * 100} />
                                </div>

                                <div key='revSpeed' className={styles.anotherSliderContainer}>
                                    <p>Rev Speed</p>
                                    <input type='number' value={rotation} onInput={(ev) => {
                                        setRotation(Number(ev.currentTarget.value))
                                    }} className={styles.parameterInput}></input>
                                    <Slider size='small' className={styles.slider} value={rotation} onChange={(ev, value) => {
                                        setRotation(value as number)
                                    }} min={0} max={20} />
                                </div>

                                <div key='pulseRate' className={styles.anotherSliderContainer}>
                                    <p>Pulse Rate:</p>
                                    <input type='number' value={pulseRate} onInput={(ev) => {
                                        setPulseRate(Number(ev.currentTarget.value))
                                    }} className={styles.parameterInput}></input>
                                    <Slider value={pulseRate} size='small' min={0} max={100} className={styles.slider} onChange={(ev, value) => {
                                        setPulseRate(value as number)
                                    }} />
                                </div>

                                <div key='vectors' className={styles.anotherSliderContainer}>
                                    <p>Vectors</p>
                                    <input type='number' value={numberOfLines} onInput={(ev) => {
                                        setNumberOfLines(Number(ev.currentTarget.value))
                                    }} className={styles.parameterInput}></input>
                                    <Slider value={numberOfLines} size='small' min={0} max={4000} className={styles.slider} onChange={(ev, value) => {
                                        setNumberOfLines(value as number)
                                    }} />
                                </div>


                                <div key='color' className={styles.anotherSliderContainer}>
                                    <p>Color: </p>
                                    <input type='color' value={'#' + shell[1].toString(16)} onChange={(ev) => {
                                        let hexValue = parseInt(ev.currentTarget.value.substring(1), 16)
                                        shell[1] = Number(hexValue)
                                        setShells([...shells])
                                    }}></input>
                                </div>

                                {/* Delete Shell */}
                                <a style={{cursor: 'pointer'}} onClick={()=>{
                                    removeShell(index);
                                }}>&#10006;</a>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* End Parameter Box */}

            <div key='dynamicSpark' className={styles.dynamicSpark} ref={mainRef}></div>

            {/* Start of main section */}
        </div>
    )
  
}
