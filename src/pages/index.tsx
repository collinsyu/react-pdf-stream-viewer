import * as React from "react";
// import PDFView from "@/components";
// import PDFView from '../../lib';
import {PDFView} from 'react.pdf.stream';
import {Row,Col,Card} from "antd";
export default class Demo extends React.Component{
    componentDidMount=()=>{
        window.title="DEMO: pdf view-component"
    }
    render(){
        return (
            <React.Fragment>
                {/* <Row style={{height:60,background:"yellow"}}>header</Row>
                <div style={{display:"flex"}}>
                    <div style={{width:200,background:"gray"}}>sidebar</div>
                    <div style={{width:"600px",height:600}}> */}
                        <PDFView 
                        type="stream"
                        filePath={"http://10.51.14.20:8094/api/s14-im/file/content/18"}
                        />
                    {/* </div> */}
                {/* </div> */}
                


                
            </React.Fragment>
        )
    }
}