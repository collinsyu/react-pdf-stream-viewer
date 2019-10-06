import React,{ Component,PureComponent } from 'react'
import "./pagination.less";
import ArrowLeft from "../Icons/arrow-left";
import ArrowRight from "../Icons/arrow-right";


export interface ContainerProps {
    [key: string]: any;
}
export default class Container extends PureComponent<ContainerProps,ContainerProps> {
    value: any
    constructor(props: ContainerProps){
        super(props)
        this.state={
            value:1
        }
        this.value =1;
    }
    componentDidMount=()=>{

    }
    componentWillUnmount=()=>{

    }
    componentWillReceiveProps(nextprops){
        if(nextprops.current != this.value){
            this.value = nextprops.current;
            this.setState({value:nextprops.current})
        }
    }
    onchange = (e)=>{
        let val = e.target.value ;
        val = val.replace(/[^\d]/, '');
        this.setState({value:val})
        this.value = val;
    }
    onblur = (e)=>{
        let value = Number.parseInt(this.value);
        this.go(value)
    }
    onkeydown=(e)=>{
        if(e.keyCode == "13"){
            let value = Number.parseInt(this.value);
            this.go(value)
        }
    }
    go=(page)=>{
        const {total=0} = this.props;
        if(page>total){ page = total }
        if(page<1){page=1}
        this.value = page;
        this.setState({value:page})
        this.props.renderPDfByPage({current:page})
    }
    onarraw = (go)=>{
        var nextpage = this.state.value;
        if(go){
            nextpage = nextpage + 1
        }else{
            nextpage = nextpage - 1
        }
        this.go(nextpage)
    }
    render(){
        const {total=0} = this.props;
        const {value} = this.state;
        let x = total.toString().length;
        console.log("total",total);
        
        if(!total){
            return null
        }
        return (
            <div className={"pagination"}>
                <div className={"pageselector"}>
                    <span onClick={()=>{this.onarraw(false)}} style={{width:20,cursor:value==1?"not-allowed":"pointer"}}>
                        <ArrowLeft />
                    </span>
                    <div className={"pageselector_container"} style={{width:`calc(${x}ch)`}}>
                        <div className={"row_container"} >
                            <div className={"input_container"}>
                                <div className={"inner_input_container"}>
                                    <input 
                                    onKeyDown={this.onkeydown}
                                    value={value} 
                                    onChange={this.onchange}
                                    aria-label="页码" 
                                    onBlur={this.onblur}/>
                                </div>
                                <div className={"underline"}></div>
                            </div>
                        </div>
                    </div>
                    <span>/</span>
                    <span className={"total"}>{total}</span>
                    <span onClick={()=>{this.onarraw(true)}} style={{width:20,cursor:value==total?"not-allowed":"pointer"}}>
                        <ArrowRight />
                    </span>
                </div>
            </div>
        )
    }
}