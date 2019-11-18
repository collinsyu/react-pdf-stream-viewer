
[English](./README.md) | 简体中文

# 一个pdf展示组件
>日拱一卒无有尽,功不唐捐终入海

支持流pdf文件预览 和 静态pdf文件预览

本组件最大亮点是支持 ~流~pdf文件预览，而且加上了 类似chrome 默认pdf的功能按钮样式



# ✨ 功能
1. 支持流pdf文件预览
2. ui和chrome默认ui一致

# 📦 安装
`npm install react.pdf.stream --save`


# 🔨 示例
```javascript
import PDFView from 'react.pdf.stream';
ReactDOM.render(<PDFView filePath="required" />, mountNode);
```

# 参数
`params` 这里面可以设置请求头`httpHeaders` 和其他一些pdfjs支持的参数

`filePath` 文件请求地址

`fileName` 文件名称
# 🤝 欢迎提bug

    

# [更新记录](https://github.com/collinsyu/react-pdf-stream-viewer/blob/master/update-zh_CN.md)






# TODO 
1. 目前pdf文件被转换成canvas，不能编辑和复制，编辑修改pdf，保存；需要判断pdf类型，是否是图片还是文本，针对文本，可以进行编辑 highlight等
2. 兼容性测试
3. 。。。