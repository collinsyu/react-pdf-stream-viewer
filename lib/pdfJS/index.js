Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tslib = require('tslib');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.less');

var _loadScript = require('../utils/loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _Header = require('./header/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Zoom = require('./Zoom');

var _Zoom2 = _interopRequireDefault(_Zoom);

var _Viewer = require('./Viewer');

var _Viewer2 = _interopRequireDefault(_Viewer);

var _throttle = require('lodash-decorators/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _toolbar = require('./utils/toolbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Distance from the top of the screen required to reveal the toolbars. */
/** Idle time in ms before the UI is hidden. */
var HIDE_TIMEOUT = 2000;

var PDFView = function (_Component) {
    _inherits(PDFView, _Component);

    function PDFView(props) {
        _classCallCheck(this, PDFView);

        var _this = _possibleConstructorReturn(this, (PDFView.__proto__ || Object.getPrototypeOf(PDFView)).call(this, props));

        _this.hideToolbarsIfAllowed = function () {
            // TODO: 这里暂时先不加 判断 toolbar 和 screenbar，暂时统一管理
            // 排除鼠标已经靠近停留在bar附近
            if (_this.isMouseNearTopToolbar_ || _this.isMouseNearSideToolbar_) {
                return;
            }
            // 
            _this.setState({
                showToolbar: false,
                showZoombar: false
            });
        };
        _this.handleMouseMove = function (e) {
            // 之所以这样写，是因为组件可能不是最顶层的，可能会放到各种位置容器，不一定是body
            var showToolbar = (0, _toolbar.isMouseNearTopToolbar)({ y: e.y - _this.container.offsetTop });
            // 判断 当前bar状态 和 距离
            // let showToolbar = isMouseNearTopToolbar(e);
            _this.isMouseNearTopToolbar_ = showToolbar;
            var showZoombar = (0, _toolbar.isMouseNearSideToolbar)({
                y: e.y - _this.container.offsetTop,
                x: e.x + window.innerWidth - _this.container.offsetWidth - _this.container.offsetLeft
            }, _this.window_, _this.reverseSideToolbar_);
            _this.isMouseNearSideToolbar_ = showZoombar;
            var x = _this.state.showToolbar && _this.state.showZoombar;
            if (!x) {
                if (showToolbar || showZoombar) {
                    _this.setState({
                        showToolbar: true,
                        showZoombar: true
                    });
                }
            }
            _this.hideToolbarsAfterTimeout();
        };
        // NOTE: 记住了！！！注册监听事件，千万不要用尖头函数，不能被移除
        _this.nameMouseEvent = function (e) {
            _this.handleMouseEvent_(e);
        };
        _this.beforeCreatedPDF = function (filePath) {
            if (!filePath) {
                return;
            }
            if (!window.pdfjsLib) {
                (0, _loadScript2.default)('https://cdn.bootcss.com/pdf.js/2.2.228/pdf.min.js', function () {
                    //加载,并执行回调函数
                    _this.createPDF(filePath);
                });
            } else {
                _this.createPDF(filePath);
            }
        };
        _this.setStaticZoom = function () {
            var canvas = document.getElementById('the-canvas');
            var container = document.getElementById('the-canvas-container');
            _this.staticZoomWidth = container.offsetWidth / canvas.width;
            _this.staticZoomHeight = (container.offsetHeight - 60) / canvas.height;
            // console.log("⚠️⚠️⚠️⚠️这里应该只执行一次",this.staticZoomWidth,this.staticZoomHeight);
        };
        _this.createPDF = function (fileurl) {
            // NOTE: 2019-09-26 09:33:39 这里处理下loading
            _this.setState({ process: 1 });
            var __t0 = Date.now();
            _this.setState({ loading: true });
            _this.isRender = true;
            // debugger
            var _self = _this;
            var pdfjsLib = window.pdfjsLib;
            var loadingTask = pdfjsLib.getDocument(fileurl);
            // console.log(loadingTask);
            // console.log(loadingTask.taskStack);
            _this.taskStack.push(fileurl);
            // console.log("start create pdf stream process",this.taskStack);
            loadingTask.promise.then(function (pdf) {
                throw { status: "done", data: pdf, fileurl: fileurl };
                // var _l = _self.taskStack[_self.taskStack.length-1];
                // console.log("pdf create success",_l);
                // if(!_l._transport){
                //   throw "pending";
                // }
            }, function (reason) {
                // PDF loading error
                alert('文件流获取失败');
                throw { status: "error" };
            }).catch(function (err) {
                // console.log("after ",err);
                if ((typeof err === 'undefined' ? 'undefined' : _typeof(err)) === "object") {
                    if (err.status === "done") {
                        if (err.fileurl !== _this.taskStack[_this.taskStack.length - 1]) {
                            return;
                        }
                        // console.log('PDF Object created use time ', (__t0-Date.now())/1000+"ms");
                        _self.PDF = err.data;
                        console.log(_self.PDF);
                        var pageProps = _self.state.pageProps;
                        pageProps.total = _self.PDF._pdfInfo.numPages;
                        // 修改total
                        _self.setState({ pageProps: pageProps, loading: false });
                        _self.renderPDfByPage({ current: 1 }, "", function () {
                            // 定时hide toolbar and screenbar ,注意这里暂时写在这里，应该写在文档加载完之后
                            _self.hideToolbarsAfterTimeout();
                            _self.setState({ process: 100 });
                            _self.setStaticZoom();
                            _self.fileLoader = true;
                            return true;
                        });
                    }
                    if (err.status === "error") {
                        _self.setState({ loading: false, process: 100 });
                        _self.resetData();
                    }
                    if (err.status === "done" || err.status === "error") {
                        _this.taskStack.shift();
                    }
                }
            });
        };
        _this.resetData = function () {
            _this.setState({
                pageProps: {
                    total: 0,
                    current: 1,
                    rotation: 0,
                    zoom: 1
                },
                screenType: "width",
                loading: false,
                showToolbar: true,
                showZoombar: true,
                process: 0
            });
            var canvas = document.getElementById('the-canvas');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
        _this.renderPDfByPage = function (props, screenType, callback) {
            var __t0 = Date.now();
            props = Object.assign(_this.state.pageProps, props);
            var pageNumber = props.current || 1;
            var zoom = props.zoom || 1;
            var rotation = props.rotation % 360;
            var _self = _this;
            var pdf = _this.PDF;
            if (!pdf) {
                return;
            }
            // debugger
            pdf.getPage(pageNumber).then(function (page) {
                var __t1 = Date.now();
                // console.log('Page loaded use time',(__t0-__t1)/1000+"ms");
                if (!_self.isRender) {
                    return console.log('the render process has been stopped');
                }
                // var scale = 1.5;
                var viewport = page.getViewport({ scale: zoom, rotation: rotation });
                var canvas = document.getElementById('the-canvas');
                // NOTE: 2019-09-26 18:54:20 放大到全屏
                if (screenType === "width") {
                    props.zoom = _self.staticZoomWidth;
                    viewport = page.getViewport({ scale: props.zoom, rotation: rotation });
                    _self.setState({ screenType: "height" });
                } else if (screenType === "height") {
                    props.zoom = _self.staticZoomHeight;
                    viewport = page.getViewport({ scale: props.zoom, rotation: rotation });
                    _self.setState({ screenType: "width" });
                }
                // Prepare canvas using PDF page dimensions
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                    // console.log('Page rendered use time',(__t1-Date.now())/1000+"ms");
                    if (callback) {
                        callback();
                    }
                    _self.setState({ pageProps: props });
                });
            });
        };
        _this.handlePageChange = function (current) {
            _this.renderPDfByPage({ current: current });
        };
        _this.handleZoom = function (z) {
            var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : .15;

            // const step = .15;
            var zoom = _this.state.pageProps.zoom;
            if (z === "add") {
                zoom = zoom + step;
            } else {
                zoom = zoom - step;
            }
            if (zoom < 0.3) {
                zoom = 0.3;
            } else if (zoom > 3) {
                zoom = 3;
            }
            _this.renderPDfByPage({ zoom: zoom });
        };
        _this.fullscreen = function (screenType) {
            // debugger
            _this.renderPDfByPage({}, screenType);
        };
        _this.roate = function () {
            var rotation = _this.state.pageProps.rotation;
            rotation += 90;
            _this.renderPDfByPage({ rotation: rotation });
        };
        _this.state = {
            pageProps: {
                total: 0,
                current: 1,
                rotation: 0,
                zoom: 1
            },
            screenType: "width",
            loading: false,
            showToolbar: true,
            showZoombar: true,
            process: 0
        };
        _this.isRender = false;
        _this.staticZoomWidth = 0;
        _this.staticZoomHeight = 0;
        _this.window_ = window;
        _this.isMouseNearSideToolbar_ = false;
        _this.isMouseNearTopToolbar_ = false;
        _this.reverseSideToolbar_ = false;
        _this.fileLoader = false;
        _this.taskStack = [];
        return _this;
    }

    _createClass(PDFView, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
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
                this.fileLoader = false;
                this.beforeCreatedPDF(nextProps.filePath);
            }
        }
    }, {
        key: 'hideToolbarsAfterTimeout',
        value: function hideToolbarsAfterTimeout() {
            if (this.toolbarTimeout_) {
                this.window_.clearTimeout(this.toolbarTimeout_);
            }
            if (!this.fileLoader) {
                return;
            }
            this.toolbarTimeout_ = this.window_.setTimeout(this.hideToolbarsIfAllowed, HIDE_TIMEOUT);
        }
    }, {
        key: 'handleMouseEvent_',
        value: function handleMouseEvent_(e) {
            // console.log(e);
            if (e.type == 'mousemove') {
                this.handleMouseMove(e);
            }
            // else if (e.type == 'mouseout') {
            //   this.toolbarManager_.hideToolbarsForMouseOut();
            // }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousemove', this.nameMouseEvent);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // console.log('pdf components did mount ');
            // console.log('add mousemove listener');
            document.addEventListener('mousemove', this.nameMouseEvent);
            var filePath = this.props.filePath;

            this.beforeCreatedPDF(filePath);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                process = _state.process,
                screenType = _state.screenType,
                pageProps = _state.pageProps,
                loading = _state.loading,
                showZoombar = _state.showZoombar,
                showToolbar = _state.showToolbar;
            var current = pageProps.current,
                total = pageProps.total;
            var _props = this.props,
                filePath = _props.filePath,
                fileName = _props.fileName;
            // console.log('this.state', this.state);

            return _react2.default.createElement("div", { className: "pdfViewerContainer", ref: function ref(container) {
                    return _this2.container = container;
                } }, _react2.default.createElement(_Header2.default, { filePath: filePath, fileName: fileName, renderPDfByPage: this.renderPDfByPage, pageProps: pageProps, roate: this.roate, process: process, show: showToolbar }), _react2.default.createElement(_Zoom2.default, { show: showZoombar, screenType: screenType, fullscreen: this.fullscreen, handleZoom: this.handleZoom }), _react2.default.createElement(_Viewer2.default, { handleZoom: this.handleZoom }));
        }
    }]);

    return PDFView;
}(_react.Component);

exports.default = PDFView;

(0, _tslib.__decorate)([(0, _throttle2.default)(400)], PDFView.prototype, "handleMouseEvent_", null);
// 逻辑复杂不
//# sourceMappingURL=index.js.map

module.exports = exports['default'];