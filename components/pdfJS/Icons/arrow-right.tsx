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
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
            style={{
                pointerEvents:"none",
                display:"block",
                width:"100%",
                height:"100%",
                fill,
            }}>
                <g><path d="M7 5l0 10 5-5z"></path></g>
            </svg>
      
        )
    }
}