import React, { PureComponent, Component } from 'react';
import './index.less';
import loadScript from "../utils/loadScript";
import Header from "./header/Header"
import Zoom from "./Zoom"
import Viewer from "./Viewer"

import Throttle from 'lodash-decorators/throttle';
import {
  isMouseNearTopToolbar,
  isMouseNearSideToolbar,
} from "./utils/toolbar"
/** Distance from the top of the screen required to reveal the toolbars. */


/** Idle time in ms before the UI is hidden. */
const HIDE_TIMEOUT = 2000;

interface IndexProps{
  [key: string]: any;

}
export default class PDFView extends Component<IndexProps,IndexProps> {
  isMouseNearTopToolbar_: any;
  isMouseNearSideToolbar_: any;
  zoom: any;
  isRender: boolean;
  window_: Window & typeof globalThis;
  toolbarTimeout_: any;
  reverseSideToolbar_: boolean;
  staticZoomWidth: number;
  staticZoomHeight: number;
  PDF: any;
  screenType: string | undefined;
  container: HTMLDivElement;
  fileLoader: boolean;
  taskStack: any[];
  
  constructor(props:IndexProps) {
    super(props);
    this.state = {
      pageProps:{
        total: 0,
        current: 1,
        rotation:0,
        zoom:1,
      },
      screenType:"width",
      loading: false,
      showToolbar:true,
      showZoombar:true,
      process:0,
    };
    this.isRender = false;
    this.staticZoomWidth = 0;
    this.staticZoomHeight = 0;
    this.window_ = window;
    this.isMouseNearSideToolbar_ = false;
    this.isMouseNearTopToolbar_ = false;
    this.reverseSideToolbar_ = false;
    this.fileLoader=false;
    this.taskStack = [];
  }
  componentWillReceiveProps(nextProps:any) {
    if (this.props.filePath !== nextProps.filePath) {
      // console.log("will receive props",nextProps.filePath);
      
      this.resetData();
      this.isRender = false;
      this.staticZoomWidth = 0;
      this.staticZoomHeight = 0;
      this.window_ = window;
      this.isMouseNearSideToolbar_ = false;
      this.isMouseNearTopToolbar_ = false;
      this.reverseSideToolbar_ = false;
      this.fileLoader=false;
      this.beforeCreatedPDF(nextProps.filePath);
      
    }
  }
  hideToolbarsIfAllowed = ()=>{
    // TODO: 这里暂时先不加 判断 toolbar 和 screenbar，暂时统一管理
    // 排除鼠标已经靠近停留在bar附近
    if(this.isMouseNearTopToolbar_||this.isMouseNearSideToolbar_){
      return 
    }
    // 
    this.setState({
      showToolbar:false,
      showZoombar:false,
    })
    
  }
  hideToolbarsAfterTimeout() {
    
    if (this.toolbarTimeout_) {
      this.window_.clearTimeout(this.toolbarTimeout_);
    }
    if(!this.fileLoader){
      return
    }
    this.toolbarTimeout_ = this.window_.setTimeout(
        this.hideToolbarsIfAllowed, HIDE_TIMEOUT);
  }
  handleMouseMove=(e:any)=>{
    // 之所以这样写，是因为组件可能不是最顶层的，可能会放到各种位置容器，不一定是body
    let showToolbar = isMouseNearTopToolbar({y:e.y - this.container.offsetTop} as any);
    // 判断 当前bar状态 和 距离
    // let showToolbar = isMouseNearTopToolbar(e);
    this.isMouseNearTopToolbar_ = showToolbar;

    let showZoombar = isMouseNearSideToolbar({
      y:e.y - this.container.offsetTop,
      x:e.x + window.innerWidth - this.container.offsetWidth - this.container.offsetLeft
    } as any, this.window_, this.reverseSideToolbar_);
    this.isMouseNearSideToolbar_ = showZoombar;
    let x = this.state.showToolbar && this.state.showZoombar;
    if(!x){
      if(showToolbar||showZoombar){
        this.setState({
          showToolbar:true,
          showZoombar:true
        })
      }
    }
    
    this.hideToolbarsAfterTimeout()
  }
  @Throttle(400)
  handleMouseEvent_(e:any) {
    // console.log(e);
    
    if (e.type == 'mousemove') {
      this.handleMouseMove(e);
    } 
    // else if (e.type == 'mouseout') {
    //   this.toolbarManager_.hideToolbarsForMouseOut();
    // }
  }
  // NOTE: 记住了！！！注册监听事件，千万不要用尖头函数，不能被移除
  nameMouseEvent=e=>{
    this.handleMouseEvent_(e)
  }
  componentWillUnmount(){
    
    document.removeEventListener('mousemove', this.nameMouseEvent);

  }
  beforeCreatedPDF=(filePath:string)=>{
    if(!filePath){
      return;
    }
    if (!(window as any).pdfjsLib) {
      loadScript('https://cdn.bootcss.com/pdf.js/2.2.228/pdf.min.js', () => {
        //加载,并执行回调函数
        this.createPDF(filePath);
      });
    } else {
      this.createPDF(filePath);
    }
  }
  componentDidMount() {
    // console.log('pdf components did mount ');
    // console.log('add mousemove listener');
    document.addEventListener('mousemove', this.nameMouseEvent);
    const { filePath } = this.props;
    this.beforeCreatedPDF(filePath) 
  }
  setStaticZoom=()=>{
    var canvas = document.getElementById('the-canvas');

    var container = document.getElementById('the-canvas-container');
    this.staticZoomWidth = (container as any).offsetWidth / (canvas as any).width;
    this.staticZoomHeight = ((container as any).offsetHeight-60) / (canvas as any).height;
    // console.log("⚠️⚠️⚠️⚠️这里应该只执行一次",this.staticZoomWidth,this.staticZoomHeight);
    
  }
  createPDF = (fileurl:string)=> {
    const {params} = this.props;
    // NOTE: 2019-09-26 09:33:39 这里处理下loading
    this.setState({process:1})
    let __t0 = Date.now();
    
    this.setState({ loading: true });
    this.isRender = true;
    // debugger
    var _self = this;
    var pdfjsLib = (window as any).pdfjsLib;

    var loadingTask = pdfjsLib.getDocument({
      url:fileurl,
      ...params
    });
    var loadingTask = pdfjsLib.getDocument(fileurl);
    // console.log(loadingTask);
    // console.log(loadingTask.taskStack);
    
    this.taskStack.push(fileurl);
    // console.log("start create pdf stream process",this.taskStack);

    loadingTask.promise
    .then(
      function(pdf:any) {
        throw {status:"done",data:pdf,fileurl}
        // var _l = _self.taskStack[_self.taskStack.length-1];
        // console.log("pdf create success",_l);
        
        // if(!_l._transport){
        //   throw "pending";
        // }
        
      },
      function(reason:any) {
        // PDF loading error
        alert('文件流获取失败');
        throw {status:"error"}
      }
    )
    .catch((err)=>{
      // console.log("after ",err);
      
      if(typeof(err) === "object"){
        
        if(err.status ==="done"){
          if(err.fileurl !== this.taskStack[this.taskStack.length-1]){
            return
          }
          
          
          // console.log('PDF Object created use time ', (__t0-Date.now())/1000+"ms");
          _self.PDF = err.data;
          console.log(_self.PDF);
          
          let pageProps = _self.state.pageProps;
          pageProps.total = _self.PDF._pdfInfo.numPages
          // 修改total
          _self.setState({ pageProps, loading: false });
          _self.renderPDfByPage({current:1},"",() => {
            // 定时hide toolbar and screenbar ,注意这里暂时写在这里，应该写在文档加载完之后
            _self.hideToolbarsAfterTimeout();
            _self.setState({process:100});
            _self.setStaticZoom()
            _self.fileLoader=true;
            
            return true
          });
        }
        if(err.status ==="error"){
          _self.setState({ loading: false ,process:100});
          _self.resetData();
        }
        if(err.status ==="done"||err.status ==="error"){
          this.taskStack.shift();
        }
      }
      
    })
  };
  resetData = () => {
    this.setState({
      pageProps:{
        total: 0,
        current: 1,
        rotation:0,
        zoom:1,
      },
      screenType:"width",
      loading: false,
      showToolbar:true,
      showZoombar:true,
      process:0,
    })
    var canvas = document.getElementById('the-canvas');
    var context = (canvas as any).getContext('2d');

    context.clearRect(0, 0, (canvas as any).width, (canvas as any).height);
  };

