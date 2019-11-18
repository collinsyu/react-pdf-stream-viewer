
English | [简体中文](https://github.com/collinsyu/react-pdf-stream-viewer/blob/master/README-zh_CN.md)

# A react component to show pdf with stream data
> Step forward everyday and never stop, your hard work will never be wasted and always have something in return.

# ✨Features

* support view pdf with stream data
* same ui with default chrome pdf-viewer plugins

# 📦 Install
`npm install react.pdf.stream --save`


# 🔨 Usage
```javascript
import PDFView from 'react.pdf.stream';
ReactDOM.render(<PDFView filePath="required" />, mountNode);
```


# Props
`params` you can set some default props in this, like `httpHeaders`...

`filePath` file request url

`fileName` file name

# 🤝 Contributing


# [Porcess](https://github.com/collinsyu/react-pdf-stream-viewer/blob/master/update.md)






# TODO 
1. for now the file is show in type of canvas and cannot be modified, such as adding annotion; so next step is to transform in different situation to show pdf for editing pdf and highlight someting.
2. Browser Compatibility
3. read pdf.js and write a new one
3. 。。。