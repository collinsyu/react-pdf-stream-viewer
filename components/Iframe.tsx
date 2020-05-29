/**
 * 使用 {{ type }} 为embed
 * 交给浏览器，自己不做控制了，和iframe一致
 * 这种格式只能用于 静态地址文件，不能用于流文件，开发者应该清楚自己的请求属于哪种
 * TODO: 这里需要完成对iframe的请求头控制：大概思路是用ajax请求获得内容，塞到iframe里面去
 * 
 */
import React from "react";

declare module 'react' {
    interface IframeHTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        border?:string;
        frameborder?: string;
    }
}

export interface EmbedBoxProps {
    headers: object; 
    filePath: string; 
}

const EmbedBox = (props: EmbedBoxProps) => <iframe
src={props.filePath}
headers={props.headers}
style={{width:"100%",height:"100%"}}
frameborder="no" border="0"
scrolling="auto"/>

export default EmbedBox