Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _roateRight = require("./roate-right");

var _roateRight2 = _interopRequireDefault(_roateRight);

var _fileDownload = require("./file-download");

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _print = require("./print");

var _print2 = _interopRequireDefault(_print);

var _minus = require("./minus");

var _minus2 = _interopRequireDefault(_minus);

var _plus = require("./plus");

var _plus2 = _interopRequireDefault(_plus);

var _screen = require("./screen");

var _screen2 = _interopRequireDefault(_screen);

var _screenShirk = require("./screen-shirk");

var _screenShirk2 = _interopRequireDefault(_screenShirk);

require("./icon2.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getOffsetTop(obj) {
    var tmp = obj.offsetTop;
    var val = obj.offsetParent;
    while (val != null) {
        tmp += val.offsetTop;
        val = val.offsetParent;
    }
    return tmp;
}
function getOffsetLeft(obj) {
    var tmp = obj.offsetLeft;
    var val = obj.offsetParent;
    while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
    }
    return tmp;
}

var Container = function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.end = function () {};
        _this.start = function (e) {
            // NOTE: 这里有一个bug，因为wave放大之后，
            // 点击的就不再是外层的wrapper了，导致e不同，最终后面设置起点错误
            // 第一种解决的办法就是不用e，单独为wrapper设置一个 ref
            // 我不想用上面的
            // 用css 的z-index，也不行，我放弃了
            // 就用第一种办法吧emmmmm ri～
            e.persist(); // react16 syncEvent
            _this.ripple.classList.remove("animate-ripple");
            // console.log(this.wrapper);
            var CW = _this.wrapper.clientWidth;
            var CT = getOffsetTop(_this.wrapper);
            var CL = getOffsetLeft(_this.wrapper);
            var MX = e.clientX;
            var MY = e.clientY;
            // console.log("容器宽度",CW);
            // console.log("容器top",CT);
            // console.log("容器left",CL);
            // console.log("鼠标点击x",MX);
            // console.log("鼠标点击y",MY);
            var _x = MX - CL;
            var _y = MY - CT;
            var x = parseInt(_x.toString()) - CW / 2;
            var y = parseInt(_y.toString()) - CW / 2;
            // 重新设置ripple 位置
            // console.log(x,y);
            _this.ripple.style.left = x + "px";
            _this.ripple.style.top = y + "px";
            // console.log(this.ripple.style.left);
            // console.log(this.ripple.style.top);
            setTimeout(function () {
                _this.ripple.classList.add("animate-ripple");
            }, 0);
        };
        _this.state = {
            animation: false
        };
        return _this;
    }

    _createClass(Container, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                type = _props.type,
                color = _props.color;

            var dom = null;
            switch (type) {
                case "roate-right":
                    dom = _react2.default.createElement(_roateRight2.default, { fill: color });
                    break;
                case "file-download":
                    dom = _react2.default.createElement(_fileDownload2.default, { fill: color });
                    break;
                case "print":
                    dom = _react2.default.createElement(_print2.default, { fill: color });
                    break;
                case "minus":
                    dom = _react2.default.createElement(_minus2.default, { fill: color });
                    break;
                case "plus":
                    dom = _react2.default.createElement(_plus2.default, { fill: color });
                    break;
                case "screen":
                    dom = _react2.default.createElement(_screen2.default, { fill: color });
                    break;
                case "screen-shrik":
                    dom = _react2.default.createElement(_screenShirk2.default, { fill: color });
                    break;
                default:
                    break;
            }
            return _react2.default.createElement("div", { className: "iconContainer", onClick: function onClick() {
                    if (_this2.props.onClick) {
                        _this2.props.onClick();
                    }
                } }, _react2.default.createElement("div", { className: "iconBox" }, _react2.default.createElement("div", { className: "icon" }, dom), _react2.default.createElement("div", { className: "rippleWrapper",
                // onMouseUp={this.end}
                ref: function ref(wrapper) {
                    return _this2.wrapper = wrapper;
                }, onMouseDown: this.start }, _react2.default.createElement("div", { ref: function ref(ripple) {
                    return _this2.ripple = ripple;
                }, className: "ripple" }))));
        }
    }]);

    return Container;
}(_react.PureComponent);
//# sourceMappingURL=icon2.js.map


exports.default = Container;
module.exports = exports["default"];