import * as React from "react";
import PDFView from "../components/D/index"

export default class Demo extends React.Component{
    componentDidMount=()=>{
        window.title="DEMO: pdf view component"
    }
    render(){
        return (
            <React.Fragment>
                <PDFView filePath={"http://www.masteryu.site/mock/text-est.pdf?asd=123"} />


            </React.Fragment>
        )
    }
}