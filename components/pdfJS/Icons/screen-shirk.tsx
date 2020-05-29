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
    <g><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>
    </svg>
   

        )
    }
}