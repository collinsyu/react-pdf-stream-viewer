Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./header.less");

var _Icons = require("../Icons");

var _Icons2 = _interopRequireDefault(_Icons);

var _pagination = require("./pagination");

var _pagination2 = _interopRequireDefault(_pagination);

var _progress = require("../progress");

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.toggle = function (show) {
            if (_this.animation_) {
                _this.animation_.cancel();
            }
            if (show) {
                _this.animation_ = _this.header.animate([{ transform: 'translateY(-100%)' }, { transform: 'translateY(0%)' }], {
                    duration: 250,
                    easing: 'cubic-bezier(0, 0, 0.2, 1)',
                    fill: 'forwards'
                });
            } else {
                _this.animation_ = _this.header.animate([{ transform: 'translateY(0%)' }, { transform: 'translateY(-100%)' }], {
                    duration: 250,
                    easing: 'cubic-bezier(0.4, 0, 1, 1)',
                    fill: 'forwards'
                });
            }
        };
        _this.download = function () {
            // NOTE: 2019-09-30 12:27:57 这里暂时可以直接调用打开链接下载，因为是流文件
            // console.log(this.props.filePath);
        };
        return _this;
    }

    _createClass(Container, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.show !== nextProps.show) {
                this.toggle(nextProps.show);
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                process = _props.process,
                filePath = _props.filePath,
                roate = _props.roate,
                _props$pageProps = _props.pageProps,
                pageProps = _props$pageProps === undefined ? {} : _props$pageProps,
                renderPDfByPage = _props.renderPDfByPage;
            var _pageProps$total = pageProps.total,
                total = _pageProps$total === undefined ? 0 : _pageProps$total,
                current = pageProps.current;

            return _react2.default.createElement("div", { className: "toolbarContainer", ref: function ref(header) {
                    return _this2.header = header;
                } }, _react2.default.createElement("div", { className: "toolbar" }, _react2.default.createElement("div", { className: "aligner" }, _react2.default.createElement("span", { className: "title" }, "text-est.pdf"), _react2.default.createElement(_pagination2.default, { renderPDfByPage: renderPDfByPage, total: total, current: current }), _react2.default.createElement("div", { className: "buttons" }, _react2.default.createElement(_Icons2.default, { type: "roate-right", onClick: roate }), _react2.default.createElement(_Icons2.default, { type: "file-download", onClick: this.download }), _react2.default.createElement(_Icons2.default, { type: "print", onClick: function onClick() {
                    // console.log("rotae click")
                } })))), _react2.default.createElement(_progress2.default, { process: process }));
        }
    }]);

    return Container;
}(_react.PureComponent);
//# sourceMappingURL=Header.js.map


exports.default = Container;
module.exports = exports["default"];