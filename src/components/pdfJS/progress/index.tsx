import React,{ Component,PureComponent } from 'react'
import "./index.less";

export interface ContainerProps {
    [key: string]: any;
}
export default class Container extends PureComponent<ContainerProps> {
    main: any;
    interval: any;
    p: number;
    constructor(props: ContainerProps){
        super(props);
        this.p=0;
    }
    componentWillReceiveProps(nextprops:any){
        if(nextprops.process != this.props.process){
            // console.log("next process",nextprops.process);
            
            if(nextprops.process == 100){
                // 清楚settimeinterval
    
                this.transformProgress(100);
                clearInterval(this.interval)
                // 消失
                setTimeout(() => {
                    this.main.style.visibility = "hidden"
                }, 200);
            }
            if(nextprops.process == 1){
                this.fakeloading()
                setTimeout(() => {
                    this.main.style.visibility = "visible"
                }, 200);
                
            }
        }
    }
    fakeloading=()=>{
        this.p = 0;
       // 先快后慢，永远不要到一百; 平均大概 10ms
        this.interval = setInterval(()=>{
            this.p = this.p + (90-this.p)*0.6;
            this.transformProgress(this.p);
        },720)
    }
    componentDidMount(){
        if(this.props.process>0){
            this.fakeloading()
        }
    }
    transformProgress(ratio=0) {
        if(!this.main){
            return
        }
        var transform = 'scaleX(' + (ratio / 100) + ')';
        this.main.style.transform = this.main.style.webkitTransform = transform;
    }
    render(){
        return (
            <div className={"progressContainer"}>
                <div className={"progressBar"}>
                    <div className={"progressBox"}> 
                        <div className={"secondaryProgress"}></div>
                        <div ref={main=>this.main=main} className={"primaryProgress"}></div>
                    </div>
                </div>
            </div>
        )
    }
}