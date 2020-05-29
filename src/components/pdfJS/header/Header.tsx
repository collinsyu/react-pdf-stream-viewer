import React,{ Component,PureComponent } from 'react'
import "./header.less";
import Icon from "../Icons";
import Pagination from "./pagination";
import Progress from "../progress";
import printJS from "print-js";
export interface ContainerProps {
    roate:() => any;
    show:boolean;
    [key: string]: any;
}
export default class Container extends PureComponent<ContainerProps> {
    animation_: any;
    header: any;
    roate: any;
    constructor(props: ContainerProps){
        super(props)
    }
    
    toggle=(show:boolean)=>{
        if (this.animation_) {
            this.animation_.cancel();
        }
        if (show) {
            this.animation_ = this.header.animate(
                [{transform: 'translateY(-100%)'}, {transform: 'translateY(0%)'}], {
                    duration: 250,
                    easing: 'cubic-bezier(0, 0, 0.2, 1)',
                    fill: 'forwards',
                });
            } else {
            this.animation_ = this.header.animate(
                [{transform: 'translateY(0%)'}, {transform: 'translateY(-100%)'}], {
                    duration: 250,
                    easing: 'cubic-bezier(0.4, 0, 1, 1)',
                    fill: 'forwards',
                });
        }
    }
    componentWillReceiveProps(nextProps:any){
        if(this.props.show !== nextProps.show){
            this.toggle(nextProps.show)
        }
    }
    componentDidMount(){
        
    }
    download=()=>{
        // NOTE: 2019-09-30 12:27:57 这里暂时可以直接调用打开链接下载，因为是流文件
        // console.log(this.props.filePath);
         const a = document.createElement("a");
       a.href = this.props.filePath;
       a.dispatchEvent(new MouseEvent("click"));
        
    }
    render(){
        const {process,filePath,roate,pageProps={},renderPDfByPage} = this.props;
        const { total=0, current} = pageProps
        
        return (
            <div className={"toolbarContainer"} ref={header=>this.header=header}>
                <div className={"toolbar"}>
                    <div className={"aligner"}>
                        {/* title */}
                        <span className={"title"} >
                            {this.props.fileName||"文件预览"}
                        </span>
                        {/* pagination */}
                        <Pagination
                        renderPDfByPage={renderPDfByPage}
                        total={total}
                        current={current}
                        />
                        {/* rightbar */}
                        <div className={"buttons"}>
                            <Icon type="roate-right" onClick={roate}/>
                            <Icon type="file-download" onClick={this.download}/>
                            <Icon type="print" onClick={()=>{
                                    printJS({
                                        printable: this.props.filePath,
                                    });
                            }}/>
                        </div>
                    </div>
                </div>
                <Progress process={process}/>
            </div>
        )
    }
}
