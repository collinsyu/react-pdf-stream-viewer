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
                <g><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
                </svg>   

   

        )
    }
}