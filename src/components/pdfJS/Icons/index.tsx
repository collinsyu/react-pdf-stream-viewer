import React,{ Component,PureComponent } from 'react'
import RoateRight from "./roate-right";
import FileDownload from "./file-download";
import Print from "./print";
import Minus from "./minus";
import Plus from "./plus";
import Screen from "./screen";
import ScreenShirk from "./screen-shirk";
import "./icon.less";


function getOffsetTop(obj){
var tmp = obj.offsetTop;
var val = obj.offsetParent;
while(val != null){
    tmp += val.offsetTop;
    val = val.offsetParent;
}
return tmp;
}
function getOffsetLeft(obj){
var tmp = obj.offsetLeft;
var val = obj.offsetParent;
while(val != null){
    tmp += val.offsetLeft;
    val = val.offsetParent;
}
return tmp;
}


export interface ContainerProps {
    [key: string]: any;
}
export default class Container extends PureComponent<ContainerProps> {
    ripple: any;
    wrapper: any;
    constructor(props: ContainerProps){
        super(props);
        this.state={
            animation:false,
        }
    }
    end=()=>{
        
    }
    start = (e)=>{
        // NOTE: 这里有一个bug，因为wave放大之后，
        // 点击的就不再是外层的wrapper了，导致e不同，最终后面设置起点错误
        // 第一种解决的办法就是不用e，单独为wrapper设置一个 ref
        // 我不想用上面的
        // 用css 的z-index，也不行，我放弃了
        // 就用第一种办法吧emmmmm ri～

        
        e.persist(); // react16 syncEvent
        this.ripple.classList.remove("animate-ripple");
        // console.log(this.wrapper);
        
        var CW = this.wrapper.clientWidth;
        var CT = getOffsetTop(this.wrapper);
        var CL = getOffsetLeft(this.wrapper);
        var MX = e.clientX;
        var MY = e.clientY;
        // console.log("容器宽度",CW);
        // console.log("容器top",CT);
        // console.log("容器left",CL);
        // console.log("鼠标点击x",MX);
        // console.log("鼠标点击y",MY);
        let _x:number  = MX - CL;
        let _y:number  = MY - CT;
        var x = parseInt(_x.toString()) - (CW / 2);
        var y = parseInt(_y.toString()) - (CW / 2);
        
        // 重新设置ripple 位置
        // console.log(x,y);
        
        
        this.ripple.style.left = x+"px";
        this.ripple.style.top = y+"px";
        // console.log(this.ripple.style.left);
        // console.log(this.ripple.style.top);
        setTimeout(() => {
            
            this.ripple.classList.add("animate-ripple");

        }, 0);
    }
    render(){
        const { type,color } = this.props;
        var dom:any = null;
        
        switch (type) {
            case "roate-right":
                dom =  <RoateRight fill={color}/>
                break;
            case "file-download":
                dom =  <FileDownload fill={color}/>
                break;
            case "print":
                dom =  <Print fill={color}/>
                break;
        
            case "minus":
                dom =  <Minus fill={color}/>
                break;
            
            case "plus":
                dom =  <Plus fill={color}/>
                break;

            case "screen":
                dom =  <Screen fill={color}/>
                break;

            case "screen-shirk":
                dom =  <ScreenShirk fill={color}/>
                break;
            default:
                break;
        }
        

        return (
            <div className={"iconContainer-v"} onClick={()=>{
                if(this.props.onClick){
                    this.props.onClick()
                }
            }}>
                <div className={"iconBox-v"}>
                    <div className={"icon-v"}>
                        {dom}
                    </div>
                    <div className={`rippleWrapper-v`}
                    // onMouseUp={this.end}
                    ref={wrapper=>this.wrapper=wrapper}  
                    onMouseDown={this.start}
                    >
                        <div 
                        
                        ref={ripple=>this.ripple=ripple} 
                        className={"ripple-v"}>

                        </div>
                        
                    </div>


                </div>
            </div>
        )
    }
}