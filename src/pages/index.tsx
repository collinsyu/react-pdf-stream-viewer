import * as React from "react";
import PDFView from "@/components";
// import PDFView from '../../lib';
// import {PDFView} from 'react.pdf.stream';
import {Row,Col,Card, Button} from "antd";
export default class Demo extends React.Component{
    state={
        filePath:"",
        fileName:""
    }
    componentDidMount=()=>{
        window.title="DEMO: pdf view-component"
    }
    render(){
        return (
            <React.Fragment>
                <Row style={{height:60,background:"yellow"}}>header</Row>
                <div style={{display:"flex"}}>
                    <div style={{width:200,background:"gray"}}>
                        <Button onClick={()=>{
                            this.setState({
                                filePath:"http://10.51.14.20:8081/s14-im/file/content/19",
                                fileName:"123"
                            })
                        }}>file1</Button>
                        <Button onClick={()=>{
                            this.setState({
                                filePath:"http://10.51.14.20:8094/api/s14-im/file/content/18",
                                fileName:"456"
                            })
                        }}>file2</Button>
                    </div>
                    <div style={{width:"600px",height:600}}>
                        <PDFView 
                        fileName={this.state.fileName}
                        type="stream"
                        filePath={this.state.filePath}
                        />
                    </div>
                </div>
                


                
            </React.Fragment>
        )
    }
}