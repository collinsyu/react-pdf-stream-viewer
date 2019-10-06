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
                <g><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
                    </svg>   

   


        )
    }
}