  renderPDfByPage = (props:any,screenType?:string,callback?:any) => {
    let __t0 = Date.now();
    
    props = Object.assign(this.state.pageProps,props);
    const pageNumber = props.current||1;
    const zoom = props.zoom||1;
    const rotation = props.rotation%360;

    var _self = this;
    var pdf = this.PDF;
    if(!pdf){
      return 
    }
    // debugger
    pdf.getPage(pageNumber).then(function(page:any) {
      let __t1 = Date.now()
      // console.log('Page loaded use time',(__t0-__t1)/1000+"ms");
      if (!_self.isRender) {
        return console.log('the render process has been stopped');
      }
      // var scale = 1.5;
      var viewport = page.getViewport({ scale: zoom,rotation:rotation });
      var canvas = document.getElementById('the-canvas');
      

      // NOTE: 2019-09-26 18:54:20 放大到全屏
      if (screenType === "width") {
        props.zoom = _self.staticZoomWidth;
        viewport = page.getViewport({ scale: props.zoom,rotation:rotation });
        _self.setState({screenType:"height"})
      }else if (screenType === "height") {
        props.zoom = _self.staticZoomHeight;
        viewport = page.getViewport({ scale: props.zoom,rotation:rotation });
        _self.setState({screenType:"width"})
      }

      // Prepare canvas using PDF page dimensions
      var context = (canvas as any).getContext('2d');
      (canvas as any).height = viewport.height;
      (canvas as any).width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function() {
        // console.log('Page rendered use time',(__t1-Date.now())/1000+"ms");
        if(callback){ callback()}

        _self.setState({ pageProps:props });
      });
    });
  };
  handlePageChange = current => {
    this.renderPDfByPage({current});
  };
  handleZoom = (z:any,step=.15) => {
    // const step = .15;
    let zoom = this.state.pageProps.zoom;
    if(z==="add"){
      zoom = zoom + step;
    }else{
      zoom = zoom - step;
    }

    if(zoom<0.3){
      zoom = 0.3
    }else if(zoom>3){
      zoom = 3
    }
    this.renderPDfByPage({zoom});
  };
  fullscreen = (screenType:string) => {
    // debugger
    this.renderPDfByPage({},screenType);
  };
  roate=()=>{
    let rotation = this.state.pageProps.rotation;
    rotation += 90;
    this.renderPDfByPage({rotation});
  }
  render() {
    const { process, screenType,pageProps,loading, showZoombar,showToolbar } = this.state;
    const {current, total,} = pageProps;
    const { filePath , fileName} = this.props;
    // console.log('this.state', this.state);

    return (
      <div className={"pdfViewerContainer"} ref={container=>this.container=container}>
        {/* new header with toolbar */}
        <Header
        filePath={filePath}
        fileName={fileName}
        renderPDfByPage={this.renderPDfByPage}
        pageProps={pageProps}
        roate={this.roate}
        process={process}
        show={showToolbar}/>
        {/* zoom button */}
        <Zoom 
          show={showZoombar}
          screenType={screenType}
          fullscreen={this.fullscreen}
          handleZoom={this.handleZoom}
        />
        {/* loading */}
        {/* <Spin size="large" spinning={loading}> */}
          {/* 空数据情况展示 */}

        {/* Viewer */}
        <Viewer
        handleZoom={this.handleZoom}
        />
          
        {/* </Spin> */}
      </div>
    );
  }
}





// 逻辑复杂不