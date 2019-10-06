import * as React from "react";
// import PDFView from "@/components";
// import PDFView from '../../lib';
import {PDFView} from 'react.pdf.stream';

export default class Demo extends React.Component{
    componentDidMount=()=>{
        window.title="DEMO: pdf view component"
    }
    render(){
        return (
            <React.Fragment>
                <PDFView 
                type="stream"
                filePath={"http://10.51.14.20:8094/api/s14-im/file/content/18"}
                />


                
            </React.Fragment>
        )
    }
}