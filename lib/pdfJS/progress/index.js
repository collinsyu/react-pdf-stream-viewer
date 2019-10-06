Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_PureComponent) {
    _inherits(Container, _PureComponent);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.fakeloading = function () {
            // 先快后慢，永远不要到一百; 平均大概 10ms
            _this.interval = setInterval(function () {
                _this.p = _this.p + (90 - _this.p) * 0.6;
                _this.transformProgress(_this.p);
            }, 720);
        };
        _this.p = 0;
        return _this;
    }

    _createClass(Container, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextprops) {
            var _this2 = this;

            if (nextprops.process == 100) {
                // 清楚settimeinterval
                this.transformProgress(100);
                clearInterval(this.interval);
                // 消失
                setTimeout(function () {
                    _this2.main.style.visibility = "hidden";
                }, 200);
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fakeloading();
        }
    }, {
        key: "transformProgress",
        value: function transformProgress() {
            var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var transform = 'scaleX(' + ratio / 100 + ')';
            this.main.style.transform = this.main.style.webkitTransform = transform;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement("div", { className: "progressContainer" }, _react2.default.createElement("div", { className: "progressBar" }, _react2.default.createElement("div", { className: "progressBox" }, _react2.default.createElement("div", { className: "secondaryProgress" }), _react2.default.createElement("div", { ref: function ref(main) {
                    return _this3.main = main;
                }, className: "primaryProgress" }))));
        }
    }]);

    return Container;
}(_react.PureComponent);
//# sourceMappingURL=index.js.map


exports.default = Container;
module.exports = exports["default"];