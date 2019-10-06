import React,{ Component,PureComponent } from 'react'
import "./index.less";
import GestureDetector from "./gesture_detector";
// import Viewport from './viewpoer';
export interface ContainerProps {
    [key: string]: any;
}

function getScrollbarWidth() {
    const div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.style.overflow = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.position = 'absolute';
    document.body.appendChild(div);
    const result = div.offsetWidth - div.clientWidth;
    div.parentNode.removeChild(div);
    return result;
}

export default class Container extends PureComponent<ContainerProps> {
    pdfviewer: HTMLDivElement
    gestureDetector_: GestureDetector;
    sentPinchEvent_:boolean;
    viewport_: any;
    constructor(props: ContainerProps){
        super(props)
        this.sentPinchEvent_ = false;
    }
   

    /**
     * A callback that's called when an update to a pinch zoom is detected.
     * @param {!Object} e the pinch event.
     * @private
     */
    onPinchUpdate_(e) {
        // Throttle number of pinch events to one per frame.
            console.log("update",e);
        if (!this.sentPinchEvent_) {
        this.sentPinchEvent_ = true;
        window.requestAnimationFrame(() => {
            this.sentPinchEvent_ = false;
            // 在这里应该现叠加 翻倍数量，然后不重新渲染pdf，只将其放大
            // this.viewport_.pinchZoom(e);
            
        });
        }
    }

    /**
     * A callback that's called when the end of a pinch zoom is detected.
     * @param {!Object} e the pinch event.
     * @private
     */
    onPinchEnd_(e) {
            console.log("end",e);
            // Using rAF for pinch end prevents pinch updates scheduled by rAF getting
        // sent after the pinch end.
        window.requestAnimationFrame(() => {
            // 最终是在这里重新渲染
            // this.viewport_.pinchZoomEnd(e);
            let d = e.startScaleRatio-1>0?"add":"minus";
            let step = Math.abs(e.startScaleRatio-1)
            this.props.handleZoom(d,step);
        });
    }

    /**
     * A callback that's called when the start of a pinch zoom is detected.
     * @param {!Object} e the pinch event.
     * @private
     */
    onPinchStart_(e) {
            console.log("start",e);
        // We also use rAF for pinch start, so that if there is a pinch end event
        // scheduled by rAF, this pinch start will be sent after.
        window.requestAnimationFrame(() => {
            // this.viewport_.pinchZoomStart(e);
        });
    }
    componentDidMount(){
        /** @private {!GestureDetector} */
        // this.viewport_ = new Viewport(window, this.pdfviewer, getScrollbarWidth(), 0.25, 0);
        // this.gestureDetector_ = new GestureDetector(this.pdfviewer);
        // this.gestureDetector_.addEventListener('pinchstart', e => {
        //     this.onPinchStart_(e);   
        // }
        // );
        // this.sentPinchEvent_ = false;
        // this.gestureDetector_.addEventListener( 'pinchupdate', e => {
        //     this.onPinchUpdate_(e);
            
        // });
        // this.gestureDetector_.addEventListener('pinchend', e => {
        //     this.onPinchEnd_(e);
            
        // });
    }
    render(){
        return (
            <div className={"pdfViewer"} id="the-canvas-container" ref={pdfviewer=>this.pdfviewer = pdfviewer}>
                <canvas id="the-canvas" className={"canvas"}></canvas>
            </div>
        )
    }
}