import React,{ Component,PureComponent } from 'react'
import './zoom.less';
import Icon from "./Icons/icon2"
import classnames from "classnames";
export interface ContainerProps {
    [key: string]: any;
}
export default class Container extends PureComponent<ContainerProps> {
    constructor(props: ContainerProps){
        super(props);
        
    }
    render(){
        const { show , screenType ,fullscreen,handleZoom ,step} = this.props;
        var boxstyle = {};
        boxstyle["zoom-buttons"] = true;
        boxstyle["hidden"] = !show;

        return (
            <div className={"zoomContainer"}>
                <div className={classnames(boxstyle)}>
                    {/* 动画写在这里 */}
                {screenType==="width"?
                <div className={"wrapper"} style={{transitionDelay:"100ms"}}>
                    <Icon type="screen" color="#636363" onClick={()=>{fullscreen(screenType)}}/>
                </div>
                :
                <div className={"wrapper"} style={{transitionDelay:"100ms"}}>
                    <Icon type="screen-shrik" color="#636363" onClick={()=>fullscreen(screenType)}/>

                </div>
                }
                
                
                <div className={"wrapper"} style={{transitionDelay:"50ms"}}>
                    <Icon type="plus"  color="#636363"onClick={()=>handleZoom("add")}/>

                </div>
                <div className={"wrapper"} style={{transitionDelay:"0ms"}}>
                    <Icon type="minus" color="#636363" onClick={()=>handleZoom("minus")}/>

                </div>
                </div>

            </div>
        )
    }
}