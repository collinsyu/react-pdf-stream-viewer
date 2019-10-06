import React,{ Component,PureComponent } from 'react'

export interface ContainerProps {
    [key: string]: any;
}
export default class Container extends PureComponent<ContainerProps> {
    constructor(props: ContainerProps){
        super(props)
    }
    render(){
        const { fill="#fff" } = this.props;
        return (
           

    <svg viewBox="0 0 24 24" 
    preserveAspectRatio="xMidYMid meet" 
    focusable="false" 
    style={{
        pointerEvents:"none",
        display:"block",
        width:"100%",
        height:"100%",
        fill,
    }}>
        <g><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
    </svg>
        )
    }
}