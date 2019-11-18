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

                        <Button onClick={()=>{
                            this.setState({
                                filePath:`http://10.51.14.20:8081/s14-im/file/content/html?content=%3c!DOCTYPE+html%3e%3chtml+lang%3d%22en%22%3e%3chead%3e++%3cmeta+charset%3d%22UTF-8%22%3e++%3cmeta+name%3d%22viewport%22+content%3d%22width%3ddevice-width%2c+initial-scale%3d1.0%22%3e++%3cmeta+http-equiv%3d%22X-UA-Compatible%22+content%3d%22ie%3dedge%22%3e++%3ctitle%3eDocument%3c%2ftitle%3e%3c%2fhead%3e%3cbody%3e++hello+world%3c%2fbody%3e%3c%2fhtml%3e`,
                                fileName:"456"
                            })
                        }}>file3</Button>
                        <Button onClick={()=>{
                            this.setState({
                                filePath:``,
                                fileName:"456"
                            })
                        }}>file4</Button>
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