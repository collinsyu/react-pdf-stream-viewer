import React, { Component } from 'react';
import EmbedBox from "./Embed";
import Iframe from "./Iframe";
import PdfJS from "./pdfJS";



export interface PDFViewProps {
  type?: string;
  filePath: string;
  headers?: any;
}


export default class PDFView extends Component<PDFViewProps> {
  constructor(props: Readonly<PDFViewProps>){
    super(props)
  }
  render(){
    const {type="stream",filePath,headers,...reset} = this.props;
    if(type === "embed"){
      return <EmbedBox headers={headers} filePath={filePath} {...reset}/>
    }

    if(type === "iframe"){
      return <Iframe headers={headers} filePath={filePath} {...reset}/>
    }
    if(type === "stream"){
      return <PdfJS filePath={filePath} {...reset}/>
    }
  }
}
  
