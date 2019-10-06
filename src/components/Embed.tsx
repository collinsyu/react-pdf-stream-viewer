/**
 * 使用 {{ type }} 为embed
 * 交给浏览器，自己不做控制了，和iframe一致
 * 这种格式只能用于 静态地址文件，不能用于流文件，开发者应该清楚自己的请求属于哪种
 */
import React from "react";

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        headers?: object | undefined;
        javascript?: string;
    }
}

export interface EmbedBoxProps {
    headers: object; 
    filePath: string;
    [key: string]: any;
}

const EmbedBox = (props: EmbedBoxProps) => <embed 
type="application/pdf" 
src={props.filePath}
headers={props.headers}
style={{width:"100%",height:"100%"}}
javascript="allow" 
full-frame=""/>

export default EmbedBox