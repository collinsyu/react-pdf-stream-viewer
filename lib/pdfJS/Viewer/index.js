Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getScrollbarWidth() {
    var div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.style.overflow = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.position = 'absolute';
    document.body.appendChild(div);
    var result = div.offsetWidth - div.clientWidth;
    div.parentNode.removeChild(div);
    return result;
}

var Container = function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.sentPinchEvent_ = false;
        return _this;
    }
    /**
     * A callback that's called when an update to a pinch zoom is detected.
     * @param {!Object} e the pinch event.
     * @private
     */


    _createClass(Container, [{
        key: 'onPinchUpdate_',
        value: function onPinchUpdate_(e) {
            var _this2 = this;

            // Throttle number of pinch events to one per frame.
            // console.log("update",e);
            if (!this.sentPinchEvent_) {
                this.sentPinchEvent_ = true;
                window.requestAnimationFrame(function () {
                    _this2.sentPinchEvent_ = false;
                    // 在这里应该现叠加 翻倍数量，然后不重新渲染pdf，只将其放大
                    // this.viewport_.pinchZoom(e);
                });
            }
        }
        /**
         * A callback that's called when the end of a pinch zoom is detected.
         * @param {!Object} e the pinch event.
         * @private
         */

    }, {
        key: 'onPinchEnd_',
        value: function onPinchEnd_(e) {
            var _this3 = this;

            // console.log("end",e);
            // Using rAF for pinch end prevents pinch updates scheduled by rAF getting
            // sent after the pinch end.
            window.requestAnimationFrame(function () {
                // 最终是在这里重新渲染
                // this.viewport_.pinchZoomEnd(e);
                var d = e.startScaleRatio - 1 > 0 ? "add" : "minus";
                var step = Math.abs(e.startScaleRatio - 1);
                _this3.props.handleZoom(d, step);
            });
        }
        /**
         * A callback that's called when the start of a pinch zoom is detected.
         * @param {!Object} e the pinch event.
         * @private
         */

    }, {
        key: 'onPinchStart_',
        value: function onPinchStart_(e) {
            // console.log("start",e);
            // We also use rAF for pinch start, so that if there is a pinch end event
            // scheduled by rAF, this pinch start will be sent after.
            window.requestAnimationFrame(function () {
                // this.viewport_.pinchZoomStart(e);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            /** @private {!GestureDetector} */
            // this.viewport_ = new Viewport(window, this.pdfviewer, getScrollbarWidth(), 0.25, 0);
            // this.gestureDetector_ = new GestureDetector(this.pdfviewer);
            // this.gestureDetector_.addEventListener('pinchstart', e => {
            //     this.onPinchStart_(e);   
            // }
            // );
            // this.sentPinchEvent_ = false;
            // this.gestureDetector_.addEventListener( 'pinchupdate', e => {
            //     this.onPinchUpdate_(e);
            // });
            // this.gestureDetector_.addEventListener('pinchend', e => {
            //     this.onPinchEnd_(e);
            // });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement("div", { className: "pdfViewer", id: "the-canvas-container", ref: function ref(pdfviewer) {
                    return _this4.pdfviewer = pdfviewer;
                } }, _react2.default.createElement("canvas", { id: "the-canvas", className: "canvas" }));
        }
    }]);

    return Container;
}(_react.PureComponent);
//# sourceMappingURL=index.js.map


exports.default = Container;
module.exports = exports['default'];